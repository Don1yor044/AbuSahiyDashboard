import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";

import { ToastContainer, toast } from "react-toastify";
type FieldType = {
  phone: number;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const notifySuccess = () => toast.success("Login successful!");
  const notifyError = () => toast.error("Login failed! Please try again.");

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await axios.post(
        "https://api.abusahiy.uz/api/admin/locker/service/user/login", // API endpoint
        {
          phone: values.phone,
          password: values.password,
        }
      );
      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        notifySuccess();
        navigate("/checkProducts");
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
      console.error("Login failed:", error); // handle error
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    navigate("/");
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="flex justify-center">
          <img src="../abuSahiy.png" alt="abuSahiy" className="w-64" />
        </div>
        <Form
          name="basic"
          style={{ minWidth: 350 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          {/* <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null} className="flex justify-center">
            <Button
              type="text"
              className="bg-[#fd521c] text-white"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};
