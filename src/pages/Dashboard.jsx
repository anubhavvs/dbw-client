import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProjectIcon from '../assets/project.svg';

const Dashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/app/users', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, userInfo]);

  return (
    <div className="p-10 w-full">
      <span className="text-[2rem]">
        Welcome <u>{userInfo?.name}</u>,
      </span>
      <div className="grid grid-cols-5 grid-rows-1 gap-10 mt-7">
        <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
          <div className=" bg-green-300 p-4 rounded-full w-fit h-fit">
            <img src={ProjectIcon} className="w-5 h-5" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="leading-tight">
              Active <br />
              Projects
            </span>
            <span className="text-[2rem]">{userInfo?.projects.length}</span>
          </div>
        </div>
        <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
          <div className=" bg-blue-300 p-4 rounded-full w-fit h-fit">
            <img src={ProjectIcon} className="w-5 h-5" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="leading-tight">
              Active <br />
              Projects
            </span>
            <span className="text-[2rem]">{userInfo?.projects.length}</span>
          </div>
        </div>
        <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
          <div className=" bg-yellow-300 p-4 rounded-full w-fit h-fit">
            <img src={ProjectIcon} className="w-5 h-5" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="leading-tight">
              Active <br />
              Projects
            </span>
            <span className="text-[2rem]">{userInfo?.projects.length}</span>
          </div>
        </div>
        <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
          <div className=" bg-red-300 p-4 rounded-full w-fit h-fit">
            <img src={ProjectIcon} className="w-5 h-5" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="leading-tight">
              Active <br />
              Projects
            </span>
            <span className="text-[2rem]">{userInfo?.projects.length}</span>
          </div>
        </div>
        <div className="flex flex-col p-6 shadow-xl shadow-gray-300 space-y-6 border">
          <div className=" bg-purple-300 p-4 rounded-full w-fit h-fit">
            <img src={ProjectIcon} className="w-5 h-5" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="leading-tight">
              Active <br />
              Projects
            </span>
            <span className="text-[2rem]">{userInfo?.projects.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
