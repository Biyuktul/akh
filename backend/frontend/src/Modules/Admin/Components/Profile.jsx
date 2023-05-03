import { Avatar, Button, Dropdown, Form, Input, Menu, Modal, Upload } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { confirm } = Modal;

const MyProfile = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);

  const handleEditModalOk = () => {
    // Handle edit profile submit
    setEditModalVisible(false);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handlePasswordModalOk = () => {
    // Handle change password submit
    setChangePasswordModalVisible(false);
  };

  const handlePasswordModalCancel = () => {
    setChangePasswordModalVisible(false);
  };

  const showConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete your account?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Handle account deletion
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setEditModalVisible(true)}>
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setChangePasswordModalVisible(true)}>
        Change Password
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={showConfirm} danger>
        Delete Account
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="text" style={{color: 'white'}}>
           My Profile
        </Button>
      </Dropdown>


      <Modal
        title="Edit Profile"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
        okText="Save Changes"
        okButtonProps={{ style: { backgroundColor: '#ff6600', borderColor: '#ff6600' } }}

      >
        <Form layout="vertical">
          <Form.Item label="Profile Picture">
            <Upload>
              <Button>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Name">
            <Input />
          </Form.Item>

          <Form.Item label="Email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        visible={changePasswordModalVisible}
        onCancel={handlePasswordModalCancel}
        onOk={handlePasswordModalOk}
        okText="Save Changes"
        okType='primary'
        okButtonProps={{ style: { backgroundColor: '#ff6600', borderColor: '#ff6600' } }}
      >
        <Form layout="vertical">
          <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item label="New Password" name="newPassword" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            rules={[{ required: true }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyProfile;
