import { useSelector, useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

import { logout } from '../actions/userActions';

import ProjectLogo from '../assets/project.svg';
import AccountLogo from '../assets/account.svg';
import UsersLogo from '../assets/users.svg';
import LogsLogo from '../assets/logs.svg';
import DashboardIcon from '../assets/dashboard.svg';
import PremiumIcon from '../assets/premium.svg';
import CloseIcon from '../assets/close.svg';
import SystemsIcon from '../assets/systems.svg';
import { useEffect, useState } from 'react';

const userItems = [
  { id: 1, href: '/app/dashboard', name: 'Dashboard', icon: <DashboardIcon /> },
  { id: 2, href: '/app/projects', name: 'Projects', icon: <ProjectLogo /> },
  { id: 3, href: '/app/account', name: 'Account', icon: <AccountLogo /> },
];

const adminItems = [
  { id: 1, href: '/app/users', name: 'Users', icon: <UsersLogo /> },
  { id: 2, href: '/app/logs', name: 'Logs', icon: <LogsLogo /> },
];

const companyItems = [
  { id: 1, href: '/app/systems', name: 'Systems', icon: <SystemsIcon /> },
  {
    id: 3,
    href: '/app/companyAccount',
    name: 'Account',
    icon: <AccountLogo />,
  },
];

const SidebarItems = ({ href, name, icon, setMobileView = null }) => {
  const location = useLocation();
  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false,
        },
        location.pathname
      )
    : false;
  return (
    <NavLink to={href}>
      <div
        className={`flex flex-row justify-center py-4 cursor-pointer space-x-4 items-center rounded-3xl ${
          active ? 'bg-[#cdcfd3]' : ''
        }`}
        onClick={() => {
          setMobileView ? setMobileView(false) : null;
        }}
      >
        <div>
          <img src={icon} className="w-5 h-5" />
        </div>
        <span className="text-[1.1rem]">{name}</span>
      </div>
    </NavLink>
  );
};

const Sidebar = ({ setMobileView, mobileView }) => {
  const userProfile = useSelector((state) => state.userProfile);
  const companyProfile = useSelector((state) => state.companyProfile);
  const [sidebaritems, setSidebaritems] = useState([]);
  const { user, loading: userLoading } = userProfile;
  const { company, loading: companyLoading } = companyProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user || company) {
      if (!userLoading && !companyLoading) {
        if (user && Object.keys(user).length != 0) {
          if (user.isAdmin) {
            setSidebaritems(adminItems);
          } else {
            setSidebaritems(userItems);
          }
        } else if (company && Object.keys(company).length != 0)
          setSidebaritems(companyItems);
      }
    }
  }, [userLoading, companyLoading, user, company]);

  const svgURl = 'https://avatars.dicebear.com/api/avataaars/';

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (mobileView) {
    return (
      <div className="lg:w-[20%] md:w-[20%] lg:flex md:flex flex-col lg:py-10 md:py-10 z-30 p-8 bg-[#E9ECEF] absolute lg:relative md:relative min-w-full min-h-full lg:min-w-min">
        <div className="flex justify-end mb-5">
          <button onClick={() => setMobileView(false)}>
            <img src={CloseIcon} className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col text-center min-h-full justify-between">
          <div className="flex flex-col">
            {user && Object.keys(user) != 0 && (
              <>
                <div className="flex justify-center items-center">
                  <img
                    src={`${svgURl}${user?.name.split(' ')[0]}.svg`}
                    className="w-24 h-24 border rounded-full border-black mb-4"
                  />
                </div>
                <span className="text-[1.3rem]">{user?.name}</span>
                {!user?.isAdmin && (
                  <div className="flex flex-row justify-center space-x-2 mt-1 items-top">
                    {user?.premium ? (
                      <img src={(<PremiumIcon />).type} className="w-5 h-5" />
                    ) : null}
                    <span>{user?.premium ? 'Premium' : 'Free'}</span>
                  </div>
                )}
              </>
            )}
            {company && Object.keys(company) != 0 && (
              <>
                <div className="flex justify-center items-center">
                  <img
                    src={company.website}
                    className="w-24 h-24 border rounded-full border-black mb-4"
                  />
                </div>
                <span className="text-[1.3rem]">{company?.name}</span>
                <span>{company.location}</span>
              </>
            )}
          </div>

          <div className="flex flex-col lg:px-10 md:px-10 text-center mt-16 space-y-4">
            {sidebaritems.map((item) => (
              <SidebarItems
                key={item.id}
                name={item.name}
                icon={item.icon.type}
                href={item.href}
                setMobileView={setMobileView}
              />
            ))}
          </div>

          <div className="mt-[80%]">
            <button
              className="underline text-lg"
              onClick={() => logoutHandler()}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-[20%] md:w-[20%] lg:flex md:flex flex-col py-10 bg-[#E9ECEF] hidden">
      <div className="flex flex-col text-center h-full justify-between">
        <div className="flex flex-col">
          {user && Object.keys(user).length != 0 && (
            <>
              <div className="flex justify-center items-center">
                <img
                  src={`${svgURl}${user?.name?.split(' ')[0]}.svg`}
                  className="w-24 h-24 border rounded-full border-black mb-4"
                />
              </div>
              <span className="text-[1.3rem]">{user?.name}</span>
              {!user?.isAdmin && (
                <div className="flex flex-row justify-center space-x-2 mt-1 items-top">
                  {user?.premium ? (
                    <img src={(<PremiumIcon />).type} className="w-5 h-5" />
                  ) : null}
                  <span>{user?.premium ? 'Premium' : 'Free'}</span>
                </div>
              )}
            </>
          )}
          {company && Object.keys(company).length != 0 && (
            <>
              <div className="flex justify-center items-center">
                <img
                  src={company.website}
                  className="w-24 h-24 border rounded-full border-black mb-4"
                />
              </div>
              <span className="text-[1.3rem]">{company?.name}</span>
              <span>{company.location}</span>
            </>
          )}
        </div>

        <div className="flex flex-col px-10 text-center h-full mt-16 space-y-4">
          {sidebaritems.map((item) => (
            <SidebarItems
              key={item.id}
              name={item.name}
              icon={item.icon.type}
              href={item.href}
            />
          ))}
        </div>

        <div>
          <button className="underline text-lg" onClick={() => logoutHandler()}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
