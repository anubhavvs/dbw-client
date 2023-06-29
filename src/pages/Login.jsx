import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { login } from '../actions/userActions';

const Login = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const companyLogin = useSelector((state) => state.companyLogin);
  const { companyInfo } = companyLogin;

  useEffect(() => {
    if (userInfo) {
      handleClick('success', 'Logged in successfully.');
      navigate('/app/dashboard');
    }
    if (error) {
      handleClick('error', error);
    }
  }, [userInfo, error]);

  useEffect(() => {
    if (companyInfo) {
      navigate('/app/systems');
    }
  }, [companyInfo, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Cannot be less than 6 charecters'),
  });

  return (
    <div className="flex flex-col h-full justify-center w-full items-center bg-[#cdcfd3]">
      <div>
        <Formik
          onSubmit={(values) => {
            dispatch(login(values.email, values.password));
          }}
          validationSchema={validationSchema}
          initialValues={{ email: '', password: '' }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-full w-full px-10 lg:border-2 md:border-2 border-black py-10 space-y-4 rounded-xl"
            >
              <div className="flex flex-col mb-5">
                <span className="text-[2.7rem]">Log In</span>
                <p>Log in with your email and password.</p>
              </div>
              <div className="flex flex-col justify-center">
                <input
                  label="Email Address"
                  placeholder="Email Address"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  autoComplete="off"
                  className="py-2 text-[1.1rem] outline-none px-2"
                />
                <span className="text-red-500 h-[8px]">
                  {touched.email && errors.email}
                </span>
                <span className="text-red-500">
                  {Boolean(touched.email && errors.email)}
                </span>
              </div>
              <div className="flex flex-col">
                <input
                  label="Password"
                  name="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  autoComplete="off"
                  className="py-2 text-[1.1rem] outline-none px-2"
                />
                <span className="text-red-500 h-[8px]">
                  {touched.password && errors.password}
                </span>
                <span className="text-red-500">
                  {Boolean(touched.password && errors.password)}
                </span>
              </div>
              <div className="flex flex-row">
                <span>
                  New user? Register{' '}
                  <Link to={'/register'}>
                    <u>here</u>.
                  </Link>
                </span>
              </div>
              <div className="w-full text-center">
                <button
                  disabled={loading}
                  type="submit"
                  className="py-1 border border-black px-6 mt-2"
                >
                  Log in
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
