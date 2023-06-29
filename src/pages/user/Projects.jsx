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
  const [filter, setFilter] = useState(false);
  const [array, setArray] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const projectList = useSelector((state) => state.projectList);
  const { loading, error, projects } = projectList;

  const projectCreate = useSelector((state) => state.projectCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = projectCreate;

  useEffect(() => {
    if (projects?.length > 0) {
      setArray(projects.filter((item) => item.readOnly === filter));
      console.log(filter);
    }
  }, [projects, filter]);

  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const createButtonHandler = () => {
    setCreateButtonModal(true);
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/app/dashboard', { replace: true });
      }
      dispatch(listProjects());
    } else {
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (error) {
      handleClick('error', error);
    }
  }, [error]);

  useEffect(() => {
    if (createError) {
      handleClick('error', createError);
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
      {loading || createLoading ? (
        <Loader />
      ) : error ? (
        <span>Something went wrong...</span>
      ) : (
        <div className="lg:p-10 md:p-10 p-5 w-full">
          <div className="flex md:flex-row lg:flex-row flex-col-reverse md:space-y-0 lg:space-y-0 w-full justify-between">
            <span className="lg:text-[2rem] md:text-[2rem] text-[1.5rem]">
              Your Projects
            </span>
            <div className="flex w-full justify-end md:max-w-fit lg:max-w-fit mb-3 md:mb-0 lg:mb-0">
              <Button
                text={'Create Project'}
                disable={projects?.length == 1 && !userInfo.premium}
                icon={<AddIcon />}
                handleClick={createButtonHandler}
              />
            </div>
          </div>
          <div className="flex flex-row w-full justify-end">
            <select
              className="outline-none"
              label="filter"
              onChange={(e) =>
                setFilter(e.target.value === 'true' ? true : false)
              }
            >
              <option value={false}>Active</option>
              <option value={true}>Inactive</option>
            </select>
          </div>
          {projects?.length > 0 ? (
            <div className="grid grid-cols-1 mt-5 gap-4 pb-10">
              {array.map((item) => (
                <ProjectItem item={item} key={item._id} />
              ))}
            </div>
          ) : (
            <div className="flex mt-5">
              <span className="text-[1.2rem]">
                You dont have any project, click to create one!
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
