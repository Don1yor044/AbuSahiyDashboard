import { Col, Row, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SkeletonComponent } from "../checkProducts/skeleton/skeleton";
import { Idata } from "../../types";

export const AllProducts = () => {
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState<Idata[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      setLoading(true);
      const response = await axios.get(
        `https://api.abusahiy.uz/api/admin/pda/location/show/all/15`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);

      setDataSource(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="p-5 rounded-[8px] shadow-[1px_1px_10px_rgba(124,124,124,0.3)] ">
        <div className="flex justify-between items-center">
          <div className="w-28 pr-[10px] border-r-2 border-[#ddd] text-center">
            <Typography className="text-sm font-medium">UserId</Typography>
          </div>
          <div className="flex-1 pr-[10px] border-r-2 border-[#ddd] text-center">
            <Typography className="text-sm font-medium">
              Customer Name
            </Typography>
          </div>
          <div className="flex-1 pr-[10px] border-r-2 border-[#ddd] text-center">
            <Typography className="text-sm font-medium">
              Paid / Unpaid
            </Typography>
          </div>
          <div className="flex-1 pr-[10px] border-r-2 border-[#ddd] text-center">
            <Typography className="text-sm font-medium">Weight</Typography>
          </div>
          <div className="flex-1 pr-[10px] border-r-2 border-[#ddd] text-center">
            <Typography className="text-sm font-medium">
              Phone Number
            </Typography>
          </div>
          <div className="flex-1 pr-[10px] text-center">
            <Typography className="text-sm font-medium">Price</Typography>
          </div>
        </div>
      </div>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <>
          <Row
            gutter={[0, 16]}
            className="mt-7 h-[78vh] overflow-auto py-2 px-1"
          >
            {dataSource.map((item, index) => (
              <Col span={24} key={index}>
                <div className="p-4 rounded-[8px] shadow-[1px_1px_10px_rgba(124,124,124,0.3)] ">
                  <div className="flex justify-between items-center">
                    <div className="w-28 text-center border-r-2 border-[#ddd] pr-[10px] ">
                      <Typography className="text-sm">
                        {item.user_id}
                      </Typography>
                    </div>
                    <div className="flex-1 pr-[10px] border-r-2 border-[#ddd] text-center">
                      <Typography className="text-sm font-medium">
                        {"Doniyor Mamaraimov"}
                      </Typography>
                    </div>
                    <div className="flex-1 pr-[10px] border-r-2 border-[#ddd] text-center">
                      <Typography className={`text-sm `}>paid</Typography>
                    </div>
                    <div className="flex-1 pr-[10px] border-r-2 border-[#ddd] text-center">
                      <Typography className="text-sm">45kg</Typography>
                    </div>
                    <div className="flex-1 pr-[10px] border-r-2 border-[#ddd] text-center">
                      <Typography className="text-sm">+998972774944</Typography>
                    </div>

                    <div className="flex-1 text-center">
                      <Typography className="text-sm">30.000</Typography>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};
