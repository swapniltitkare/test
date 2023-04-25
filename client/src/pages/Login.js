import { message, Form, Avatar, Typography } from "antd";
import { TextField, Button, Card, Box } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from '@material-ui/icons//Lock';

import "../styles/login.css";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
const Login = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;
    // dispatch(setLoading(true));
    await axios
      .post("http://localhost:8080/api/v1/auth/login", values)
      .then((res) => {
        localStorage.setItem(
          "authToken",
          JSON.stringify({
            token: res.data.token,
            user: res.data.user,
          })
        );

        setAuth({ ...auth, user: res.data.user, token: res.data.token });

        if (res.data.user.role === 0) {
          navigate("/student/dashboard");
          toast.success("student logIn success");
        } else if (res.data.user.role === 1) {
          navigate("/admin/dashboard");
          toast.success("admin logIn success");
        } else if (res.data.user.role === 2) {
          navigate(`/hr/dashboard/${res.data.user._id}`);
          toast.success("hr logIn success");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
    <div>

    
      <section className="login col-11 d-flex">
        <div className="flex-2">
          <img src="images/Capture.png" />
        </div>
        <div className="col-md-5 col-sm-8 col-11 mx-auto text-center">
          <Typography className="heading" style={{justifyContent:'start'}}>{"Welcome Back :)"}</Typography>
          <Typography className="heading2">
            Get ready to experience seamless access to your account with just
            one click. 🔔
          </Typography>

          <Form
            style={{
              // boxShadow: "1px 2px 10px aqua",
              background: "transparent",
              padding: "20px 10px",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* <Avatar className=" avatar my-3">
              <LockOutlinedIcon />
            </Avatar> */}

            {/* <h4>Sign In</h4> */}
          

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircleIcon
                className=""
                  sx={{color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="input-with-sx"
                  label="Email Address"
                  variant="standard"
                  type={"email"}
                  placeholder="Enter email address"
                  className="col-10"
                />
              </Box>
            </Form.Item>

           

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockIcon
                className=""
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="input-with-sx"
                  variant="standard"
                  type={"password"}
                  label="Password"
                  placeholder="Enter Password"
                  className="col-10"
                />
              </Box>
            </Form.Item>

            <Button
              className="col-12"
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </section>
      </div>
    </>
  );
};

export default Login;
