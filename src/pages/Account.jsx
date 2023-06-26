import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Button from '../components/Button';
import EditIcon from '../assets/edit.svg';
import CancelIcon from '../assets/close.svg';
import TickIcon from '../assets/tick.svg';
import DeleteIcon from '../assets/delete.svg';
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
  logout,
} from '../actions/userActions';
import {
  USER_PROFILE_DELETE_RESET,
  USER_PROFILE_UPDATE_RESET,
} from '../constants/userConstants';

const Account = () => {
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { user, loading: profileLoading, error: profileError } = userProfile;

  const userProfileDelete = useSelector((state) => state.userProfileDelete);
  const {
    success: profileDeleteSuccess,
    loading: profileDeleteLoading,
    error: profileDeleteError,
  } = userProfileDelete;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const {
    loading: profileUpdateLoading,
    error: profileUpdateError,
    success,
  } = userProfileUpdate;

  const editModeButtonHandler = () => {
    setEditMode(!editMode);
  };

  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    } else {
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate, userInfo, success]);

  useEffect(() => {
    if (profileError) {
      handleClick('error', profileError);
    }
  }, [profileError]);

  useEffect(() => {
    if (profileDeleteError) {
      handleClick('error', profileDeleteError);
    }
    if (profileDeleteSuccess) {
      handleClick('success', 'Account Deleted.');
      dispatch({ type: USER_PROFILE_DELETE_RESET });
      dispatch(logout());
    }
  }, [profileDeleteError, profileDeleteSuccess]);

  useEffect(() => {
    if (profileUpdateError) {
      handleClick('error', profileUpdateError);
    }
    if (success) {
      handleClick('success', 'User profile updated.');
      dispatch({ type: USER_PROFILE_UPDATE_RESET });
    }
  }, [profileUpdateError, success]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .max(30, 'Cannot be more than 20 charecters'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(8, 'Password too short'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });

  return (
    <div className="flex flex-grow h-full w-full overflow-y-scroll">
      {profileLoading || profileUpdateLoading ? (
        <Loader />
      ) : profileError ? (
        <span>Something went wrong..</span>
      ) : (
        <div className="lg:p-10 md:p-10 p-5 w-full">
          <Formik
            onSubmit={(values) => {
              dispatch(
                updateUserProfile({
                  _id: user._id,
                  name: values.name,
                  email: values.email,
                  password: values.password,
                })
              );
              setEditMode(false);
            }}
            initialValues={{
              name: user.name,
              email: user.email,
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              dirty,
            }) => (
              <form
                className="min-w-full text-[1.2rem]"
                onSubmit={handleSubmit}
              >
                <div className="flex lg:flex-row md:flex-row w-full justify-between flex-col">
                  <span className="lg:text-[2rem] md:text-[2rem] text-[1.5rem]">
                    Your Profile
                  </span>
                  {editMode ? (
                    <div className="flex flex-row space-x-5">
                      <Button
                        text={'Cancel'}
                        icon={<CancelIcon />}
                        handleClick={editModeButtonHandler}
                      />
                      <Button
                        text={'Save'}
                        icon={<TickIcon />}
                        color={'#51D88A'}
                        type={'submit'}
                        disable={profileUpdateLoading || !dirty}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-row space-x-5 lg:mt-0 md:mt-0 mt-5">
                      <Button
                        text={'Edit'}
                        icon={<EditIcon />}
                        handleClick={editModeButtonHandler}
                      />
                      <Button
                        text={'Delete'}
                        icon={<DeleteIcon />}
                        color={'#ef4444'}
                        handleClick={() => setDeleteModal(true)}
                      />
                    </div>
                  )}
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-10 max-w-xl md:gap-0 lg:gap-0 gap-2">
                  <label
                    htmlFor="status"
                    className="md:h-16 lg:h-16 font-semibold"
                  >
                    Subscription
                  </label>
                  <span className="text-[1.1rem] py-1 px-4" id="status">
                    {user.premium ? 'Premium' : 'Free'}
                  </span>

                  <label
                    htmlFor="date"
                    className="md:h-16 lg:h-16 font-semibold"
                  >
                    Member since
                  </label>
                  <span className="text-[1.1rem] py-1 px-4" id="date">
                    {moment(user.createdAt).format('LL')}
                  </span>
                  <label
                    htmlFor="name"
                    className="md:h-16 lg:h-16 pt-1 font-semibold"
                  >
                    Name
                  </label>
                  {editMode ? (
                    <div className="flex flex-col">
                      <input
                        label="Name"
                        placeholder="Update name"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        value={values.name}
                        className="text-[1.1rem] py-1 px-4 border border-black"
                      />
                      <span className="text-red-500 h-[8px]">
                        {touched.name && errors.name}
                      </span>
                      <span className="text-red-500">
                        {Boolean(touched.name && errors.name)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[1.1rem] py-1 px-4">{user.name}</span>
                  )}

                  <label
                    htmlFor="email"
                    className="md:h-16 lg:h-16 pt-1 font-semibold"
                  >
                    Email
                  </label>
                  {editMode ? (
                    <div className="flex flex-col">
                      <input
                        label="Email"
                        placeholder="Update email"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        value={values.email}
                        type="email"
                        className="text-[1.1rem] py-1 px-4 border border-black"
                      />
                      <span className="text-red-500 h-[8px]">
                        {touched.email && errors.email}
                      </span>
                      <span className="text-red-500">
                        {Boolean(touched.email && errors.email)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[1.1rem] py-1 px-4">
                      {user.email}
                    </span>
                  )}
                  {editMode && (
                    <>
                      <label
                        htmlFor="password"
                        className="md:h-16 lg:h-16 pt-1 font-semibold"
                      >
                        Password
                      </label>
                      <div className="flex flex-col">
                        <input
                          label="Password"
                          placeholder="New password"
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          type="password"
                          className="text-[1.1rem] py-1 px-4 border border-black"
                        />
                        <span className="text-red-500 h-[8px]">
                          {touched.password && errors.password}
                        </span>
                        <span className="text-red-500">
                          {Boolean(touched.password && errors.password)}
                        </span>
                      </div>
                      <label
                        htmlFor="password"
                        className="md:h-16 lg:h-16 pt-1 font-semibold"
                      >
                        Confirm Password
                      </label>
                      <div className="flex flex-col">
                        <input
                          label="Confirm Password"
                          placeholder="Confirm password"
                          name="confirmPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.confirmPassword}
                          type="password"
                          className="text-[1.1rem] py-1 px-4 border border-black"
                        />
                        <span className="text-red-500 h-[8px]">
                          {touched.confirmPassword && errors.confirmPassword}
                        </span>
                        <span className="text-red-500">
                          {Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
      {deleteModal && (
        <div className="fixed bg-black/50 w-full h-full top-0 left-0">
          <div className="flex justify-center items-center min-h-full z-10">
            <div className="bg-[#cdcfd3] p-10 w-[450px] rounded-lg">
              <div className="flex flex-row min-w-full justify-between mb-10 items-center">
                <span className="text-[1.5rem]">Are you sure?</span>
              </div>
              <div className="flex flex-row w-full justify-around">
                <button
                  className="bg-red-500 px-5 py-1"
                  onClick={() => {
                    dispatch(deleteUserProfile(user._id));
                  }}
                  disabled={profileDeleteLoading}
                >
                  Yes
                </button>
                <button
                  className="bg-[#9f9fa1] px-5 py-1"
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
