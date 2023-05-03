import React, { useState } from "react";
import { Table, Image } from "antd";
import PopupFormButton from './FormPopup';
import ConfirmPopup from './ConfirmPopup';
import OfficerDetail from './OfficerDetailPopup';

function StaffTable({ employees }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      render: (text, record) => (
        <Image
            src={record.photoUrl}
            alt={record.name}
            className="employee-photo h-10 w-10 rounded-full object-cover"
            style={{width: '40px', height: '40px'}}
        />
    )
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      className: 'salary',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <PopupFormButton
            text={"Edit"}
            formTitle={"Edit Officer Form"} 
            selectedEmployee={record}
          />
          {'         '}
          <ConfirmPopup selectedEmployee={record} />
          {'         '}
          <OfficerDetail selectedEmployee={record} />
        </>
      ),
    },
  ];

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div>
      <div className="flex justify-center mb-5  mt-10">
      <input
        type="text"
        placeholder="Search Employees..."
        value={search}
        style={{width: '550px'}}
        onChange={handleSearch}
        className="search-input mr-20"
      />
      <PopupFormButton text={"Add Officers"} formTitle={"New Officer Registration Form"}></PopupFormButton>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredEmployees}
        pagination={
          {
            pageSize: 6
          }
        }
        onChange={handleTableChange}
        rowKey="id"
      />
    </div>
  );
}

export default StaffTable;
