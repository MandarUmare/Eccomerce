import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { IoOptions } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
// import ImportExportIcon from "@material-ui/icons/ImportExport";
// import ListAltIcon from "@material-ui/icons/ListAlt";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineImportExport } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { FiFilter } from "react-icons/fi";

const Sidebar = () => {
  const [display, setDisplay] = useState("hidden");
  const onFilter = () => {
    if (display === "hidden") {
      setDisplay("block");
    } else {
      setDisplay("hidden");
    }
  };
  return (
    <div className="flex sm:w-[20%] w-full flex-col sm:bg-white mx-4 mt-4">
      <span
        onClick={() => {
          onFilter();
        }}
        className="bg-zinc-100 sm:hidden  w-10   rounded-full h-8 flex items-center justify-center"
      >
        <IoOptions size={30} color="black"></IoOptions>
        {/* <SlOptionsVertical size={25} color="black"></SlOptionsVertical> */}
      </span>
      <div
        className={`filterBox mx-4 p-4 sm:p-0 sm:bg-white sm:block sm:rounded-none  rounded-2xl mt-4 ${display}   bg-indigo-50 sm:w-full`}
      >
        <Link to="/">
          <h1 className="text-4xl font-bold text-orange-400 p-2">Eccommerce</h1>
        </Link>
        <Link to="/admin/dashboard">
          <p className="flex items-center w-full py-2 my-6 hover:bg-sky-100 px-2  mt-4">
            <MdDashboard className="mr-2"></MdDashboard>Dashboard
          </p>
        </Link>
        <Link>
          <TreeView
            defaultCollapseIcon={<MdOutlineExpandMore></MdOutlineExpandMore>}
            defaultExpandIcon={<MdOutlineImportExport></MdOutlineImportExport>}
          >
            <TreeItem nodeId="1" label="Products">
              <Link
                className="flex items-center py-2 mt-2 hover:bg-sky-100 px-2"
                to="/admin/products"
              >
                <TreeItem
                  nodeId="2"
                  label="All"
                  icon={<MdOutlinePostAdd></MdOutlinePostAdd>}
                />
              </Link>

              <Link
                className="flex items-center py-2  hover:bg-sky-100 px-2"
                to="/admin/product"
              >
                <TreeItem
                  nodeId="3"
                  label="Create"
                  icon={<MdAddBox></MdAddBox>}
                />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>
        <Link to="/admin/orders">
          <p className="flex items-center py-2 my-6 hover:bg-sky-100 px-2">
            <FaListAlt className="mr-2"></FaListAlt> Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p className="flex items-center py-2 my-6 hover:bg-sky-100 px-2">
            <IoPeople className="mr-2"></IoPeople>Users
          </p>
        </Link>
        <Link to="/admin/reviews">
          <p className="flex items-center py-2 my-6 hover:bg-sky-100px-2">
            <MdRateReview className="mr-2"></MdRateReview>Reviews
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
