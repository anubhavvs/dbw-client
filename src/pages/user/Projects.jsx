import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { listProjects, createProject } from '../../actions/projectActions';
import Loader from '../../components/Loader';
import ProjectItem from '../../components/ProjectItem';
import Button from '../../components/Button';
import AddIcon from '../../assets/add.svg';
import CloseIcon from '../../assets/close.svg';
import { PROJECT_CREATE_RESET } from '../../constants/projectConstants';

const Projects = () => {
  const [createButtonModal, setCreateButtonModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectList = useSelector((state) => state.projectList);
  const { loading, error, projects, success } = projectList;

  const projectCreate = useSelector((state) => state.projectCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = projectCreate;

  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const createButtonHandler = () => {
    setCreateButtonModal(true);
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/app/welcome', { replace: true });
      }
      dispatch(listProjects());
    } else {
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (error) {
      handleClick('error', error);
    } else if (success) {
      handleClick('success', 'Projects loaded.');
    }
  }, [error, success]);

  useEffect(() => {
    if (createError) {
      handleClick('success', createError);
    } else if (createSuccess) {
      dispatch(listProjects());
      handleClick('success', 'New project created.');
    }
    dispatch({ type: PROJECT_CREATE_RESET });
  }, [createError, createSuccess]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .max(30, 'Cannot be more than 20 charecters'),
    description: Yup.string()
      .required('Description is required')
      .max(50, 'Cannot be more than 40 charecters'),
  });

  return (
    <div className="flex flex-grow h-full w-full overflow-y-scroll">
      {loading ? (
        <Loader />
      ) : error ? (
        <span>Something went wrong...</span>
      ) : (
        <div className="p-10 w-full">
          <div className="flex flex-row w-full justify-between">
            <span className="text-[2rem]">Your Projects</span>
            <Button
              text={'Create Project'}
              disable={projects?.length == 1 && !userInfo.premium}
              icon={<AddIcon />}
              handleClick={createButtonHandler}
            />
          </div>
          {projects?.length > 0 ? (
            <div className="grid grid-cols-1 mt-5 gap-4 pb-10">
              {projects.map((item) => (
                <ProjectItem item={item} key={item._id} />
              ))}
            </div>
          ) : (
            <div className="flex mt-5">
              <span className="text-[1.2rem]">
                You dont have any project, Click to create one!
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
                <span className="text-[1.5rem]">Create a New Project</span>
                <img
                  src={CloseIcon}
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setCreateButtonModal(false)}
                />
              </div>
              <Formik
                onSubmit={(values) => {
                  dispatch(createProject(values.name, values.description));
                  setCreateButtonModal(false);
                }}
                validationSchema={validationSchema}
                initialValues={{ name: '', description: '' }}
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

                    <div className="w-full text-center">
                      <button
                        disabled={createLoading}
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

export default Projects;
