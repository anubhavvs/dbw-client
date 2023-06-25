import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { getProjectDetail } from '../../actions/projectActions';
import { createProduct } from '../../actions/productActions';
import ProductItem from '../../components/ProductItem';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import BackIcon from '../../assets/back.svg';
import AddIcon from '../../assets/add.svg';
import ReportIcon from '../../assets/report.svg';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';

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

  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const isAnyActive = project?.products?.some(
    (item) => item['status'] === 'Active'
  );

  useEffect(() => {
    if (productCreateError) {
      handleClick('error', productCreateError);
      console.log(productCreateError);
    }
    if (productCreateSuccess) {
      handleClick('success', 'New product added to this project.');
      dispatch(getProjectDetail(id));
    }
    dispatch({ type: PRODUCT_CREATE_RESET });
  }, [productCreateError, productCreateSuccess]);

  useEffect(() => {
    if (userInfo) {
      // console.log(userInfo); dispatch project details action
      dispatch(getProjectDetail(id));
    } else {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (projectDetailError) {
      handleClick('error', projectDetailError);
    }
  }, [projectDetailError]);
  return (
    <div className="flex flex-grow h-full w-full overflow-y-scroll">
      {projectDetailLoading || productCreateLoading ? (
        <Loader />
      ) : projectDetailError ? (
        <span>Something went wrong...</span>
      ) : (
        <div className="p-10 w-full">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row space-x-5">
              <button onClick={() => navigate(-1)}>
                <img src={(<BackIcon />).type} className="w-5 h-5" />
              </button>
              <span className="text-[2rem]">{project.name}</span>
            </div>
            <div className="flex flex-row space-x-5">
              <Button
                text={'Report'}
                disable={!isAnyActive}
                icon={<ReportIcon />}
                handleClick={() => {
                  console.log(id);
                }}
              />
              <Button
                text={'Add Product'}
                disable={project?.products?.length == 3 && !userInfo.premium}
                icon={<AddIcon />}
                handleClick={() => {
                  dispatch(createProduct(id));
                }}
              />
            </div>
          </div>
          {project?.products?.length > 0 ? (
            <div className="grid grid-cols-1 mt-5 gap-4 pb-10">
              {project.products.map((item) => (
                <ProductItem key={item._id} item={item} />
              ))}
            </div>
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
