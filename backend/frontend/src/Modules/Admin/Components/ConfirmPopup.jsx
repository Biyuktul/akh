import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useEffect, useState } from "react";

const { confirm } = Modal;


const ConfirmPopup = ({selectedEmployee}) => {

  const handleDeactivate = () => {
    confirm({
      title: `Do you Want to deactivate ${selectedEmployee.name}?`,
      icon: <ExclamationCircleFilled />,
      content: "you can't reactivate the account once deactivated",
      okType: "default",
      onOk() {
        console.log("handle db operation");
      },
      onCancel() {
        console.log("do nothing");
      },
    });
  };

  return (
    <Space wrap>
        <Button danger onClick={() => handleDeactivate()}>Deactivate</Button>
    </Space>
  );
}

export default ConfirmPopup;
