import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import MetaData from "../Metadata";
// import PinDropIcon from "@material-ui/icons/PinDrop";
// import HomeIcon from "@material-ui/icons/Home";
// import LocationCityIcon from "@material-ui/icons/LocationCity";
// import PublicIcon from "@material-ui/icons/Public";
// import PhoneIcon from "@material-ui/icons/Phone";
// import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
// import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";

const Shipping = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cartItems);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone number should be of 10 Digits");
      return;
    }
    

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    Navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps  activeStep={0} />

      <div className="w-screen flex mt-12 justify-center h-screen ">
        <div className="shippingBox">
          <h2 className="shippingHeading text-center text-4xl font-bold">
            Shipping Details
          </h2>

          <form
            className="w-screen  flex flex-col justify-center items-center "
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="my-4  mb-0 py-2">
              <input
                className="w-72"
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="my-2 py-2">
              <input
                className="w-72"
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <input
                className="w-72"
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className="my-4 py-2">
              <input
                className="w-72"
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div className="my-4 mt-0 py-2">
              <select
                className="w-72 text-zinc-600"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <select
                  className="w-72"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn mt-4 hover:bg-orange-600 bg-orange-500 px-4 text-white rounded-xl cursor-pointer w-72 p-2"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
      <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
    </Fragment>
  );
};

export default Shipping;
