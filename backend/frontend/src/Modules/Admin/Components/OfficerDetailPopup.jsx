import { useState } from "react";
import { Button, Modal, Row, Col, Typography, Divider, Image, Checkbox } from "antd";

const { Title, Text } = Typography;

const OfficerDetail = ({ selectedEmployee }) => {
  const [open, setOpen] = useState(false);
  const [privileges, setPrivileges] = useState({
    canApproveComplaints: false,
    canEditReports: false,
    canDeleteReports: false,
    canSendReports: false,
    canEditPosts: false,
    canDeletePosts: false,
    canPostToCivilians: false,
  });

  const handlePrivilegeChange = (key, value) => {
    setPrivileges(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSavePrivileges = () => {
    // save the updated privileges
    console.log("Updated privileges:", privileges);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Detail</Button>
      <Modal
        title={`${selectedEmployee.name} Details`}
        visible={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={700}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Image
              src={selectedEmployee.photoUrl}
              alt={selectedEmployee.name}
              preview={false}
            />
          </Col>
          <Col span={16}>
            <Title level={5}>Personal Information</Title>
            <Divider />
            <Row>
              <Col span={12}>
                <Text strong>ID:</Text>
                <br />
                <Text>{selectedEmployee.o_id}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Full Name:</Text>
                <br />
                <Text>{selectedEmployee.full_name}</Text>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={12}>
                <Text strong>Phone number:</Text>
                <br />
                <Text>{selectedEmployee.phone_number}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Role:</Text>
                <br />
                <Text>{selectedEmployee.role}</Text>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={12}>
                <Text strong>Logon Name:</Text>
                <br />
                <Text>{selectedEmployee.logon_name}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Status:</Text>
                <br />
                <Text>{selectedEmployee.status}</Text>
              </Col>
            </Row>
            <br />
            <Title level={5}>Privileges</Title>
            <Divider />
            <Row>
              <Col span={12}>
                <Checkbox
                  checked={privileges.canApproveComplaints}
                  onChange={(e) =>
                    handlePrivilegeChange(
                      "canApproveComplaints",
                      e.target.checked
                    )
                  }
                >
                  Approve/Disapprove Complaints
                </Checkbox>
                <br />
                <Checkbox
                  checked={privileges.canEditReports}
                  onChange={(e) =>
                    handlePrivilegeChange("canEditReports", e.target.checked)
                  }
                >
                  Edit Reports
                </Checkbox>

                <br />
            <Checkbox
              checked={privileges.canDeleteReports}
              onChange={(e) =>
                handlePrivilegeChange("canDeleteReports", e.target.checked)
              }
            >
              Delete Reports
            </Checkbox>
            <br />
            <Checkbox
              checked={privileges.canSendReports}
              onChange={(e) =>
                handlePrivilegeChange("canSendReports", e.target.checked)
              }
            >
              Send Reports
            </Checkbox>
            <br />
            <Checkbox
              checked={privileges.canEditPosts}
              onChange={(e) =>
                handlePrivilegeChange("canEditPosts", e.target.checked)
              }
            >
              Can Edit Posts
            </Checkbox>

            <br />
            <Checkbox
              checked={privileges.canDeletePosts}
              onChange={(e) =>
                handlePrivilegeChange("canDeletePosts", e.target.checked)
              }
            >
              Can Delete Posts
            </Checkbox>

            <br />
            <Checkbox
              checked={privileges.canPostToCivilians}
              onChange={(e) =>
                handlePrivilegeChange("canPostToCivilians", e.target.checked)
              }
            >
              Can Post to Civilians
            </Checkbox>
              </Col>
              <Col span={12}>
                <Button onClick={handleSavePrivileges}>Save</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default OfficerDetail;
