import { Table, Tag, Popover, Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NewIncident from './NewIncident';
import { useState } from 'react';

const IncidentsTable = ({ incidents, setSelectedIncident, location, handleLocationClick, statusFilter, handleOk, addVisible, setDetailVisible, setAddVisible, setIncidents }) => {
  const [searchText, setSearchText] = useState('');
  
	const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text, record) => <a onClick={() => handleLocationClick(record)}>{text}</a>,
  
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
      {
        text: 'Open',
        value: 'Open',
      },
      {
        text: 'Closed',
        value: 'Closed',
      },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status, text, record) => {
      const color = status === 'Open' ? 'green' : 'volcano';
      return <Tag color={color} onClick={() => handleLocationClick(record)} >{status}</Tag>;
      },
    },
    ];

  const handleSearch = (value) => {
		setSearchText(value);
	};

  const handleRowClick = (incident) => {
    setSelectedIncident(incident);
    setDetailVisible(true);
  };

  const filteredData = incidents.filter((record) => {
		const caseType = record.type.toLowerCase();
		const search = searchText.toLowerCase();
		return caseType.includes(search) && (statusFilter === 'All' || record.status === statusFilter);
  	});



	const handleVisibleChange = (visible) => {
		setAddVisible(visible);
	};


  const content = (
        <NewIncident 
        setIncidents={setIncidents}
        setAddVisible={setAddVisible}
        incidents={incidents}
        handleOk={handleOk}/>
      );
  
  const searchInput = (
    <Input.Search
          placeholder="Search by case type"
          allowClear 
          onChange={(e) => handleSearch(e.target.value)} 
          style={{width: 450, marginTop: 20}}
    />
  );

  const addButton = (
    <Popover content={content} title="Add Incident" trigger="click" visible={addVisible} onVisibleChange={handleVisibleChange}>
          <Button 
            type={'primary'} 
            icon={<PlusOutlined />} 
            style={{width: '50px', 
            backgroundColor: '#1677ff', 
            marginTop: 20,
            marginLeft: 10
          }}
          />
    </Popover>
  );

  return (
    <Table
          title={() => (
            <Space>
              {searchInput}
              {addButton}
            </Space>
          )}
          dataSource={filteredData}
          columns={columns}
          onRow={(record) => ({ onClick: ({target}) => {
            if (target.tagName !== 'A') { 
              handleRowClick(record);
            }
          }
          })}

      pagination={{
        pageSize: 6,
      }}
      rowKey="id"
    />
  );
};

export default IncidentsTable;
