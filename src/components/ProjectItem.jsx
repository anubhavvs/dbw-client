import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ArrowDownIcon from '../assets/arrowdown.svg';
import ArrowUpIcon from '../assets/arrowup.svg';
import Button from './Button';
import EditIcon from '../assets/edit.svg';
import AddProjectIcon from '../assets/addProject.svg';
import DeleteIcon from '../assets/delete.svg';
import CloseIcon from '../assets/close.svg';
import {
  updateProject,
  listProjects,
  deleteProject,
} from '../actions/projectActions';
import {
  PROJECT_DELETE_RESET,
  PROJECT_UPDATE_RESET,
} from '../constants/projectConstants';

const ProjectItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const status = item.readOnly ? 'Inactive' : 'Active';

  const onClickHandler = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="select-none">
      <div
        className={`flex flex-row justify-between border border-black p-5 cursor-pointer ${
          dropdown ? 'rounded-t-lg' : 'rounded-lg'
        }  items-center`}
        onClick={onClickHandler}
      >
        <div className="flex flex-row justify-between w-[95%]">
          <div className="flex flex-col">
            <span className="text-[1.2rem] font-bold">{item.name}</span>
            <span>No. of Products: {item.products.length}</span>
            <span>Description: {item.description}</span>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <div
              className={`h-4 w-4 ${
                status === 'Draft'
                  ? 'bg-yellow-500'
                  : status === 'Active'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              } rounded-full`}
            ></div>
            <span>{status}</span>
          </div>
        </div>
        <div>
          {dropdown ? (
            <img src={ArrowUpIcon} className="w-5 h-5" />
          ) : (
            <img src={ArrowDownIcon} className="w-5 h-5" />
          )}
        </div>
      </div>
      {dropdown && <DropdownDetails item={item} />}
    </div>
  );
};

const DropdownDetails = ({ item }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const updateButtonHandler = () => {
    setUpdateModal(true);
  };

  const deleteButtonHandler = () => {
    setDeleteModal(true);
  };

  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const { loading, error, success } = projectUpdate;

  const projectDelete = useSelector((state) => state.projectDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = projectDelete;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .max(15, 'Cannot be more than 20 charecters'),
    description: Yup.string()
      .required('Description is required')
      .max(40, 'Cannot be more than 40 charecters'),
  });

  useEffect(() => {
    if (error) {
      handleClick('error', error);
    } else if (success) {
      handleClick('success', 'Project updated.');
      dispatch(listProjects());
    }
    dispatch({ type: PROJECT_UPDATE_RESET });
  }, [error, success]);

  useEffect(() => {
    if (deleteError) {
      handleClick('error', error);
    } else if (deleteSuccess) {
      handleClick('success', 'Project deleted.');
      dispatch(listProjects());
    }
    dispatch({ type: PROJECT_DELETE_RESET });
  }, [deleteError, deleteSuccess]);

  return (
    <div className="flex flex-col border-b border-l border-r p-5 rounded-b-lg border-black">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-5">
          <Button
            text={'Edit'}
            icon={<EditIcon />}
            handleClick={updateButtonHandler}
          />
          <Button
            text={'Details'}
            icon={<AddProjectIcon />}
            disable={!item.premium && item.length < 3}
            handleClick={() => navigate(`/project/${item._id}`)}
          />
        </div>
        <Button
          text={'Delete Project'}
          icon={<DeleteIcon />}
          handleClick={deleteButtonHandler}
        />
      </div>
      {updateModal && (
        <div className="fixed bg-black/50 w-full h-full top-0 left-0">
          <div className="flex justify-center items-center min-h-full">
            <div className="bg-[#cdcfd3] p-10 w-[600px] rounded-lg">
              <div className="flex flex-row min-w-full justify-between mb-5 items-center">
                <span className="text-[1.5rem]">Update the project</span>
                <img
                  src={CloseIcon}
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setUpdateModal(false)}
                />
              </div>
              <Formik
                onSubmit={(values) => {
                  dispatch(
                    updateProject({
                      _id: item._id,
                      name: values.name,
                      description: values.description,
                    })
                  );
                  setUpdateModal(false);
                }}
                validationSchema={validationSchema}
                initialValues={{
                  name: item.name,
                  description: item.description,
                }}
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
                        disabled={loading || !dirty}
                        type="submit"
                        className="py-1 border border-black px-6"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
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
                    dispatch(deleteProject(item._id));
                    setDeleteModal(false);
                  }}
                  disabled={deleteLoading}
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

export default ProjectItem;
