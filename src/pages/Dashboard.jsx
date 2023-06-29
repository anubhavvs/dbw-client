import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProjectIcon from '../assets/project.svg';
import InactiveProjectIcon from '../assets/inactiveProjects.svg';
import ProductIcon from '../assets/addProject.svg';
import InactiveProducts from '../assets/inactiveProducts.svg';
import DraftProducts from '../assets/draftProduct.svg';
import { listSystems } from '../actions/systemActions';
import Loader from '../components/Loader';
import { useSnackbar } from 'notistack';
import { getuserStats } from '../actions/userActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };
  const userProfile = useSelector((state) => state.userProfile);
  const { user, error: profileError } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  const allSystemList = useSelector((state) => state.allSystemList);
  const { loading: systemLoading, systems, error } = allSystemList;

  const userStats = useSelector((state) => state.userStats);
  const { loading: userStatsLoading, stats, error: userStatsError } = userStats;

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      handleClick('error', error);
    }
    if (profileError) {
      handleClick('error', profileError);
    }
  }, [error, profileError]);

  useEffect(() => {
    if (userStatsError) {
      handleClick('error', userStatsError);
    }
  }, [userStatsError]);

  useEffect(() => {
    if (userInfo) {
      if (user?.isAdmin) {
        navigate('/app/users', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, user?.isAdmin, userInfo]);

  useEffect(() => {
    dispatch(listSystems());
    dispatch(getuserStats());
  }, [dispatch]);

  return (
    <div className="flex flex-grow h-full w-full overflow-y-scroll">
      {loading || systemLoading || userStatsLoading ? (
        <Loader />
      ) : error || profileError || userStatsError ? (
        <span>Something went wrong..</span>
      ) : (
        <div className="lg:p-10 md:p-10 p-5 w-full">
          <span className="lg:text-[2rem] md:text-[2rem] text-[1.5rem]">
            Welcome <u>{user?.name}</u>,
          </span>
          <div className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-2 lg:gap-10 md:gap-10 gap-3 my-7">
            <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
              <div className=" bg-green-300 p-4 rounded-full w-fit h-fit">
                <img src={ProjectIcon} className="w-5 h-5" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="leading-tight">
                  Active <br />
                  Projects
                </span>
                <span className="text-[2rem]">
                  {stats?.activeProjectsCount}
                </span>
              </div>
            </div>
            <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
              <div className=" bg-blue-300 p-4 rounded-full w-fit h-fit">
                <img src={InactiveProjectIcon} className="w-5 h-5" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="leading-tight">
                  Inactive <br />
                  Projects
                </span>
                <span className="text-[2rem]">
                  {stats?.inactiveProjectsCount}
                </span>
              </div>
            </div>
            <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
              <div className=" bg-yellow-300 p-4 rounded-full w-fit h-fit">
                <img src={ProductIcon} className="w-5 h-5" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="leading-tight">
                  Active <br />
                  Products
                </span>
                <span className="text-[2rem]">
                  {stats?.activeProductsCount}
                </span>
              </div>
            </div>
            <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
              <div className=" bg-red-300 p-4 rounded-full w-fit h-fit">
                <img src={InactiveProducts} className="w-5 h-5" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="leading-tight">
                  Inactive <br />
                  Products
                </span>
                <span className="text-[2rem]">
                  {stats?.inactiveProductsCount}
                </span>
              </div>
            </div>
            <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
              <div className=" bg-purple-300 p-4 rounded-full w-fit h-fit">
                <img src={DraftProducts} className="w-5 h-5" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="leading-tight">
                  Draft <br />
                  Products
                </span>
                <span className="text-[2rem]">{stats?.draftProductsCount}</span>
              </div>
            </div>
          </div>
          <span className="lg:text-[2rem] md:text-[2rem] text-[1.5rem]">
            Available Systems
          </span>
          <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 lg:gap-10 md:gap-10 gap-3 mt-7">
            {systems.map((item) => (
              <div
                className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border-2"
                key={item._id}
              >
                <div className="flex flex-col space-y-2">
                  <span className="leading-tight text-[1.2rem]">
                    {item.name}
                  </span>
                  <span className="leading-tight">
                    Cell Type: {item.cellType}
                  </span>
                  <span className="leading-tight">
                    Capacity: {item.capacity}
                  </span>
                  <span className="leading-tight">
                    Efficiency: {item.efficiency}
                  </span>
                  <span className="leading-tight">
                    Warranty Years: {item.warrantyYears}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
