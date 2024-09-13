/** @jsxImportSource @emotion/react */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  message,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { TbPlus } from "react-icons/tb";
import { Header } from "antd/es/layout/layout";
import { css } from "@emotion/react";
import { FiFilter } from "react-icons/fi";
import { setJob } from "../../Store/slices/JobSlice";
import { setCompany } from "../../Store/slices/CompanySlice";
import Link from "antd/es/typography/Link";

const Company = () => {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showSelect, setShowSelect] = useState(false);

  const Company = useSelector((store: RootState) => store.company.company);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Search } = Input;

  useEffect(() => {
    fetchData();
    JobData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://6bd200711e1d153c.mokky.dev/Company`);
      dispatch(setCompany(res.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const JobData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://6bd200711e1d153c.mokky.dev/Job`);
      dispatch(setJob(res.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const edit = (item: any) => {
    setIsEditing(true);
    setOpen(true);
    setCurrentItem(item);
    form.setFieldsValue({
      key: item.id,
      id: item.id,
      title: item.title,
      img: item.img,
      description: item.description,
      website: item.website,
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
      img: values.img,
      description: values.description,
      website: values.website,
    };
    try {
      if (isEditing && currentItem) {
        await axios.patch(
          `https://6bd200711e1d153c.mokky.dev/Company/${currentItem.id}`,
          data
        );
        message.success("Muafaqiyatli o'zgartirildi");
      } else {
        await axios.post(`https://6bd200711e1d153c.mokky.dev/Company`, data);
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
      await axios.delete(`https://6bd200711e1d153c.mokky.dev/Company/${id}`);
      message.success("Muafaqiyatli o'chirildi");
      await fetchData();
    } catch (error) {
      message.error("O'chirishda xatolik");
    }
  };

  const filteredCompany = Company.filter((item: any) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory !== null ? item.title === selectedCategory : true;
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
      title: "Image",
      dataIndex: "img",
      key: "img",
      //@ts-ignore
      render: (text: any, record: any) => (
        <div
          css={css`
            width: 80px !important;
            max-height: 80px !important;
            object-fit: cover;
            margin: 0 !important;
          `}
        >
          <img src={text} />
        </div>
      ),
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "website",
      dataIndex: "website",
      key: "website",
      //@ts-ignore
      render: (text: any, record: any) => {
        return <Link> {text}</Link>;
      },
    },

    {
      title: "Action",
      key: "Action",
      render: (record: any) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => edit(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteItem(record.id)}
          />
        </Space>
      ),
    },
  ];

  const dataSource = filteredCompany.map((item: any) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    img: item.img,
    description: item.description,
    website: item.website,
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
              style={{ width: 120 }}
              placeholder="Filter"
              allowClear
              value={selectedCategory}
              onChange={onCategoryChange}
              options={[
                { value: null, label: "All" }, // "All" variantini qo'shamiz
                ...Company.map((cat: any) => ({
                  value: cat.title,
                  label: cat.title,
                })),
              ]}
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
      <>
        {loading ? (
          <Spin tip="Loading" size="large" style={{ marginTop: 30 }}>
            .
          </Spin>
        ) : (
          <>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 7 }}
            />
            <Drawer
              title={isEditing ? "Edit Item" : "Add Item"}
              onClose={onClose}
              open={open}
            >
              <Form
                name="basic"
                form={form}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
                requiredMark={false}
                layout="vertical"
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please input your title!" },
                  ]}
                >
                  <Input placeholder="title kiring" />
                </Form.Item>
                <Form.Item label="Image" name="img">
                  <Input placeholder="image kiring" />
                </Form.Item>
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
                  <Input placeholder="description kiring" />
                </Form.Item>
                <Form.Item
                  label="Wesite"
                  name="website"
                  rules={[
                    {
                      required: true,
                      message: "Please input your website!",
                    },
                  ]}
                >
                  <Input placeholder="website kiring" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    {isEditing ? "Save " : "Add "}
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>
          </>
        )}
      </>
    </>
  );
};

export default Company;
