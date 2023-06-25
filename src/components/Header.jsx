import LogoIcon from '../assets/logo.svg';
import moment from 'moment/moment';

const Header = () => {
  return (
    <div className="flex w-full h-[60px] text-black text-center border-b border-black items-center pl-10 pr-16 justify-between">
      <div className="flex flex-row space-x-3 items-center">
        <img src={LogoIcon} className="w-10 h-10" />
        <span className="text-2xl font-semibold ">PV System Estimator</span>
      </div>
      <div className="text-xl">
        {moment(new Date()).format('dddd, MMMM Do YYYY')}
      </div>
    </div>
  );
};

export default Header;
