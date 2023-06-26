import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { SCREEN_SIZE } from '../constants/responsiveConstants';
import Header from '../components/Header';
import { getUserProfile } from '../actions/userActions';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile());
    const onResize = () => {
      dispatch({ type: SCREEN_SIZE, payload: window.innerWidth });
    };
    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [dispatch]);

  return (
    <div className="flex-grow h-full font-mono">
      <div className="flex h-full">
        <Sidebar setMobileView={setMobileView} mobileView={mobileView} />
        <div className="lg:w-[80%] md:w-[80%] w-full">
          <div className="flex flex-col h-full">
            <Header setMobileView={setMobileView} />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
