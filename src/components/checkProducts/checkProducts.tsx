import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SkeletonComponent } from "./skeleton/skeleton";
import { Products } from "./products/products";
import { Pagination } from "antd";
import { Idata } from "../../types";
import styled from "styled-components";

export const CheckProducts = ({
  search,
  regionSelect,
}: {
  search: string;
  regionSelect: string;
}) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<Idata[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchData = async (page: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      setLoading(true);
      const response = await axios.get(
        `https://api.abusahiy.uz/api/client/admin/dashboard?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataSource(response.data.data);
      setTotalItems(response.data.total_items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const pageSize = 20;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <>
          <Products
            dataSource={dataSource}
            search={search}
            regionSelect={regionSelect}
          />
        </>
      )}
      <StyleDiv>
        <Pagination
          current={currentPage}
          total={totalItems} // `totalItems` serverdan olingan jami elementlar soni
          pageSize={pageSize}
          onChange={onPageChange}
          showSizeChanger={false} // Sahifa hajmini o'zgartirishni o'chirish
        />
      </StyleDiv>
    </div>
  );
};

const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .ant-pagination-item.ant-pagination-item-active {
    border-color: #ff602d !important;
    outline-color: #ff602d !important;
  }
  .ant-pagination-item.ant-pagination-item-active a {
    color: #ff602d !important;
  }
`;
