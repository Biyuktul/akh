import { Button, Dropdown, Form, Input, Menu, Modal, Popconfirm } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import EditableTable from './PostTable';
      
const CivilianPost = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [postListModalVisible, setPostListModalVisible] = useState(false);
  const [data, setData] = useState([
    {
      key: "1",
      name: "John Brown",
      date: '22/22/22',
      postBody: 'the post body here'
    },
  ]);

  const handlePostListEditModalOk = () => {
        //Handle Post Editing / Delete
        setPostListModalVisible(false);
  }

  const handlePostListEditModalCancel = () => {
        setEditModalVisible(false);
  };

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

  const handleEdit = (record) => {
        console.log('Editing record:', record);
        // write code here to handle editing the record
  };
      
  const handleDelete = (record) => {
        console.log('Deleting record:', record);
        // write code here to handle deleting the record
  };
  

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setEditModalVisible(true)}>
        Post Other Information
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setChangePasswordModalVisible(true)}>
        Post Missing Person
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setPostListModalVisible(true)}>
        View / Edit Posted information
      </Menu.Item>
      
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="text" style={{color: 'white'}}>
           Information To Civilian
        </Button>
      </Dropdown>


      <Modal
        title="Post Other Informations"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
        okText="Post"
        okButtonProps={{ style: { backgroundColor: '#ff6600', borderColor: '#ff6600' } }}

      >
        <Form layout="vertical">
          <Form.Item label="Post Title">
            <Input />
          </Form.Item>

          <Form.Item label="Post Body">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Post Missing Person"
        visible={changePasswordModalVisible}
        onCancel={handlePasswordModalCancel}
        onOk={handlePasswordModalOk}
        okText="Post"
        okType='primary'
        okButtonProps={{ style: { backgroundColor: '#ff6600', borderColor: '#ff6600' } }}
      >
        <Form layout="vertical">
          <Form.Item label="Missing Person Full Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Missing Person Age" name="age" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Mssing Person Sex"
            name="sex"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Missing Person Physical Description" name="description" rules={[{ required: true }]}>
            <TextArea />
          </Form.Item>
          <Form.Item label="Missing Person distinguishing features or marks" name="marks" rules={[{ required: true }]}>
            <TextArea />
          </Form.Item>
          <Form.Item label="Contact information for the officer" name="contact" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Post List"
        visible={postListModalVisible}
        onCancel={handlePostListEditModalCancel}
        onOk={handlePostListEditModalOk}
        okButtonProps={{style:{backgroundColor: '#159895'}}}
        width={1000}
      >
                <EditableTable 
                data={data} 
                setData={setData}
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                />      
      </Modal>
    </>
  );
};

export default CivilianPost;
