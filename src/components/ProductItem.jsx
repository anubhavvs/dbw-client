import { useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Tooltip } from 'react-tooltip';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDownIcon from '../assets/arrowdown.svg';
import ArrowUpIcon from '../assets/arrowup.svg';
import HelpIcon from '../assets/help.svg';
import SaveIcon from '../assets/save.svg';
import DeleteIcon from '../assets/delete.svg';
import SyncIcon from '../assets/sync.svg';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import Loader from './Loader';
import Button from './Button';
import { listSystems } from '../actions/systemActions';
import { deleteProduct, updateProduct } from '../actions/productActions';

const ProductItem = ({ item }) => {
  const status = item.status;
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(true);

  const onClickHandler = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    dispatch(listSystems());
  }, [dispatch]);

  return (
    <div className="select-none">
      <div
        className={`flex lg:flex-row md:flex-row justify-between border border-black md:p-5 lg:p-5 p-2 space-y-3 md:space-y-0 lg:space-y-0 cursor-pointer flex-col ${
          dropdown ? 'rounded-t-lg' : 'rounded-lg'
        }  items-center`}
        onClick={onClickHandler}
      >
        <div className="flex flex-row items-center justify-between w-[95%]">
          <span className="text-[1.2rem] font-bold">{item.name}</span>
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
            <span>{item.status}</span>
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

const libraries = ['places'];

const DropdownDetails = ({ item }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(item.location.coordinates[1]);
  const [longitude, setLongitude] = useState(item.location.coordinates[0]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const allSystemList = useSelector((state) => state.allSystemList);
  const { loading, systems, error } = allSystemList;

  const projectDetail = useSelector((state) => state.projectDetail);
  const { project } = projectDetail;

  useEffect(() => {
    console.log(loadError);
  }, [loadError]);

  useEffect(() => {
    if (error) {
      handleClick('error', error);
    }
  }, [error]);

  const azimuthText =
    'The direction on the horizon the PV modules are facing, expressed in degrees. Values must be between -180 and 180. 0 is north, 180 is south. Eastward facing = negative values. Westward facing = positive values. For example, -90 is due east.';

  const inclinationText =
    'The angle (degrees) that the PV system is tilted off the horizontal. Must be between 0 and 90. A tilt of 0 means the system is facing directly upwards, and 90 means the system is vertical and facing the horizon.';

  const validationSchema = Yup.object().shape({
    latitude: Yup.number().required().max(90).min(-90),
    longitude: Yup.number().required().min(-180).max(180),
    azimuth: Yup.number().required().min(-180).max(180),
    inclination: Yup.number().required().min(0).max(90),
    area: Yup.number().required().min(0),
    systemLoss: Yup.number().required().min(1).max(99),
    system: Yup.string().required(),
  });

  return (
    <div className="flex flex-col border-b border-l border-r rounded-b-lg border-black">
      <Formik
        onSubmit={(values) => {
          dispatch(
            updateProduct({
              id: item._id,
              system: values.system,
              area: values.area,
              azimuth: values.azimuth,
              inclination: values.inclination,
              latitude: values.latitude,
              longitude: values.longitude,
              systemLoss: values.systemLoss,
            })
          );
        }}
        validationSchema={validationSchema}
        initialValues={{
          latitude: latitude,
          longitude: longitude,
          azimuth: item.azimuth,
          inclination: item.inclination,
          area: item.area,
          systemLoss: item.systemLoss,
          system: item?.system,
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          dirty,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="min-w-full flex flex-col divide-y divide-black"
          >
            <div className="flex md:flex-row lg:flex-row lg:p-5 md:p-5 p-2 flex-col space-y-5 lg:space-y-0 md:space-y-0">
              <div className="flex h-[380px] md:w-2/3 lg:w-2/3 w-full">
                {!isLoaded ? (
                  <Loader />
                ) : (
                  <GoogleMap
                    mapContainerClassName="map-container"
                    center={{
                      lat: latitude || values.latitude,
                      lng: longitude || values.longitude,
                    }}
                    zoom={15}
                    options={{
                      fullscreenControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      clickableIcons: false,
                      draggable: !project.readOnly,
                    }}
                    onClick={(e) => {
                      if (!project.readOnly) {
                        setLatitude(e.latLng.lat());
                        setFieldValue('latitude', e.latLng.lat());
                        setLongitude(e.latLng.lng());
                        setFieldValue('longitude', e.latLng.lng());
                      }
                    }}
                  >
                    <Marker
                      position={{
                        lat: latitude || values.latitude,
                        lng: longitude || values.longitude,
                      }}
                    ></Marker>
                  </GoogleMap>
                )}
              </div>
              <div className="flex flex-col lg:w-1/3 md:w-1/3 md:pl-5 lg:pl-5 pl-0 box-border w-full">
                <div className="w-full mb-2">
                  <label htmlFor="system">Select an option</label>
                  {!loading && (
                    <select
                      id="system"
                      name="system"
                      disabled={project.readOnly}
                      value={values.system}
                      key={values.system}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`p-2 w-full outline-none lg:text-[1.1rem] md:text-[1.1rem] border ${
                        errors.system
                          ? 'border-red-500 border-2'
                          : 'border-black'
                      }`}
                    >
                      {item.system ? (
                        <option
                          label={
                            systems.find((system) => system._id === item.system)
                              ?.name
                          }
                          value={
                            systems.find((system) => system._id === item.system)
                              ?._id
                          }
                        >
                          {
                            systems.find((system) => system._id === item.system)
                              ?.name
                          }
                        </option>
                      ) : (
                        <option value="">Select a system</option>
                      )}
                      {systems
                        .filter((system) => system._id !== item.system)
                        .map((item) => (
                          <option
                            label={item.name}
                            value={item._id}
                            key={item._id}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
                <div className="w-full mb-2">
                  {isLoaded && (
                    <>
                      <label htmlFor="address">Search by address</label>
                      <StandaloneSearchBox
                        className="w-full"
                        onLoad={(ref) => (inputRef.current = ref)}
                        onPlacesChanged={() => {
                          const [place] = inputRef.current.getPlaces();

                          if (place) {
                            setLatitude(place.geometry.location.lat());
                            setLongitude(place.geometry.location.lng());
                            setFieldValue(
                              'latitude',
                              place.geometry.location.lat()
                            );
                            setFieldValue(
                              'longitude',
                              place.geometry.location.lng()
                            );
                          }
                        }}
                      >
                        <input
                          name="address"
                          className="p-2 w-full outline-none text-[1.1rem] border border-black"
                          placeholder="Find a location"
                          disabled={project.readOnly}
                        />
                      </StandaloneSearchBox>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                      label="Latitude"
                      placeholder="Latitute"
                      name="latitute"
                      onBlur={handleBlur}
                      disabled={project.readOnly}
                      onChange={(e) => {
                        setLatitude(parseFloat(e.target.value));
                        setFieldValue('latitude', parseFloat(e.target.value));
                      }}
                      value={latitude}
                      type="number"
                      autoComplete="off"
                      className={`p-2 w-full outline-none text-[1.1rem] border  ${
                        errors.latitude
                          ? 'border-red-500 border-2'
                          : 'border-black'
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                      label="Longitude"
                      placeholder="Longitude"
                      name="longitude"
                      disabled={project.readOnly}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setLongitude(parseFloat(e.target.value));
                        setFieldValue('longitude', parseFloat(e.target.value));
                      }}
                      value={longitude}
                      type="number"
                      autoComplete="off"
                      className={`p-2 w-full outline-none text-[1.1rem] border  ${
                        errors.longitude
                          ? 'border-red-500 border-2'
                          : 'border-black'
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                      <label htmlFor="azimuth">Azimuth°</label>
                      <button
                        className="cursor-help relative"
                        data-tooltip-id="azimuth-tooltip"
                        data-tooltip-content={azimuthText}
                        data-tooltip-place="top"
                      >
                        <Tooltip
                          id="azimuth-tooltip"
                          style={{
                            width: '400px',
                            lineHeight: '1.2',
                            textAlign: 'left',
                          }}
                        />
                        <img src={(<HelpIcon />).type} className="w-5 h-5" />
                      </button>
                    </div>

                    <input
                      label="Azimuth"
                      placeholder="Azimuth"
                      name="azimuth"
                      disabled={project.readOnly}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.azimuth}
                      type="number"
                      autoComplete="off"
                      className={`p-2 w-full outline-none text-[1.1rem] border ${
                        errors.azimuth
                          ? 'border-red-500 border-2'
                          : 'border-black'
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                      <label htmlFor="inclination">Inclination°</label>
                      <button
                        data-tooltip-id="inclination-tooltip"
                        data-tooltip-content={inclinationText}
                        data-tooltip-place="top"
                        className="cursor-help relative"
                      >
                        <Tooltip
                          id="inclination-tooltip"
                          style={{
                            width: '400px',
                            lineHeight: '1.2',
                            textAlign: 'left',
                          }}
                        />
                        <img src={(<HelpIcon />).type} className="w-5 h-5" />
                      </button>
                    </div>
                    <input
                      label="Inclination"
                      placeholder="inclination"
                      name="inclination"
                      disabled={project.readOnly}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.inclination}
                      type="number"
                      autoComplete="off"
                      className={`p-2 w-full outline-none text-[1.1rem] border ${
                        errors.inclination
                          ? 'border-red-500 border-2'
                          : 'border-black'
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="area">
                      Area(m<sup>2</sup>)
                    </label>
                    <input
                      label="Area"
                      placeholder="Area"
                      name="area"
                      disabled={project.readOnly}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.area}
                      type="number"
                      autoComplete="off"
                      className={`p-2 w-full outline-none text-[1.1rem] border  ${
                        errors.area ? 'border-red-500 border-2' : 'border-black'
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="systemLoss">System Loss(%)</label>
                    <input
                      label="Loss"
                      placeholder="Loss"
                      name="systemLoss"
                      disabled={project.readOnly}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.systemLoss}
                      type="number"
                      autoComplete="off"
                      className={`p-2 w-full outline-none text-[1.1rem] border  ${
                        errors.systemLoss
                          ? 'border-red-500 border-2'
                          : 'border-black'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row lg:p-5 md:p-5 p-3 md:justify-end lg:justify-end lg:space-x-5 md:space-x-5 space-x-4 justify-center">
              <Button
                type="submit"
                text={'Save'}
                disable={!dirty || project.readOnly}
                icon={<SaveIcon />}
                color={'#22c55e'}
              />
              <Button
                type="button"
                text={'Delete'}
                disable={project.readOnly}
                icon={<DeleteIcon />}
                color={'#ef4444'}
                handleClick={() =>
                  dispatch(
                    deleteProduct({
                      projectID: project._id,
                      productID: item._id,
                    })
                  )
                }
              />
              <Button
                type="button"
                text={'Sync'}
                icon={<SyncIcon />}
                color={'#60a5fa'}
                disable={item.premium || project.readOnly}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductItem;
