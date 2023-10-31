import { Flex, Image } from "antd";
import Card from "antd/es/card/Card";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ChatLogo from "../../assets/chatting-app.png";

import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"; //<LockOutlined />
import FormInput from "../../components/form/FormInput";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../config/firebase/firebase.config";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const registerHandelar = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirnPassword = e.target.confirnPassword.value;

    if (password !== confirnPassword) {
      return toast.error("Passwords do not match!");
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (result?.user?.email) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        setLoading(false);
      }

      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        id: result?.user?.uid,
      };

      dispatch(loginUser(userInfo));
    } catch (error) {
      toast.error(error.code);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register | Chat App</title>
      </Helmet>

      <Flex className="h-screen p-2 w-full" justify="center" align="center">
        <Card className="shadow-lg">
          <div className="w-11/12 m-auto bg-white rounded-lg sm:w-96 bg-opacity-80 ">
            <div className="space-y-2 px-12 py-4">
              <div className="flex justify-center items-center">
                <Link to="/">
                  <Image
                    style={{ width: "200px" }}
                    src={ChatLogo}
                    preview={false}
                  />
                </Link>
              </div>

              <h1 className="text-xl font-medium text-center md:text-2xl font-roboto">
                Welcome to Chat App!
              </h1>

              <div className="space-x-1 text-sm text-center md:text-base font-nunito">
                <span>Already have an account?</span>
                <Link to="/sign-in">
                  <button className="font-semibold text-blue-500">
                    Register
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-10 lg:px-6">
              <form
                onSubmit={registerHandelar}
                c
                lassName="text-base font-nunito"
              >
                <div className="space-y-4">
                  <FormInput
                    icon={<UserOutlined className="text-gray-400" />}
                    name={"name"}
                    placeholder={"Full Name"}
                    type={"text"}
                  />

                  <FormInput
                    icon={<MailOutlined className="text-gray-400" />}
                    name={"email"}
                    placeholder={"Email"}
                    type={"email"}
                  />

                  <FormInput
                    icon={<LockOutlined className="text-gray-400" />}
                    name={"password"}
                    placeholder={"Password"}
                    type={"password"}
                  />

                  <FormInput
                    icon={<LockOutlined className="text-gray-400" />}
                    name={"confirnPassword"}
                    placeholder={"Confirm Password"}
                    type={"password"}
                  />

                  <div className="flex items-start space-x-2 md:items-center">
                    <input
                      className="focus:outline-none"
                      type="checkbox"
                      name="terms"
                      id="serviceTerms"
                    />
                    <label
                      className="-mt-1 text-sm sm:mt-0"
                      htmlFor="serviceTerms"
                    >
                      <span>Remember Me</span>
                    </label>
                  </div>
                  <div>
                    <button
                      disabled={loading}
                      className="w-full mt-2 p-2 text-sm font-semibold text-center text-white transition duration-100 rounded-md md:text-lg font-nunito bg-gradient-to-r from-blue-600 to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-lg"
                    >
                      {loading ? "Loading..." : "Register"}
                    </button>

                    <div className=" my-12 flex justify-between items-center">
                      <button className="w-full h-[50px]">Google</button>
                      <button className="w-full h-[50px]">Facebook</button>
                      <button className="w-full h-[50px]">Github</button>
                    </div>

                    {/* <button className="w-full mt-2 p-2 text-sm font-semibold text-center text-white transition duration-100 rounded-md md:text-lg font-nunito bg-gradient-to-r from-blue-600 to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-lg">
                      Google
                    </button>

                    <button className="w-full mt-2 p-2 text-sm font-semibold text-center text-white transition duration-100 rounded-md md:text-lg font-nunito bg-gradient-to-r from-blue-600 to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-lg">
                      Facebook
                    </button>

                    <button className="w-full mt-2 p-2 text-sm font-semibold text-center text-white transition duration-100 rounded-md md:text-lg font-nunito bg-gradient-to-r from-blue-600 to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-lg">
                      Github
                    </button> */}
                  </div>
                </div>
              </form>

              {/* <div className="mt-4">
                      <Link to={googleCallBack?.data}>
                        <button className="w-full p-2 text-sm font-normal text-center transition bg-[#FB0C78] hover:bg-red-600 text-white duration-300 rounded-md md:text-lg font-roboto focus:outline-none hover:shadow-lg hover:text-black">
                          {googleLoading ? (
                            "Loading..."
                          ) : (
                            <span className="flex items-center justify-center gap-4">
                              <img
                                className="w-5 h-5 text-xs"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                                alt="google_logo"
                              />
                              <span>Continue with Google</span>
                            </span>
                          )}
                        </button>
                      </Link>
                    </div> */}
            </div>
          </div>
        </Card>
      </Flex>
    </>
  );
};

export default Register;
