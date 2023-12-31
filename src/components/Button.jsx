const Button = ({
  text,
  icon,
  disable,
  handleClick,
  type = 'button',
  color,
  id,
}) => {
  return (
    <button
      id={id}
      type={type}
      className={`flex flex-row items-center border py-2 h-fit max-w-fit ${
        disable ? 'bg-[#9f9fa1]' : 'bg-[#cdcfd3]'
      }  px-3 space-x-2 rounded-xl`}
      disabled={disable}
      onClick={handleClick}
      style={{ background: color }}
    >
      {icon && <img src={icon?.type} className="w-5 h-5" />}
      <span className="text-md">{text}</span>
    </button>
  );
};

export default Button;
