import { Divider, Image } from "antd";
import Card from "antd/es/card/Card";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ChatLogo from "../../assets/chatting-app.png";

import { MailOutlined, LockOutlined } from "@ant-design/icons"; //<LockOutlined />
import FormInput from "../../components/form/FormInput";
import {
  facebookAuthLogin,
  githubAuthLogin,
  googleAuthLogin,
  signInEmailPassword,
} from "../../config/firebase/auth.provaider";
import { useCreateUpdateUserMutation } from "../../features/user/userApi";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.path?.pathname || "/";

  const [createUpdateUser] = useCreateUpdateUserMutation();

  const loginHandelar = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const userInfo = await signInEmailPassword(email, password);
    await createUpdateUser(userInfo);
    setLoading(false);
    navigate(path);
  };

  const googleLoginHandelar = async () => {
    const userInfo = await googleAuthLogin();
    await createUpdateUser(userInfo);
    navigate(path);
  };

  const facebookLoginHandelar = async () => {
    const userInfo = await facebookAuthLogin();
    await createUpdateUser(userInfo);
    navigate(path);
  };

  const githubLoginHandelar = async () => {
    const userInfo = await githubAuthLogin();
    await createUpdateUser(userInfo);
    navigate(path);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | Chat App</title>
      </Helmet>

      <main className="h-screen flex items-center justify-center">
        <Card className="border-none ">
          <div className="w-11/12 m-auto bg-white rounded-lg sm:w-96 bg-opacity-80 ">
            <div className="space-y-2 py-4">
              <div className="flex justify-center items-center">
                <Link to="/">
                  <Image
                    style={{ height: "100px" }}
                    src={ChatLogo}
                    preview={false}
                  />
                </Link>
              </div>

              <div className="space-x-1 text-sm text-center md:text-base font-nunito">
                <h2 className="font-semibold text-2xl">Wellcome Back!</h2>
                <span>New to Chat App?</span>
                <Link to="/register">
                  <button className="font-semibold text-blue-500">
                    Register
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-2 lg:px-6">
              <form onSubmit={loginHandelar} c lassName="text-base font-nunito">
                <div className="space-y-4">
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
                      className="w-full mt-2 p-2 text-sm font-semibold text-center text-white transition duration-100 rounded-md md:text-lg font-nunito bg-[#00475D]
                      focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-lg"
                    >
                      {loading ? "Loading..." : "Login"}
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
      </main>
    </>
  );
};

export default Signin;
