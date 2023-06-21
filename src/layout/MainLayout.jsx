import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex-grow h-full font-mono">
      <Outlet />
    </div>
  );
};

export default MainLayout;
