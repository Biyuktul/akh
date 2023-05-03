import { useState } from 'react';
import { Table, Space, Button, Modal, Input, Select, DatePicker } from 'antd';

const { Option } = Select;


const data = [
  {
    key: '1',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '2',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '3',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '4',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '5',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '6',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '7',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '8',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '9',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '10',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: '11',
    complainant: 'John Doe',
    complaint: 'Lorem ipsum dolor sit amet.',
    status: 'Pending',
    details: 'Lorem ipsum dolor sit amet.',
  },
  // Add more data as needed
];

const ComplaintList = () => {
  const [dataSource, setDataSource] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e) => {
      setFeedback(e.target.value);
  };

  const handleRowClick = (record) => {
    setSelectedComplaint(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleApprove = (key) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    newData[index].status = 'Approved';
    newData[index].feedback = feedback; // Add feedback message
    setDataSource(newData);
    // let the complainant send notification to complainer
  };

  const handleDisapprove = (key) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    newData[index].status = 'Disapproved';
    newData[index].feedback = feedback; // Add feedback message
    setDataSource(newData);
  };

  const columns = [
    {
      title: 'Complainant',
      dataIndex: 'complainant',
      key: 'complainant',
    },
    {
      title: 'Complaint',
      dataIndex: 'complaint',
      key: 'complaint',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Details',
      key: 'details',
      render: (text, record) => (
        <Button type="link" onClick={() => handleRowClick(record)}>
          Details
        </Button>
      ),
    },
    
  ];

  return (
    <>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{
          pageSize: 6,
        }}
        />
      <Modal
        title="Complaint Details"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <p>Complaint: {selectedComplaint?.complaint}</p>
        <p>Complainant: {selectedComplaint?.complainant}</p>
        <p>Status: {selectedComplaint?.status}</p>
        <p>Details: {selectedComplaint?.details}</p>
        {selectedComplaint?.status === 'Disapproved' && ( // Show feedback input if the complaint is disapproved
          <>
            <p>Feedback:</p>
            <Input value={feedback} onChange={handleFeedbackChange} />
          </>
        )}
      <div style={{ marginBottom: '20px' }}>
        <p>Select a branch station:</p>
        <Select style={{ width: '100%' }} placeholder="Select a branch station">
        <Option value="branch1">Branch 1</Option>
        <Option value="branch2">Branch 2</Option>
        <Option value="branch3">Branch 3</Option>
        </Select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p>Select a date:</p>
        <DatePicker style={{ width: '100%' }} />
      </div>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" style={{backgroundColor: '#05BFDB'}} onClick={() => handleApprove(selectedComplaint?.key)}>
            Approve
          </Button>{'      '}
          <Button danger onClick={() => handleDisapprove(selectedComplaint?.key)}>
            Disapprove
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ComplaintList;
