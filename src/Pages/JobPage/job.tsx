/** @jsxImportSource @emotion/react */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import styled from "@emotion/styled";
import { TbPlus } from "react-icons/tb";
import { Header } from "antd/es/layout/layout";
import { css } from "@emotion/react";
import { FiFilter } from "react-icons/fi";
import { setJob } from "../../Store/slices/JobSlice";
import { setCompany } from "../../Store/slices/CompanySlice";

export const Job = () => {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showSelect, setShowSelect] = useState(false);

  const Job = useSelector((store: RootState) => store.job.job);
  const company = useSelector((store: RootState) => store.company.company);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Search } = Input;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [JobRes, companyRes] = await Promise.all([
        axios.get(`https://6bd200711e1d153c.mokky.dev/Job`),
        axios.get(`https://6bd200711e1d153c.mokky.dev/Company`),
      ]);
      dispatch(setJob(JobRes.data));
      dispatch(setCompany(companyRes.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const edit = (item: any) => {
    setIsEditing(true);
    setOpen(true);
    setCurrentItem(item);
    form.setFieldsValue({
      title: item.title,
      description: item.description,
      technalogies: item.technalogies,
      location: item.location,
      salary: item.salary,
      phone: item.phone,
      email: item.email,
      telegram: item.telegram,
      instagram: item.instagram,
      companyId: item.companyId,
    });
  };

  const openAddDrawer = () => {
    setIsEditing(false);
    setOpen(true);
    form.resetFields();
  };

  const onClose = () => {
    setOpen(false);
    setCurrentItem(null);
  };

  const onFinish = async (values: any) => {
    const data = {
      title: values.title,
      description: values.description,
      technalogies: values.technalogies,
      location: values.location,
      salary: values.salary,
      phone: values.phone,
      email: values.email,
      telegram: values.telegram,
      instagram: values.instagram,
      companyId: values.companyId,
    };
    try {
      if (isEditing && currentItem) {
        await axios.patch(
          `https://6bd200711e1d153c.mokky.dev/Job/${currentItem.id}`,
          data
        );
        message.success("Muafaqiyatli o'zgartirildi");
      } else {
        await axios.post(`https://6bd200711e1d153c.mokky.dev/Job`, data);
        message.success("Muafaqiyatli qo'shildi");
      }
      fetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`https://6bd200711e1d153c.mokky.dev/Job/${id}`);
      message.success("muafaqiyatli ochirildi");
      await fetchData();
    } catch (error) {
      message.error("ochirshda xatolik");
    }
  };

  const filteredJob = Job.filter((item: any) => {
    const matchesSearch = item.technalogies
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory !== null
        ? selectedCategory === 0
          ? true // "All" tanlanganida hammasini ko'rsatish
          : item.companyId === selectedCategory
        : true;
    return matchesSearch && matchesCategory;
  });

  const onCategoryChange = (value: number | null) => {
    setSelectedCategory(value);
    setShowSelect(false);
  };
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      //@ts-ignore
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Technalogies",
      dataIndex: "technalogies",
      key: "technalogies",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telegram",
      dataIndex: "telegram",
      key: "telegram",
    },
    {
      title: "Instagram",
      dataIndex: "instagram",
      key: "instagram",
    },
    {
      title: "Action",
      key: "Action",
      render: (item: any) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => edit(item)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteItem(item.id)}
          />
        </Space>
      ),
    },
  ];

  const dataSource = filteredJob.map((item: any) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    description: item.description,
    technalogies: item.technalogies,
    location: item.location,
    salary: item.salary,
    phone: item.phone,
    email: item.email,
    telegram: item.telegram,
    instagram: item.instagram ? item.instagram : null,
    companyId: item.companyId,
  }));

  return (
    <>
      <Header
        css={css`
          padding: 0;
          display: flex;
          justify-content: space-between;
        `}
      >
        <div className="flex items-center">
          <Search
            placeholder="Qidiruv"
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />
        </div>
        <div className="flex gap-5 items-center me-5">
          {showSelect ? (
            <Select
              style={{
                width: 110,
                borderRadius: "50%",
                background: "#ffffff",
                color: "#8b8d94",
              }}
              placeholder="Filter"
              allowClear
              onChange={onCategoryChange}
              options={[
                { value: 0, label: "All" },
                ...company.map((cat: any) => ({
                  value: cat.id,
                  label: cat.title,
                })),
              ]}
              onBlur={() => setShowSelect(false)}
            />
          ) : (
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#ffffff",
                color: "#8b8d94",
                border: "none",
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              icon={<FiFilter style={{ fontSize: 16, marginTop: 2 }} />}
              onClick={() => setShowSelect(true)}
            />
          )}

          <Button onClick={openAddDrawer}>
            <TbPlus />
          </Button>
        </div>
      </Header>
      <Tablecss>
        {loading ? (
          <Spin tip="Loading" size="large" style={{ marginTop: 15 }}>
            .
          </Spin>
        ) : (
          <>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 8 }}
            />
            <Drawer
              title={isEditing ? "Edit Item" : "Add Item"}
              onClose={onClose}
              open={open}
            >
              <Form
                name="basic"
                form={form}
                // wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
                requiredMark={false}
                layout="vertical"
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      label="Title"
                      name="title"
                      rules={[
                        { required: true, message: "Please input your title!" },
                      ]}
                    >
                      <Input placeholder="title kiriting" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Please input your description!",
                        },
                      ]}
                    >
                      <Input placeholder="description kiriting" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Technalogies"
                      name="technalogies"
                      rules={[
                        {
                          required: true,
                          message: "Please input your technalogies!",
                        },
                      ]}
                    >
                      <Input placeholder="technalogies kiriting" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Location"
                      name="location"
                      rules={[
                        {
                          required: true,
                          message: "Please input your location!",
                        },
                      ]}
                    >
                      <Input placeholder="location kiriting" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Salary"
                      name="salary"
                      rules={[
                        {
                          required: true,
                          message: "Please input your salary!",
                        },
                      ]}
                    >
                      <Input placeholder="salary kiriting" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone!",
                        },
                      ]}
                    >
                      <Input placeholder="phone kiriting" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input type="email" placeholder="email kiriting" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Telegram"
                      name="telegram"
                      rules={[
                        {
                          required: true,
                          message: "Please input your telegram!",
                        },
                      ]}
                    >
                      <Input placeholder="@ telegram kiriting" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Instagram"
                      name="instagram"
                      rules={[
                        {
                          required: true,
                          message: "Please input your instagram!",
                        },
                      ]}
                    >
                      <Input placeholder="instagram kiriting" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Company"
                      name="companyId"
                      rules={[
                        {
                          required: true,
                          message: "Please select Company!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="company tanlang "
                        options={company.map((cat: any) => ({
                          value: cat.id,
                          label: cat.title,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    {isEditing ? "Save" : "Add"}
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>
          </>
        )}
      </Tablecss>
    </>
  );
};

const Tablecss = styled.div`
  padding: 10px;
  height: 80vh !important;
`;
