import OrderTypeDropdown from "@/components/common/dropdown/orderTypeDropdown";
import OrderToggle from "@/components/common/orderToggle";
import {
  OrderToggleEnum,
  OrderTypeEnumDropdown,
} from "@/enum/orderToggle.enum";
import { useState } from "react";

function OrderCreationBox() {
  const [orderType, setOrderType] = useState<OrderToggleEnum>(
    OrderToggleEnum.BUY
  );
  const [orderTypeDropdown, setOrderTypeDropdown] =
    useState<OrderTypeEnumDropdown>(OrderTypeEnumDropdown.LIMIT);

  return (
    <div className=" px-[24px] w-full">
      <OrderToggle orderType={orderType} setOrderType={setOrderType} />
      <OrderTypeDropdown
        orderTypeDropdown={orderTypeDropdown}
        setOrderTypeDropdown={setOrderTypeDropdown}
        className="mt-2"
      />
    </div>
  );
}

export default OrderCreationBox;
