import { useSelector, useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

import { logout } from '../actions/userActions';

import ProjectLogo from '../assets/project.svg';
import AccountLogo from '../assets/account.svg';
import UsersLogo from '../assets/users.svg';
import LogsLogo from '../assets/logs.svg';

const userItems = [
  { id: 1, href: '/app/projects', name: 'Projects', icon: <ProjectLogo /> },
  { id: 2, href: '/app/account', name: 'Account', icon: <AccountLogo /> },
];

const adminItems = [
  { id: 1, href: '/app/users', name: 'Users', icon: <UsersLogo /> },
  { id: 2, href: '/app/logs', name: 'Logs', icon: <LogsLogo /> },
];

const SidebarItems = ({ href, name, icon }) => {
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
        className={`flex flex-row justify-center py-4 cursor-pointer space-x-4 items-center ${
          active ? 'bg-[#cdcfd3]' : ''
        }`}
      >
        <div>
          <img src={icon} className="w-5 h-5" />
        </div>
        <span className="text-[1.1rem]">{name}</span>
      </div>
    </NavLink>
  );
};

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const sidebaritems = userInfo?.isAdmin ? adminItems : userItems;

  const svgURl = 'https://avatars.dicebear.com/api/avataaars/';

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="w-[20%] flex flex-col py-10 bg-[#E9ECEF]">
      <div className="flex flex-col text-center h-full justify-between">
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <img
              src={`${svgURl}${userInfo?.name.split(' ')[0]}.svg`}
              className="w-24 h-24 border rounded-full border-black mb-4"
            />
          </div>
          <span className="text-[1.3rem]">{userInfo?.name}</span>
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
          <button className="underline" onClick={() => logoutHandler()}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
