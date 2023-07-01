import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCompanySystems } from '../../actions/companyActions';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import AddIcon from '../../assets/add.svg';
import CloseIcon from '../../assets/close.svg';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import SystemItem from '../../components/SystemItem';
import { createSystems } from '../../actions/systemActions';
import { SYSTEM_CREATE_RESET } from '../../constants/systemConstants';
import { Helmet } from 'react-helmet';

const Systems = () => {
  const [createButtonModal, setCreateButtonModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const companyLogin = useSelector((state) => state.companyLogin);
  const { companyInfo } = companyLogin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const companySystems = useSelector((state) => state.companySystems);
  const { error, loading, systems } = companySystems;

  const systemCreate = useSelector((state) => state.systemCreate);
  const {
    error: systemCreateError,
    loading: systemCreateLoading,
    success: systemCreateSuccess,
  } = systemCreate;

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const createButtonHandler = () => {
    setCreateButtonModal(true);
  };

  useEffect(() => {
    if (systemCreateError) {
      handleClick('error', systemCreateError);
    }
    if (systemCreateSuccess) {
      handleClick('success', 'New system created.');
      dispatch(getCompanySystems());
    }
    dispatch({ type: SYSTEM_CREATE_RESET });
  }, [systemCreateError, systemCreateSuccess]);

  useEffect(() => {
    if (error) {
      handleClick('error', error);
    }
  }, [error]);

  useEffect(() => {
    if (userInfo) {
      navigate('/app/dashboard');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (companyInfo) {
      dispatch(getCompanySystems());
    } else {
      navigate('/companyLogin', { replace: true });
    }
  }, [companyInfo, navigate]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .max(30, 'Cannot be more than 20 charecters'),
    description: Yup.string()
      .required('Description is required')
      .max(50, 'Cannot be more than 40 charecters'),
    cellType: Yup.string().required('Cell Type is required'),
    capacity: Yup.string().required('Capacity is required'),
    efficiency: Yup.number()
      .min(1, 'Cannot be less than 1%')
      .required('Efficiency is required'),
    warrantyYears: Yup.number()
      .min(1, 'Cannot be less than 1 year')
      .required('Warranty Years is required'),
  });

  return (
    <div className="flex flex-grow h-full w-full overflow-y-scroll">
      <Helmet>
        <title>Systems</title>
      </Helmet>
      {loading || systemCreateLoading ? (
        <Loader />
      ) : error ? (
        <span>Something went wrong...</span>
      ) : (
        <div className="lg:p-10 md:p-10 p-5 w-full">
          <div className="flex md:flex-row lg:flex-row flex-col-reverse md:space-y-0 lg:space-y-0 w-full justify-between">
            <span className="lg:text-[2rem] md:text-[2rem] text-[1.5rem]">
              Your Systems
            </span>
            <div className="flex w-full justify-end md:max-w-fit lg:max-w-fit mb-3 md:mb-0 lg:mb-0">
              <Button
                text={'Create System'}
                handleClick={createButtonHandler}
                icon={<AddIcon />}
              />
            </div>
          </div>
          {systems?.length > 0 ? (
            <div className="grid grid-cols-1 mt-5 gap-4 pb-10">
              {systems.map((item) => (
                <SystemItem key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex mt-5">
              <span className="text-[1.2rem]">
                You dont have any system, click to create one!
              </span>
            </div>
          )}
        </div>
      )}
      {createButtonModal && (
        <div className="fixed bg-black/50 w-full h-full top-0 left-0">
          <div className="flex justify-center items-center min-h-full">
            <div className="bg-[#cdcfd3] p-10 w-[600px] rounded-lg">
              <div className="flex flex-row min-w-full justify-between mb-5 items-center">
                <span className="text-[1.5rem]">Create a New System</span>
                <img
                  src={CloseIcon}
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setCreateButtonModal(false)}
                />
              </div>
              <Formik
                onSubmit={(values) => {
                  dispatch(
                    createSystems(
                      values.name,
                      values.description,
                      values.cellType,
                      values.capacity,
                      values.efficiency,
                      values.warrantyYears
                    )
                  );
                  setCreateButtonModal(false);
                }}
                validationSchema={validationSchema}
                initialValues={{
                  name: '',
                  description: '',
                  cellType: '',
                  capacity: '',
                  efficiency: '',
                  warrantyYears: '',
                }}
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
                    className="min-w-full flex flex-col space-y-5"
                  >
                    <div className="flex flex-col">
                      <input
                        label="Name"
                        placeholder="Name"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        type="text"
                        autoComplete="off"
                        className="p-2 w-full outline-none text-[1.1rem]"
                      />
                      <span className="text-red-500 h-[8px]">
                        {touched.name && errors.name}
                      </span>
                      <span className="text-red-500">
                        {Boolean(touched.name && errors.name)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <input
                        label="Description"
                        placeholder="Description"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        type="text"
                        autoComplete="off"
                        className="p-2 w-full outline-none text-[1.1rem]"
                      />
                      <span className="text-red-500 h-[8px]">
                        {touched.description && errors.description}
                      </span>
                      <span className="text-red-500">
                        {Boolean(touched.description && errors.description)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <input
                          label="CellType"
                          placeholder="Cell Type"
                          name="cellType"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.cellType}
                          type="text"
                          autoComplete="off"
                          className="p-2 w-full outline-none text-[1.1rem]"
                        />
                        <span className="text-red-500 h-[8px]">
                          {touched.cellType && errors.cellType}
                        </span>
                        <span className="text-red-500">
                          {Boolean(touched.cellType && errors.cellType)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <input
                          label="Capacity"
                          placeholder="Capacit in W"
                          name="capacity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.capacity}
                          type="text"
                          autoComplete="off"
                          className="p-2 w-full outline-none text-[1.1rem]"
                        />
                        <span className="text-red-500 h-[8px]">
                          {touched.capacity && errors.capacity}
                        </span>
                        <span className="text-red-500">
                          {Boolean(touched.capacity && errors.capacity)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <input
                          label="Efficiency"
                          placeholder="Efficiency in %"
                          name="efficiency"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.efficiency}
                          type="text"
                          autoComplete="off"
                          className="p-2 w-full outline-none text-[1.1rem]"
                        />
                        <span className="text-red-500 h-[8px]">
                          {touched.efficiency && errors.efficiency}
                        </span>
                        <span className="text-red-500">
                          {Boolean(touched.efficiency && errors.efficiency)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <input
                          label="WarrantyYears"
                          placeholder="Warranty Years"
                          name="warrantyYears"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.warrantyYears}
                          type="text"
                          autoComplete="off"
                          className="p-2 w-full outline-none text-[1.1rem]"
                        />
                        <span className="text-red-500 h-[8px]">
                          {touched.warrantyYears && errors.warrantyYears}
                        </span>
                        <span className="text-red-500">
                          {Boolean(
                            touched.warrantyYears && errors.warrantyYears
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="w-full text-center">
                      <button
                        disabled={systemCreateLoading}
                        type="submit"
                        className="py-1 border border-black px-6"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Systems;
