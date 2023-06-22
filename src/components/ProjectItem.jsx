import { useState } from 'react';
import ArrowDownIcon from '../assets/arrowdown.svg';
import ArrowUpIcon from '../assets/arrowup.svg';

const ProjectItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const onClickHandler = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <div
        className="flex flex-row justify-between border border-black p-5 cursor-pointer rounded-lg items-center"
        onClick={onClickHandler}
      >
        <div className="flex flex-col">
          <span className="text-[1.2rem] font-bold">{item.name}</span>
          <span>No. of Products: {item.products.length}</span>
          <span>Description: {item.description}</span>
        </div>
        <div>
          {dropdown ? (
            <img src={ArrowUpIcon} className="w-5 h-5" />
          ) : (
            <img src={ArrowDownIcon} className="w-5 h-5" />
          )}
        </div>
      </div>
      {dropdown && <div>product</div>}
    </>
  );
};

export default ProjectItem;
