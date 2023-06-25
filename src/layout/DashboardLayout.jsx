import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
  return (
    <div className="flex-grow h-full font-mono">
      <div className="flex h-full">
        <Sidebar />
        <div className="w-[80%]">
          <div className="flex flex-col h-full">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
