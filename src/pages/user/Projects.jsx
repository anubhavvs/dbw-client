import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, userInfo]);

  return <div>Projects</div>;
};

export default Projects;
