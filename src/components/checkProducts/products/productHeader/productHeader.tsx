import { Row, Typography } from "antd";

export const ProductHeader = () => (
  <div className="py-5 rounded-[8px] shadow-[1px_1px_10px_rgba(124,124,124,0.3)] inline-block bg-gray-200">
    <Row className="flex justify-between items-center flex-nowrap">
      <div className="min-w-28 pr-[10px] border-r-2 border-[#ddd] text-center">
        <Typography className="text-sm font-medium">UserId</Typography>
      </div>
      <div className="min-w-64 pr-[10px] border-r-2 border-[#ddd] text-center">
        <Typography className="text-sm font-medium">Full Name</Typography>
      </div>
      <div className="min-w-52 pr-[10px] border-r-2 border-[#ddd] text-center">
        <Typography className="text-sm font-medium">Phone Number</Typography>
      </div>
      <div className="min-w-36 pr-[10px] border-r-2 border-[#ddd] text-center">
        <Typography className="text-sm font-medium">Weight</Typography>
      </div>
      <div className="min-w-28 pr-[10px] border-r-2 border-[#ddd] text-center">
        <Typography className="text-sm font-medium">Count</Typography>
      </div>
      <div className="min-w-40 pr-[10px] border-r-2 border-[#ddd] text-center">
        <Typography className="text-sm font-medium">Address</Typography>
      </div>
      <div className="min-w-52 pr-[10px] border-r-2 border-[#ddd] text-center">
        <Typography className="text-sm font-medium">City</Typography>
      </div>
      <div className="min-w-40 pr-[10px] border-r-2 border-[#ddd] text-center">
        <Typography className="text-sm font-medium">Card</Typography>
      </div>
      <div className="min-w-40 pr-[10px] border-r-2 border-[#ddd] text-center">
        <Typography className="text-sm font-medium">Cash</Typography>
      </div>
      <div className="min-w-28 pr-[10px] border-r-2 text-center border-[#ddd]">
        <Typography className="text-sm font-medium">Status</Typography>
      </div>
      <div className="min-w-52 pr-[10px] border-r-2 text-center border-[#ddd]">
        <Typography className="text-sm font-medium">Comment</Typography>
      </div>
      <div className="min-w-52 pr-[10px] border-r-2 text-center border-[#ddd]">
        <Typography className="text-sm font-medium">Express Name</Typography>
      </div>
      <div className="min-w-48 pr-[10px] border-r-2 text-center border-[#ddd]">
        <Typography className="text-sm font-medium">Purchase time</Typography>
      </div>
      <div className="min-w-32 pr-[10px] border-r-2 text-center border-[#ddd]">
        <Typography className="text-sm font-medium">Payme</Typography>
      </div>
      <div className="min-w-32 pr-[10px] border-r-2 text-center border-[#ddd]">
        <Typography className="text-sm font-medium">Actual payment</Typography>
      </div>
      <div className="min-w-32 pr-[10px] border-r-2 text-center border-[#ddd]">
        <Typography className="text-sm font-medium">Payment fee</Typography>
      </div>
    </Row>
  </div>
);
