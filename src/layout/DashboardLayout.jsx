import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Sidebar from '../components/Sidebar';
import { SCREEN_SIZE } from '../constants/responsiveConstants';
import Header from '../components/Header';
import { getUserProfile } from '../actions/userActions';
import { getCompanyProfile } from '../actions/companyActions';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileView, setMobileView] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const companyLogin = useSelector((state) => state.companyLogin);
  const { companyInfo } = companyLogin;

  useEffect(() => {
    if (!companyInfo && !userInfo) {
      navigate('/login');
    } else if (userInfo) {
      dispatch(getUserProfile());
    } else if (companyInfo) {
      dispatch(getCompanyProfile());
    }
  }, [userInfo, companyInfo, navigate, dispatch]);

  useEffect(() => {
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
