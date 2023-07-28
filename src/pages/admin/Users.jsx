import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../actions/adminActions';
import { Helmet } from 'react-helmet';
import Loader from '../../components/Loader';
import TickIcon from '../../assets/tick.svg';
import CloseIcon from '../../assets/close.svg';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const allUsersList = useSelector((state) => state.allUsersList);
  const { loading, error, users } = allUsersList;

  const itemsPerPage = 8;

  useEffect(() => {
    if (userInfo) {
      dispatch(getAllUsers());
    } else {
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate, userInfo]);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = users?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-grow h-full w-full overflow-y-scroll">
      <Helmet>
        <title>Users</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : error ? (
        <span>Something went wrong...</span>
      ) : (
        <div className="lg:p-10 md:p-10 p-5 w-full">
          <div className="flex md:flex-row lg:flex-row flex-col-reverse md:space-y-0 lg:space-y-0 w-full justify-between">
            <span className="lg:text-[2rem] md:text-[2rem] text-[1.5rem]">
              All Users
            </span>
          </div>
          <table className="mt-5 min-w-full">
            <thead className="w-full">
              <tr className="flex border">
                <th
                  itemScope="col"
                  className="px-6 py-3 border-r flex w-[20%] justify-center items-center"
                >
                  ID
                </th>
                <th
                  itemScope="col"
                  className="px-6 py-3 border-r flex w-[20%] justify-center items-center"
                >
                  Name
                </th>
                <th
                  itemScope="col"
                  className="px-6 py-3 border-r flex w-[25%] justify-center items-center"
                >
                  Email
                </th>
                <th
                  itemScope="col"
                  className="px-6 py-3 border-r flex w-[15%] justify-center items-center"
                >
                  Joining Date
                </th>
                <th
                  itemScope="col"
                  className="px-6 py-3 border-r flex w-[10%] justify-center items-center"
                >
                  Status
                </th>
                <th
                  itemScope="col"
                  className="px-6 py-3 flex w-[10%] justify-center items-center"
                >
                  Premium
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentItems?.map((item) => (
                <tr key={item._id} className="border flex">
                  <td
                    itemScope="row"
                    className="px-6 py-3 border-r flex w-[20%] justify-start items-center"
                  >
                    {item._id}
                  </td>
                  <td
                    itemScope="row"
                    className="px-6 py-3 border-r flex w-[20%] justify-start items-center"
                  >
                    {item.name}
                  </td>
                  <td
                    itemScope="row"
                    className="px-6 py-3 border-r flex break-all w-[25%] justify-start items-center"
                  >
                    {item.email}
                  </td>
                  <td
                    itemScope="row"
                    className="px-6 py-3 border-r flex w-[15%] justify-center items-center"
                  >
                    {moment(item.createdAt).format('Do MMMM YYYY')}
                  </td>
                  <td
                    itemScope="row"
                    className="px-6 py-3 border-r flex w-[10%] justify-center items-center"
                  >
                    {item.status}
                  </td>
                  <td
                    itemScope="row"
                    className="px-6 py-3 flex w-[10%] justify-center items-center"
                  >
                    {item.premium ? (
                      <img src={TickIcon} className="w-5 h-5" />
                    ) : (
                      <img src={CloseIcon} className="w-5 h-5" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            className="flex flex-row mt-5 pb-10 justify-center space-x-5"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            activeClassName="active_pagination"
          />
        </div>
      )}
    </div>
  );
};

export default Users;
