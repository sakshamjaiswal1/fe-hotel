import { Select, Tooltip } from "antd";
import InfoIcon from "@/assets/dropdown/infoIcon.svg?react";
import DownArrow from "@/assets/dropdown/downArrow.svg?react";
import { OrderTypeEnumDropdown } from "@/enum/orderToggle.enum";

const { Option } = Select;

const OrderTypeDropdown = ({
  className = "",
  orderTypeDropdown,
  setOrderTypeDropdown,
}: {
  className?: string;
  orderTypeDropdown: OrderTypeEnumDropdown;
  setOrderTypeDropdown: React.Dispatch<
    React.SetStateAction<OrderTypeEnumDropdown>
  >;
}) => {
  return (
    <div
      className={`flex items-center border border-[#E9E9E9] rounded pl-[4px] pr-[6px]  w-full ${className}`}
    >
      <Tooltip title="Order type explanation">
        <InfoIcon className="w-4 h-4" />
      </Tooltip>
      <Select
        defaultValue={orderTypeDropdown}
        variant="borderless"
        className="mainFont font-medium text-[14px] leading-[20px] tracking-[0.12px] w-full !text-[#000000]"
        style={{
          height: 24,
          lineHeight: "1",
          fontSize: 12,
          fontWeight: 500,
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
        popupMatchSelectWidth={true}
        suffixIcon={<DownArrow className="w-6 h-6 -mr-[12px]" />}
        onChange={(value) => setOrderTypeDropdown(value)}
      >
        <Option value={OrderTypeEnumDropdown.LIMIT}>Limit</Option>
        <Option value={OrderTypeEnumDropdown.MARKET}>Market</Option>
        <Option value={OrderTypeEnumDropdown.STOP}>Stop</Option>
      </Select>
    </div>
  );
};

export default OrderTypeDropdown;
