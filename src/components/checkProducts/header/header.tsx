import { Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
interface IRegion {
  id: number;
  address: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export const HeaderPage = ({
  search,
  setSearch,
  regionSelect,
  setRegionSelect,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  regionSelect: string;
  setRegionSelect: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    SelectApi();
  }, []);

  const SelectApi = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await axios.get(
        `https://api.abusahiy.uz/api/admin/pda/branch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "region");

      setRegions(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setRegionSelect(value);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setSearch(value);
    }
  };
  return (
    <div>
      <div className="flex gap-10 items-center mb-10">
        <div>
          <div className="background-white flex w-full items-center gap-5 px-10">
            <div className="flex align-center items-center p-0 bg-white h-[40px] px-5 rounded-full">
              <Input
                placeholder="Qidirish"
                value={search}
                allowClear
                onChange={handleInputChange}
                style={{
                  boxShadow: "none",
                  borderRadius: 100,
                  outline: "none",
                  height: "39px",
                  width: "250px",
                  border: "none",
                  background: "white",
                }}
              />
            </div>{" "}
          </div>
        </div>
        <div>
          <Select
            defaultValue={regionSelect}
            style={{ minWidth: 120 }}
            onChange={handleChange}
            options={regions.map((region: IRegion) => ({
              value: region.name,
              label: region.name,
            }))}
          />
        </div>
      </div>
    </div>
  );
};
