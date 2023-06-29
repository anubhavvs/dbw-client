import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import ArrowDownIcon from '../assets/arrowdown.svg';
import ArrowUpIcon from '../assets/arrowup.svg';
import Button from './Button';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import CloseIcon from '../assets/close.svg';
import { getCompanySystems } from '../actions/companyActions';
import { deleteSystem, updateSystem } from '../actions/systemActions';
import {
  SYSTEM_DELETE_RESET,
  SYSTEM_UPDATE_RESET,
} from '../constants/systemConstants';

const SystemItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);
  const onClickHandler = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className="select-none">
      <div
        className={`flex md:flex-row lg:flex-row flex-col justify-between border border-black lg:p-5 md:p-5 p-2 cursor-pointer ${
          dropdown ? 'rounded-t-lg' : 'rounded-lg'
        }  items-center`}
        onClick={onClickHandler}
      >
        <div className="flex flex-row justify-between w-[95%]">
          <div className="flex flex-col">
            <span className="text-[1.2rem] font-bold">{item.name}</span>
            <span>Description: {item.description}</span>
            <span>Cell Type: {item.cellType}</span>
            <span>Capacity: {item.capacity}</span>
            <span>Efficiency: {item.efficiency}</span>
            <span>Warranty Years: {item.warrantyYears}</span>
          </div>
        </div>
        <div className="mt-3 lg:mt-0 md:mt">
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

  const systemUpdate = useSelector((state) => state.systemUpdate);
  const {
    loading: systemUpdateLoading,
    error: systemUpdateError,
    success: systemUpdateSuccess,
  } = systemUpdate;

  useEffect(() => {
    if (systemUpdateError) {
      handleClick('error', systemUpdateError);
    }
    if (systemUpdateSuccess) {
      handleClick('success', 'System updated.');
      dispatch(getCompanySystems());
    }
    dispatch({ type: SYSTEM_UPDATE_RESET });
  }, [systemUpdateSuccess, systemUpdateError]);

  const systemDelete = useSelector((state) => state.systemDelete);
  const {
    loading: systemDeleteLoading,
    error: systemDeleteError,
    success: systemDeleteSuccess,
  } = systemDelete;

  useEffect(() => {
    if (systemDeleteError) {
      handleClick('error', systemDeleteError);
    } else if (systemDeleteSuccess) {
      handleClick('success', 'System deleted.');
      dispatch(getCompanySystems());
    }
    dispatch({ type: SYSTEM_DELETE_RESET });
  }, [systemDeleteError, systemDeleteSuccess]);

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
    <div className="flex flex-col border-b border-l border-r lg:p-5 md:p-5 p-3 rounded-b-lg border-black">
      <div className="flex flex-row justify-end lg:space-x-5 md:space-x-5 space-x-2">
        <Button
          text={'Edit'}
          icon={<EditIcon />}
          handleClick={updateButtonHandler}
        />
        <Button
          text={'Delete'}
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
                    updateSystem({
                      system_id: item._id,
                      name: values.name,
                      description: values.description,
                      cellType: values.cellType,
                      capacity: values.capacity,
                      efficiency: values.efficiency,
                      warrantyYears: values.warrantyYears,
                    })
                  );
                  setUpdateModal(false);
                }}
                validationSchema={validationSchema}
                initialValues={{
                  name: item.name,
                  description: item.description,
                  cellType: item.cellType,
                  capacity: item.capacity,
                  efficiency: item.efficiency,
                  warrantyYears: item.warrantyYears,
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
                        disabled={systemUpdateLoading || !dirty}
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
                    dispatch(deleteSystem(item._id));
                    setDeleteModal(false);
                  }}
                  disabled={systemDeleteLoading}
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

export default SystemItem;
