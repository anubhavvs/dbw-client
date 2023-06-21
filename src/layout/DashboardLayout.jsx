import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      // console.log(userInfo);
    } else {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex-grow h-full font-mono">
      <div className="flex h-full">
        <Sidebar />
        <div className="w-[80%]">
          <div className="flex-grow h-full">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
