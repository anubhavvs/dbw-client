import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {
  getProjectDetail,
  getprojectReport,
} from '../../actions/projectActions';
import { createProduct } from '../../actions/productActions';
import ProductItem from '../../components/ProductItem';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import BackIcon from '../../assets/back.svg';
import AddIcon from '../../assets/add.svg';
import ReportIcon from '../../assets/report.svg';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_UPDATE_RESET,
} from '../../constants/productConstants';
import { PROJECT_REPORT_RESET } from '../../constants/projectConstants';
import { Helmet } from 'react-helmet';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectDetail = useSelector((state) => state.projectDetail);
  const {
    project,
    error: projectDetailError,
    loading: projectDetailLoading,
  } = projectDetail;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: productCreateLoading,
    success: productCreateSuccess,
    error: productCreateError,
  } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: productUpdateLoading,
    success: productUpdateSuccess,
    error: productUpdateError,
    project: projectUpdateInfo,
  } = productUpdate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: productDeleteLoading,
    success: productDeleteSuccess,
    error: productDeleteError,
  } = productDelete;

  const projectReport = useSelector((state) => state.projectReport);
  const {
    loading: projectReportLoading,
    success: projectReportSuccess,
    error: projectReportError,
  } = projectReport;

  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const isAnyActive = project?.products?.some(
    (item) => item['status'] !== 'Draft'
  );

  useEffect(() => {
    if (projectReportError) {
      handleClick('error', projectReportError);
    }
    if (projectReportSuccess) {
      handleClick('success', 'Report generated!');
    }
    dispatch({ type: PROJECT_REPORT_RESET });
  }, [projectReportError, projectReportSuccess]);

  useEffect(() => {
    if (productDeleteError) {
      handleClick('error', productDeleteError);
    }
    if (productDeleteSuccess) {
      handleClick('success', 'Product deleted.');
    }
    dispatch({ type: PRODUCT_DELETE_RESET });
  }, [productDeleteSuccess, productDeleteError]);

  useEffect(() => {
    if (productUpdateError) {
      handleClick('error', productUpdateError);
    }
    if (productUpdateSuccess) {
      handleClick('success', `${projectUpdateInfo.name} updated.`);
    }
    dispatch({ type: PRODUCT_UPDATE_RESET });
  }, [productUpdateSuccess, productUpdateError]);

  useEffect(() => {
    if (productCreateError) {
      handleClick('error', productCreateError);
    }
    if (productCreateSuccess) {
      handleClick('success', 'New product added.');
      dispatch(getProjectDetail(id));
    }
    dispatch({ type: PRODUCT_CREATE_RESET });
  }, [productCreateError, productCreateSuccess]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getProjectDetail(id));
    } else {
      navigate('/login');
    }
  }, [
    navigate,
    userInfo,
    productUpdateSuccess,
    productDeleteSuccess,
    projectReportSuccess,
  ]);

  useEffect(() => {
    if (projectDetailError) {
      handleClick('error', projectDetailError);
    }
  }, [projectDetailError]);
  return (
    <div className="flex flex-grow h-full w-full overflow-y-scroll">
      <Helmet>
        <title>Products</title>
      </Helmet>
      {projectDetailLoading ||
      productCreateLoading ||
      productUpdateLoading ||
      productDeleteLoading ||
      projectReportLoading ? (
        <Loader />
      ) : projectDetailError ? (
        <span>Something went wrong...</span>
      ) : (
        <div className="lg:p-10 md:p-10 p-5 w-full">
          <div className="flex lg:flex-row md:flex-row w-full justify-between flex-col space-y-3 md:space-y-0 lg:space-y-0">
            <div className="flex flex-row space-x-5">
              <button onClick={() => navigate(-1)}>
                <img src={(<BackIcon />).type} className="w-5 h-5" />
              </button>
              <span className="lg:text-[2rem] md:text-[2rem] text-[1.5rem]">
                {project.name}
              </span>
            </div>
            <div className="flex flex-row space-x-5 justify-end">
              <Button
                text={'Report'}
                disable={!isAnyActive || project.readOnly}
                icon={<ReportIcon />}
                handleClick={() => {
                  dispatch(getprojectReport(project._id));
                }}
              />
              <Button
                text={'Add Product'}
                disable={
                  (project?.products?.length == 3 && !userInfo.premium) ||
                  project.readOnly
                }
                icon={<AddIcon />}
                handleClick={() => dispatch(createProduct(id))}
              />
            </div>
          </div>
          {project?.products?.length > 0 ? (
            <>
              {project?.result && (
                <div className="border border-black mt-5 justify-center flex rounded-lg">
                  <img className="lg:w-2/3 md:w-2/3" src={project.result} />
                </div>
              )}
              <div className="grid grid-cols-1 mt-5 gap-4 pb-10">
                {project.products.map((item) => (
                  <ProductItem key={item._id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex mt-5">
              <span className="text-[1.2rem]">
                You dont have any product, click to create one!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
