import { Divider, Flex, Image } from "antd";
import Card from "antd/es/card/Card";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ChatLogo from "../../assets/chatting-app.png";

import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"; //<LockOutlined />
import FormInput from "../../components/form/FormInput";
import { toast } from "react-hot-toast";
import {
  createUser,
  facebookAuthLogin,
  githubAuthLogin,
  googleAuthLogin,
} from "../../config/firebase/auth.provaider";
import { useCreateUpdateUserMutation } from "../../features/user/userApi";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [createUpdateUser] = useCreateUpdateUserMutation();

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

    const userInfo = await createUser(email, password, name);
    await createUpdateUser(userInfo);
    setLoading(false);
  };

  const googleLoginHandelar = async () => {
    const userInfo = await googleAuthLogin();
    await createUpdateUser(userInfo);
  };

  const facebookLoginHandelar = async () => {
    const userInfo = await facebookAuthLogin();
    await createUpdateUser(userInfo);
  };

  const githubLoginHandelar = async () => {
    const userInfo = await githubAuthLogin();
    await createUpdateUser(userInfo);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register | Chat App</title>
      </Helmet>

      <Flex className="h-screen p-2 w-full" justify="center" align="center">
        <Card className="border-none">
          <div className="w-11/12 m-auto bg-white rounded-lg sm:w-96 bg-opacity-80 ">
            <div className="space-y-2 py-4">
              <div className="flex justify-center items-center">
                <Link to="/">
                  <Image
                    style={{ width: "200px" }}
                    src={ChatLogo}
                    preview={false}
                  />
                </Link>
              </div>

              <div className="space-x-1 text-sm text-center md:text-base font-nunito">
                <h2 className="font-semibold text-2xl">Wellcome to Chat App</h2>
                <span>Already have an account?</span>
                <Link to="/sign-in">
                  <button className="font-semibold text-blue-500">Login</button>
                </Link>
              </div>
            </div>

            <div className="mt-2 lg:px-6">
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

                    <Divider>or use one of these options</Divider>

                    <div className=" my-12 flex justify-around items-center">
                      <div
                        onClick={googleLoginHandelar}
                        className="p-6 border rounded-md shadow-sm hover:shadow-md duration-300 cursor-pointer"
                      >
                        <Image
                          style={{ width: "30px", height: "30px" }}
                          preview={false}
                          src="https://imgs.search.brave.com/N8kQ66ubQfMUOKVBt08uJmwIGZLoJEOtx24EMq1O1SU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1Nzk1MjY0/MWdvb2dsZS1sb2dv/LXBuZy1pbWFnZS5w/bmc"
                        />
                      </div>

                      <div
                        onClick={facebookLoginHandelar}
                        className="p-6 border rounded-md shadow-sm hover:shadow-md duration-300 cursor-pointer"
                      >
                        <Image
                          style={{ width: "30px", height: "30px" }}
                          preview={false}
                          src="https://imgs.search.brave.com/OXFPj6F7qLGsqERSGguhGhTEKHmSiEbzhWaHf-CAfWo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODRhYzJkMDNhYzNh/NTcwZjk0YTY2NmQu/cG5n"
                        />
                      </div>

                      <div
                        onClick={githubLoginHandelar}
                        className="p-6 border rounded-md shadow-sm hover:shadow-md duration-300 cursor-pointer"
                      >
                        <Image
                          style={{ width: "30px", height: "30px" }}
                          preview={false}
                          src="https://imgs.search.brave.com/1fQWh1HTRWcKfQHLhg0KeQEAMeaeGDhSJbBrEYsen3g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9naXRo/dWIuZ2l0aHViYXNz/ZXRzLmNvbS9pbWFn/ZXMvbW9kdWxlcy9s/b2dvc19wYWdlL0dp/dEh1Yi1NYXJrLnBu/Zw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </Flex>
    </>
  );
};

export default Register;
