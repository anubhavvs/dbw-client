import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import EditIcon from '../../assets/edit.svg';
import CancelIcon from '../../assets/close.svg';
import TickIcon from '../../assets/tick.svg';
import DeleteIcon from '../../assets/delete.svg';
import {
  getCompanyProfile,
  updateCompanyProfile,
  deleteCompanyProfile,
} from '../../actions/companyActions';
import { logout } from '../../actions/userActions';
import {
  COMPANY_PROFILE_DELETE_RESET,
  COMPANY_PROFILE_UPDATE_RESET,
} from '../../constants/companyConstants';

const CompanyAccount = () => {
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const companyLogin = useSelector((state) => state.companyLogin);
  const { companyInfo } = companyLogin;

  const companyProfile = useSelector((state) => state.companyProfile);
  const {
    company,
    loading: companyProfileLoading,
    error: companyProfileError,
  } = companyProfile;

  const companyProfileDelete = useSelector(
    (state) => state.companyProfileDelete
  );
  const {
    success: companyProfileDeleteSuccess,
    loading: companyProfileDeleteLoading,
    error: companyProfileDeleteError,
  } = companyProfileDelete;

  const companyProfileUpdate = useSelector(
    (state) => state.companyProfileUpdate
  );
  const {
    loading: companyProfileUpdateLoading,
    error: companyProfileUpdateError,
    success: companyProfileUpdateSuccess,
  } = companyProfileUpdate;

  const editModeButtonHandler = () => {
    setEditMode(!editMode);
  };

  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/app/dashboard');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (companyInfo) {
      dispatch(getCompanyProfile());
    } else {
      navigate('/companyLogin', { replace: true });
    }
  }, [companyInfo, navigate, companyProfileUpdateSuccess]);

  useEffect(() => {
    if (companyProfileError) {
      handleClick('error', companyProfileError);
    }
  }, [companyProfileError]);

  useEffect(() => {
    if (companyProfileDeleteError) {
      handleClick('error', companyProfileDeleteError);
    }
    if (companyProfileDeleteSuccess) {
      handleClick('success', 'Account Deleted.');
      dispatch({ type: COMPANY_PROFILE_DELETE_RESET });
      dispatch(logout());
    }
  }, [companyProfileDeleteError, companyProfileDeleteSuccess]);

  useEffect(() => {
    if (companyProfileUpdateError) {
      handleClick('error', companyProfileUpdateError);
    }
    if (companyProfileUpdateSuccess) {
      handleClick('success', 'Company profile updated.');
      dispatch({ type: COMPANY_PROFILE_UPDATE_RESET });
    }
  }, [companyProfileUpdateError, companyProfileUpdateSuccess]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .max(30, 'Cannot be more than 20 charecters'),
    email: Yup.string().email().required('Email is required'),
    website: Yup.string().required('Website is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string().required('Description is required'),
    password: Yup.string().min(8, 'Password too short'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });
  return (
    <div className="flex flex-grow h-full w-full overflow-y-scroll">
      {companyProfileLoading || companyProfileUpdateLoading ? (
        <Loader />
      ) : companyProfileError ? (
        <span>Something went wrong..</span>
      ) : (
        <div className="lg:p-10 md:p-10 p-5 w-full">
          <Formik
            onSubmit={(values) => {
              dispatch(
                updateCompanyProfile({
                  _id: company._id,
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  location: values.location,
                  website: values.website,
                  description: values.description,
                })
              );
              setEditMode(false);
            }}
            initialValues={{
              name: company.name,
              email: company.email,
              website: company.website,
              location: company.location,
              description: company.description,
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
                        disable={companyProfileUpdateLoading || !dirty}
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
                    htmlFor="date"
                    className="md:h-16 lg:h-16 font-semibold"
                  >
                    Member since
                  </label>
                  <span className="text-[1.1rem] py-1 px-4" id="date">
                    {moment(company.createdAt).format('LL')}
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
                    <span className="text-[1.1rem] py-1 px-4">
                      {company.name}
                    </span>
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
                      {company.email}
                    </span>
                  )}
                  <label
                    htmlFor="image"
                    className="md:h-16 lg:h-16 pt-1 font-semibold"
                  >
                    Image
                  </label>
                  {editMode ? (
                    <div className="flex flex-col">
                      <input
                        label="Wesbite"
                        placeholder="Update image"
                        name="website"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        value={values.website}
                        className="text-[1.1rem] py-1 px-4 border border-black"
                      />
                      <span className="text-red-500 h-[8px]">
                        {touched.website && errors.website}
                      </span>
                      <span className="text-red-500">
                        {Boolean(touched.website && errors.website)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[1.1rem] py-1 px-4 truncate">
                      {company.website}
                    </span>
                  )}
                  <label
                    htmlFor="website"
                    className="md:h-16 lg:h-16 pt-1 font-semibold"
                  >
                    Location
                  </label>
                  {editMode ? (
                    <div className="flex flex-col">
                      <input
                        label="Location"
                        placeholder="Update location"
                        name="location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        value={values.location}
                        className="text-[1.1rem] py-1 px-4 border border-black"
                      />
                      <span className="text-red-500 h-[8px]">
                        {touched.location && errors.location}
                      </span>
                      <span className="text-red-500">
                        {Boolean(touched.location && errors.location)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[1.1rem] py-1 px-4 truncate">
                      {company.location}
                    </span>
                  )}
                  <label
                    htmlFor="website"
                    className="md:h-16 lg:h-16 pt-1 font-semibold"
                  >
                    Description
                  </label>
                  {editMode ? (
                    <div className="flex flex-col">
                      <input
                        label="Description"
                        placeholder="Update description"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        value={values.description}
                        className="text-[1.1rem] py-1 px-4 border border-black"
                      />
                      <span className="text-red-500 h-[8px]">
                        {touched.description && errors.description}
                      </span>
                      <span className="text-red-500">
                        {Boolean(touched.description && errors.description)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[1.1rem] py-1 px-4 truncate">
                      {company.description}
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
                    dispatch(deleteCompanyProfile(company._id));
                  }}
                  disabled={companyProfileDeleteLoading}
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

export default CompanyAccount;
