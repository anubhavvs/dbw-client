import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { register } from '../actions/userActions';
import { Helmet } from 'react-helmet';

const Register = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const companyLogin = useSelector((state) => state.companyLogin);
  const { companyInfo } = companyLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: userRegisterInfo, loading, success, error } = userRegister;

  useEffect(() => {
    if (userInfo || userRegisterInfo) {
      handleClick('success', 'Logged in successfully.');
      navigate('/app/dashboard');
    }
  }, [userInfo, navigate, userRegisterInfo]);

  useEffect(() => {
    if (error) {
      handleClick('error', error);
    }
    if (success) {
      handleClick('success', 'You are registered!');
    }
  }, [error, success]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Cannot be less than 6 charecters'),
  });

  useEffect(() => {
    if (companyInfo) {
      navigate('/app/systems');
    }
  }, [companyInfo, navigate]);
  return (
    <div className="flex flex-col h-full justify-center w-full items-center bg-[#cdcfd3]">
      <Helmet>
        <title>User Register</title>
      </Helmet>
      <div>
        <Formik
          onSubmit={(values) => {
            dispatch(register(values.name, values.email, values.password));
          }}
          validationSchema={validationSchema}
          initialValues={{ email: '', password: '', name: '' }}
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
                <span className="text-[2.7rem]">Register</span>
                <p>Regsiter with your name, email and password.</p>
              </div>
              <div className="flex flex-col">
                <input
                  label="Name"
                  name="name"
                  placeholder="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  autoComplete="off"
                  className="py-2 text-[1.1rem] outline-none px-2"
                />
                <span className="text-red-500 h-[8px]">
                  {touched.name && errors.name}
                </span>
                <span className="text-red-500">
                  {Boolean(touched.name && errors.name)}
                </span>
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
                  Existing user? Login{' '}
                  <Link to={'/login'}>
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
                  Register
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
