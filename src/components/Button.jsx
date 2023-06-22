const Button = ({ text, icon, disable, handleClick }) => {
  return (
    <button
      className={`flex flex-row items-center border ${
        disable ? 'bg-[#9f9fa1]' : 'bg-[#cdcfd3]'
      }  px-3 space-x-2 rounded-xl`}
      disabled={disable}
      onClick={handleClick}
    >
      <img src={icon.type} className="w-5 h-5" />
      <span className="text-md">{text}</span>
    </button>
  );
};

export default Button;
