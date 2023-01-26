import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ReactCodeInput = dynamic(import("react-code-input"));

import css from "../../../styles/ChangePin.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Sidebar from "../../../components/sidebar/Sidebar";
import Drawers from "../../../components/drawer/Drawer";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

function ChangePin() {
  const [getpin, setGetpin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [check, setCheck] = useState(false);

  const valuePin = (e) => setGetpin(`${e}`);

  const router = useRouter();
  const props = {
    className: css.reactCodeInput,
    inputStyle: {
      fontFamily: "Nunito Sans",
      marginTop: "60px",
      marginLeft: "7.5px",
      marginRight: "7.5px",
      MozAppearance: "textfield",
      width: "15%",
      borderRadius: "3px",
      fontSize: "30px",
      height: "50px",
      paddingLeft: "7px",
      backgroundColor: "white",
      color: "#3A3D42",
      borderBottom: "2px solid #6379F4",
      textAlign: "center",
    },
  };

  const handleContinue = () => {
    const getToken = Cookies.get("token");
    axios
      .get(
        `https://fazzpay-rose.vercel.app/user/pin/${getpin}`,

        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        setGetpin("");
        toast.success(res.data.msg);

        setTimeout(() => {
          setCheck(true);
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  const valueNewPin = (e) => setNewPin(`${e}`);
  const handleChange = () => {
    const getId = Cookies.get("id");
    const getToken = Cookies.get("token");
    axios
      .patch(
        `https://fazzpay-rose.vercel.app/user/pin/${getId}`,
        {
          pin: getpin,
        },

        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.msg);
        setTimeout(() => {
          router.replace("/profile");
        }, 2000);
      })
      .catch((err) => {
        console.log(newPin);
        toast.error(err.response.data.msg);
      });
  };

  if (!check)
    return (
      <>
        <Header />
        <div className={`container-fluid ${css.background_container}`}>
          <div className={`container d-flex gap-4 ${css.content_inti}`}>
            <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
              <Sidebar page="profile child" />
            </section>
            <div
              className={`col-lg-9 col-md-12 col-sm-12 ${css.content_right}`}
            >
              <section className={`d-flex flex-column`}>
                <div className={`${css.tittle}`}>Change PIN</div>
                <div className={`${css.desc}`}>
                  Enter your current 6 digits Fazzpay PIN below to continue to
                  the next steps.
                </div>
              </section>
              <section className={`${css.bottomContainer}`}>
                <div className={`${css.inputContainer}`}>
                  <div className={`${css.inputPin}`}>
                    <div className={css.pin}>
                      <ReactCodeInput
                        type="password"
                        fields={6}
                        pattern="/^-?\d+\.?\d*$/"
                        value={getpin}
                        onChange={valuePin}
                        {...props}
                      />
                    </div>
                  </div>
                </div>
                <div className={`${css.btnContainer}`}>
                  <div className={`${css.btn}`} onClick={handleContinue}>
                    Countinue
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
        <Drawers pages="profile child" />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"
        />
      </>
    );

  if (check)
    return (
      <>
        <Header />
        <div className={`container-fluid ${css.background_container}`}>
          <div className={`container d-flex gap-4 ${css.content_inti}`}>
            <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
              <Sidebar page="profile child" />
            </section>
            <div
              className={`col-lg-9 col-md-12 col-sm-12 ${css.content_right}`}
            >
              <section className={`d-flex flex-column`}>
                <div className={`${css.tittle}`}>Change PIN</div>
                <div className={`${css.desc}`}>
                  Type your new 6 digits security PIN to use in Fazzpay.
                </div>
              </section>
              <section className={`${css.bottomContainer}`}>
                <div className={`${css.inputContainer}`}>
                  <div className={`${css.inputPin}`}>
                    <div className={css.pin}>
                      <ReactCodeInput
                        type="pin"
                        fields={6}
                        pattern="/^-?\d+\.?\d*$/"
                        value={getpin}
                        onChange={valueNewPin}
                        {...props}
                      />
                    </div>
                  </div>
                </div>
                <div className={`${css.btnContainer}`}>
                  <div className={`${css.btn}`} onClick={handleChange}>
                    Change PIN
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
        <Drawers pages="profile child" />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"
        />
      </>
    );
}

export default ChangePin;
