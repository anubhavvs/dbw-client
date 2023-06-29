import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userProfileDeleteReducer,
  userProfileReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import {
  projectListReducer,
  projectCreateReducer,
  projectUpdateReducer,
  projectDeleteReducer,
  projectDetailReducer,
  projectReportReducer,
} from './reducers/projectReducers';
import {
  allSystemListReducer,
  systemCreateReducer,
  systemDeleteReducer,
  systemUpdateReducer,
} from './reducers/systemReducers';
import {
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
} from './reducers/productReducer';
import { respoonsiveReducer } from './reducers/responsiveReducer';
import {
  companyLoginReducer,
  companyProfileDeleteReducer,
  companyProfileReducer,
  companyProfileUpdateReducer,
  companyRegisterReducer,
  companySystemsReducer,
} from './reducers/companyReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  projectList: projectListReducer,
  projectCreate: projectCreateReducer,
  projectUpdate: projectUpdateReducer,
  projectDelete: projectDeleteReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userProfileDelete: userProfileDeleteReducer,
  projectDetail: projectDetailReducer,
  allSystemList: allSystemListReducer,
  productCreate: productCreateReducer,
  responsive: respoonsiveReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  projectReport: projectReportReducer,
  companyLogin: companyLoginReducer,
  companyProfile: companyProfileReducer,
  companySystems: companySystemsReducer,
  systemCreate: systemCreateReducer,
  systemUpdate: systemUpdateReducer,
  systemDelete: systemDeleteReducer,
  companyProfileUpdate: companyProfileUpdateReducer,
  companyProfileDelete: companyProfileDeleteReducer,
  companyRegister: companyRegisterReducer,
});

const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const companyInfoFromStorage = localStorage.getItem('companyInfo')
  ? JSON.parse(localStorage.getItem('companyInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  companyLogin: { companyInfo: companyInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
