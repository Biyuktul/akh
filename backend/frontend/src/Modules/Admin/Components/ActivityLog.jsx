import React from 'react';
import { Divider, Table } from 'antd';

const columns = [
  {
    title: 'Timestamp',
    dataIndex: 'time',
  },
  {
    title: 'User Id',
    dataIndex: 'id',
  },
  {
    title: 'Action Type',
    dataIndex: 'type',
  },
  {
    title: 'Result',
    dataIndex: 'result',
    render: (text) => {
      let color = 'green';
      if (text === 'Failed') {
        color = 'red';
      }
      return <span style={{ color }}>{text}</span>;
    },
  },
];

const data = [
  {
    key: '1',
    time: '2023-04-26 09:30:00',
    id: 123,
    type: 'Login Attempt',
    result: 'Success',
  },
  {
    key: '2',
    time: '2023-04-26 14:15:00',
    id: 315,
    type: 'Login Attempt',
    result: 'Failed',
  },
  {
    key: '3',
    time: '2023-04-26 09:30:00',
    id: 123,
    type: 'Login Attempt',
    result: 'Success',
  },
  {
    key: '4',
    time: '2023-04-26 14:15:00',
    id: 315,
    type: 'Login Attempt',
    result: 'Failed',
  },
  {
    key: '5',
    time: '2023-04-26 09:30:00',
    id: 123,
    type: 'Login Attempt',
    result: 'Success',
  },
  {
    key: '6',
    time: '2023-04-26 14:15:00',
    id: 315,
    type: 'Login Attempt',
    result: 'Failed',
  },
  {
    key: '7',
    time: '2023-04-26 09:30:00',
    id: 123,
    type: 'Login Attempt',
    result: 'Success',
  },
  {
    key: '8',
    time: '2023-04-26 14:15:00',
    id: 315,
    type: 'Login Attempt',
    result: 'Failed',
  }
];

const ActivityLog = () => {
  return (
    <>
      <Divider>Activity Logs</Divider>
      <Table
        columns={columns}
        dataSource={data}
        size="small" 
        pagination={{
          pageSize: 6
        }}
      />
    </>
  );
};

export default ActivityLog;
