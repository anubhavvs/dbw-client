import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getLogs } from '../../actions/adminActions';
import { Helmet } from 'react-helmet';
import Loader from '../../components/Loader';

const Logs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminLogs = useSelector((state) => state.adminLogs);
  const { loading, error, logs } = adminLogs;

  const itemsPerPage = 8;

  useEffect(() => {
    if (userInfo) {
      dispatch(getLogs());
    } else {
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate, userInfo]);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = logs?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(logs?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % logs?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-grow h-full w-full overflow-y-scroll">
      <Helmet>
        <title>Logs</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : error ? (
        <span>Something went wrong...</span>
      ) : (
        <div className="lg:p-10 md:p-10 p-5 w-full">
          <div className="flex md:flex-row lg:flex-row flex-col-reverse md:space-y-0 lg:space-y-0 w-full justify-between">
            <span className="lg:text-[2rem] md:text-[2rem] text-[1.5rem]">
              System Logs
            </span>
          </div>
          <table className="table-auto mt-5">
            <thead className="w-full">
              <tr className="flex border">
                <th
                  itemScope="col"
                  className="px-6 py-3 border-r flex w-1/5 justify-center items-center"
                >
                  Time
                </th>
                <th
                  itemScope="col"
                  className="px-6 py-3 border-r flex w-1/5 justify-center items-center"
                >
                  Method
                </th>
                <th
                  itemScope="col"
                  className="px-6 py-3 border-r flex w-2/5 justify-center items-center"
                >
                  Path
                </th>
                <th
                  itemScope="col"
                  className="px-6 py-3 border-r flex w-1/5 justify-center items-center"
                >
                  Status
                </th>
                <th
                  itemScope="col"
                  className="px-6 py-3 flex w-2/5 justify-center items-center"
                >
                  Client
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentItems?.map((item) => (
                <tr key={item._id} className="border flex">
                  <td
                    itemScope="row"
                    className="px-6 py-1 border-r flex w-1/5 justify-center items-center"
                  >
                    {moment(item.timestamp).format('DD-MM-YYYY hh:mm:ss ')}
                  </td>
                  <td
                    itemScope="row"
                    className="px-6 py-1 border-r flex w-1/5 justify-center items-center"
                  >
                    {item.method}
                  </td>
                  <td
                    itemScope="row"
                    className="px-6 py-1 border-r flex break-all w-2/5 justify-start items-center"
                  >
                    {item.url}
                  </td>
                  <td
                    itemScope="row"
                    className="px-6 py-1 border-r flex w-1/5 justify-center items-center"
                  >
                    {item.status}
                  </td>
                  <td itemScope="row" className="px-6 py-1 flex w-2/5">
                    {item.client}
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

export default Logs;
