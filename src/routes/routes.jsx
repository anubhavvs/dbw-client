import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Projects from '../pages/user/Projects';
import Account from '../pages/Account';
import Users from '../pages/admin/Users';
import Logs from '../pages/admin/Logs';
import Dashboard from '../pages/Dashboard';
import Project from '../pages/user/Project';
import DashboardLayout from '../layout/DashboardLayout';

const routes = createBrowserRouter([
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: '', element: <Navigate to="/app/dashboard" replace={true} /> },
      { path: 'projects', element: <Projects /> },
      { path: 'account', element: <Account /> },
      { path: 'logs', element: <Logs /> },
      { path: 'users', element: <Users /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '/', element: <Navigate to="/login" replace={true} /> },
    ],
  },
  {
    path: 'project',
    element: <DashboardLayout />,
    children: [{ path: '/project/:id', element: <Project /> }],
  },
]);

export default routes;
