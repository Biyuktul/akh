import { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
];

const data = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', details: 'Details about John Brown' },
  { key: '2', name: 'Joe Black', age: 42, address: 'London No. 1 Lake Park', details: 'Details about Joe Black' },
  { key: '3', name: 'Jim Green', age: 32, address: 'Sidney No. 1 Lake Park', details: 'Details about Jim Green' },
  { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park', details: 'Details about Jim Red' },
  { key: '5', name: 'Jane White', age: 32, address: 'New York No. 2 Lake Park', details: 'Details about Jane White' },
  { key: '6', name: 'Tom Green', age: 32, address: 'Sidney No. 2 Lake Park', details: 'Details about Tom Green' },
  { key: '7', name: 'Tom Blue', age: 32, address: 'New York No. 3 Lake Park', details: 'Details about Tom Blue' },
];

const CriminalList = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleExport = () => {
    // Handle export logic
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const filteredData = data.filter((record) =>
    record.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagedData = filteredData.slice(startIndex, endIndex);

  const expandable = {
    expandedRowRender: (record) => <p>{record.details}</p>,
    rowExpandable: (record) => record.details !== undefined,
  };

  return (
    <div>
      <Input.Search
        placeholder="Search Name"
        allowClear
        onSearch={handleSearch}
        onChange={handleSearch} // add onChange to make search live
        style={{ width: 200 }}
      />
      <Button icon={<ExportOutlined />} onClick={handleExport}>
        Export
      </Button>
      <Table
        columns={columns}
        dataSource={pagedData}
        pagination={{
          pageSize,
          current: currentPage,
          total: filteredData.length,
        }}
        onChange={handleTableChange}
        expandable={expandable} // add expandable prop to enable row expansion
      />
    </div>
  );
};

export default CriminalList;
