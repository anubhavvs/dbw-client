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
} from './reducers/projectReducers';
import { allSystemListReducer } from './reducers/systemReducers';
import { productCreateReducer } from './reducers/productReducer';
import { respoonsiveReducer } from './reducers/responsiveReducer';

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
});

const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
