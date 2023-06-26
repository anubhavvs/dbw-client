import LogoIcon from '../assets/logo.svg';
import MenuIcon from '../assets/menu.svg';
import moment from 'moment/moment';

const Header = ({ setMobileView }) => {
  return (
    <div className="flex w-full h-[60px] text-black text-center border-b border-black items-center pl-3 lg:pl-8 md:pl-8 lg:pr-16 md:pr-16 lg:justify-between md:justify-between">
      <div className="flex flex-row items-center space-x-3">
        <button
          className="lg:hidden md:hidden block"
          onClick={() => setMobileView(true)}
        >
          <img src={MenuIcon} className="w-8 h-8" />
        </button>
        <div className="flex flex-row space-x-3 items-center">
          <img
            src={LogoIcon}
            className="lg:w-10 lg:h-10 md:h-10 md:w-10 h-8 w-8"
          />
          <span className="md:text-2xl lg:text-2xl text-xl font-semibold">
            PV System Estimator
          </span>
        </div>
      </div>
      <div className="text-xl hidden lg:block md:block">
        {moment(new Date()).format('dddd, MMMM Do YYYY')}
      </div>
    </div>
  );
};

export default Header;
