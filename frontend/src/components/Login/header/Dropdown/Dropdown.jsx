import React from "react";

const Dropdown = ({ categoriesData }) => {
  return (
    <div className=" bg-white shadow-xl shadow-slate-600 relative z-10">
      <ul>
      
        {categoriesData.map((item, index) => (
          <li className="px-2 py-2 hover:bg-indigo-200" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
