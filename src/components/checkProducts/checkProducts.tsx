import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SkeletonComponent } from "./skeleton/skeleton";
import { Products } from "./products/products";
import { Pagination } from "antd";
import { Idata } from "../../types";
import styled from "styled-components";

export const CheckProducts = ({ search }: { search: string }) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<Idata[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      setLoading(true);
      const response = await axios.get(
        ` https://api.abusahiy.uz/api/client/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "data");

      setDataSource(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const pageSize = 20;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = dataSource.slice(startIndex, endIndex);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <>
          <Products dataSource={currentItems} search={search} />
        </>
      )}
      <StyleDiv>`
        <Pagination
          current={currentPage}
          total={dataSource.length}
          pageSize={pageSize}
          onChange={onPageChange}
          showSizeChanger={false} // To disable changing page size
        />
      </StyleDiv>
    </div>
  );
};

const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  /* Make sure this targets the specific active pagination item */
  .ant-pagination-item.ant-pagination-item-active {
    border-color: #ff602d !important;
    outline-color: #ff602d !important;
  }
  .ant-pagination-item.ant-pagination-item-active a {
    color: #ff602d !important;
  }
`;
