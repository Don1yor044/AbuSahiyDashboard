/** @jsxImportSource @emotion/react */
import { Button, Empty, Input, Row, Spin, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Idata } from "../../../types";
import { ProductHeader } from "./productHeader/productHeader";
import { css } from "@emotion/react";

export const Products = ({
  dataSource,
  search,
  regionSelect,
}: {
  dataSource: Idata[];
  search: string;
  regionSelect: string;
}) => {
  const [filteredData, setFilteredData] = useState<Idata[]>(dataSource);
  const [CardValue, setCardValue] = useState(0);
  const [CashValue, setCashValue] = useState(0);
  const [PaymeValue, setPaymeValue] = useState(0);
  const [CommentValue, setCommentValue] = useState(" ");

  const [isLoading, setIsloading] = useState(false);

  const [editingField, setEditingField] = useState<{
    id: number | null;
    field: string | null;
  }>({
    id: null,
    field: null,
  });
  const handleConfirm = async (id: number) => {
    const token = localStorage.getItem("token");
    setIsloading(true);
    try {
      const response = await axios.put(
        `https://api.abusahiy.uz/api/client/admin/dashboard/${id}`,
        {
          card: CardValue || 0,
          cash: CashValue || 0,
          payme: PaymeValue || 0,
          comment: CommentValue || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Yangi qiymat serverga jo'natildi:", response.data.data);

      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? {
                ...item,
                card: CardValue,
                cash: CashValue,
                payme: PaymeValue,
                comment: CommentValue,
              }
            : item
        )
      );

      setEditingField({ id: null, field: null });
    } catch (error) {
      console.error("Ma'lumotni yangilashda xatolik yuz berdi:", error);
    }
  };
  const startEditing = (id: number, field: string) => {
    setEditingField({ id, field });
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      setIsloading(true);
      console.log("region", regionSelect);
      console.log("data", dataSource);

      let filtered = dataSource;

      try {
        // Agar search mavjud bo'lsa, API dan ma'lumotni olish
        if (search.trim()) {
          const response = await axios.get(
            `https://api.abusahiy.uz/api/client/admin/dashboard/show/${search}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          filtered = response.data.data; // response dan olingan ma'lumot
        }

        // Region bo'yicha filtrni amalga oshirish
        if (regionSelect && regionSelect.toUpperCase() !== "SHOTA") {
          filtered = filtered.filter(
            (item) =>
              item.address &&
              item.address.toUpperCase() === regionSelect.toUpperCase()
          );
        }

        console.log(filtered, "filtered data"); // Debugging filtered data
        setFilteredData(filtered);
      } catch (error) {
        console.error("API error:", error);
        setFilteredData([]);
      }

      setIsloading(false);
    };

    fetchData();
  }, [search, dataSource, regionSelect]);

  return (
    <>
      <div css={scrollStyles} className="overflow-auto max-h-[80vh] p-2">
        <ProductHeader />
        {filteredData.length > 0 ? (
          isLoading ? (
            <div className="flex justify-center my-10">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <Row className="mt-3">
                {filteredData.map((item, index) => (
                  <div
                    className="p-0 rounded-[8px] shadow-[1px_1px_10px_rgba(124,124,124,0.3)] inline-block mt-2"
                    key={index}
                  >
                    <Row className="flex justify-between items-center flex-nowrap ">
                      <div className="min-w-28 pr-[10px] border-2 rounded-s-md border-[#ddd] text-center p-2">
                        <Typography className="text-sm ">
                          {item.user_id}
                        </Typography>
                      </div>
                      <div className="min-w-72 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        <Typography className="text-sm font-medium">
                          {item.fullName}
                        </Typography>
                      </div>{" "}
                      <div className="min-w-52 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        <Typography className="text-sm">
                          {item.phone}
                        </Typography>
                      </div>
                      <div className="min-w-36 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        <Typography className="text-sm ">
                          {item.weight}
                        </Typography>
                      </div>
                      <div className="min-w-28 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        <Typography className="text-sm ">
                          {item.count}
                        </Typography>
                      </div>
                      <div className="min-w-40 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        <Typography className="text-sm ">
                          {item.address}
                        </Typography>
                      </div>
                      <div className="min-w-52 pr-[10px] text-center border-2 border-[#ddd] p-2 ">
                        <Typography className="text-sm">
                          {item.city?.trim() ? item.city : "\u00A0"}
                        </Typography>
                      </div>
                      <div className="min-w-40 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        {editingField.id === item.id &&
                        editingField.field === "card" ? (
                          <div className="flex items-center space-x-2 max-h-[20px]">
                            <Input
                              size="small"
                              value={CardValue}
                              onChange={(e) =>
                                setCardValue(Number(e.target.value))
                              }
                              onPressEnter={() => handleConfirm(item.id)}
                              className="w-full"
                            />
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => handleConfirm(item.id)}
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <Typography
                            className="text-sm"
                            onClick={() => {
                              setCardValue(item.card || 0);
                              startEditing(item.id, "card");
                            }}
                          >
                            {item.card || 0}
                          </Typography>
                        )}
                      </div>
                      <div className="min-w-40 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        {editingField.id === item.id &&
                        editingField.field === "cash" ? (
                          <div className="flex items-center space-x-2 max-h-[20px]">
                            <Input
                              size="small"
                              value={CashValue}
                              onChange={(e) =>
                                setCashValue(Number(e.target.value))
                              }
                              onPressEnter={() => handleConfirm(item.id)}
                              className="w-full"
                            />
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => handleConfirm(item.id)}
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <Typography
                            className="text-sm"
                            onClick={() => {
                              setCashValue(item.cash || 0);
                              startEditing(item.id, "cash");
                            }}
                          >
                            {item.cash || 0}
                          </Typography>
                        )}
                      </div>{" "}
                      <div className="min-w-32 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        {editingField.id === item.id &&
                        editingField.field === "payme" ? (
                          <div className="flex items-center space-x-2 max-h-[20px]">
                            <Input
                              size="small"
                              value={PaymeValue}
                              onChange={(e) =>
                                setPaymeValue(Number(e.target.value))
                              }
                              onPressEnter={() => handleConfirm(item.id)}
                              className="w-full"
                            />
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => handleConfirm(item.id)}
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <Typography
                            className="text-sm"
                            onClick={() => {
                              setPaymeValue(item.payme || 0);
                              startEditing(item.id, "payme");
                            }}
                          >
                            {item.payme || 0}
                          </Typography>
                        )}
                      </div>
                      <div className="min-w-28 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        <Typography className="text-sm ">
                          {item.status || 0}
                        </Typography>
                      </div>
                      <div className="min-w-52 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        {editingField.id === item.id &&
                        editingField.field === "comment" ? (
                          <div className="flex items-center space-x-2 min-h-[19px] max-h-[20px]">
                            <Input
                              size="small"
                              value={CommentValue}
                              onChange={(e) => setCommentValue(e.target.value)}
                              onPressEnter={() => handleConfirm(item.id)}
                              className="w-full"
                            />
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => handleConfirm(item.id)}
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <Typography
                            className="text-sm"
                            onClick={() => {
                              setCommentValue(item.comment || "");
                              startEditing(item.id, "comment");
                            }}
                          >
                            {item.comment || "\u00A0"}
                          </Typography>
                        )}
                      </div>
                      <div className="min-w-52 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        <Typography className="text-sm ">
                          {item.express_line?.trim()
                            ? item.express_line
                            : "\u00A0"}
                        </Typography>
                      </div>
                      <div className="min-w-40 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        <Typography className="text-sm ">
                          {item.actual_payment_fee || 0}
                        </Typography>
                      </div>
                      <div className="min-w-36 pr-[10px] border-2 border-[#ddd] text-center p-2">
                        <Typography className="text-sm ">
                          {item.payment_fee || 0}
                        </Typography>
                      </div>
                      <div className="min-w-48 pr-[10px] border-2 border-[#ddd] text-center p-2 rounded-e-lg ">
                        <Typography className="text-sm ">
                          {item.purchase_time?.trim()
                            ? item.purchase_time
                            : "\u00A0"}
                        </Typography>
                      </div>
                    </Row>
                  </div>
                ))}
              </Row>
            </>
          )
        ) : (
          <div className="flex justify-center items-center my-10">
            <Empty
              description={<span>Ma'lumot topilmadi</span>}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>
    </>
  );
};

const scrollStyles = css`
  scrollbar-width: thin; /* Sets to thin scrollbar */
  scrollbar-color: #f9784d #ffffff; /* Sets thumb and track colors */
`;
