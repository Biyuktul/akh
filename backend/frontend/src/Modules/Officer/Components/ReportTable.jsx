import React, { useState } from "react";
import { Table, Input, Popconfirm, Form, Button } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({data, setData}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingKey(record.key);
    form.setFieldsValue({
      name: "",
      ...record,
    });
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
        {
          title: "Report Id",
          dataIndex: "name",
          editable: false,
        },
        {
          title: "Sent Date",
          dataIndex: "date",
          editable: false,
        },
        {
          title: "Sender Name",
          dataIndex: "name",
          editable: false,
        },
        { 
          title: "Report Body",
          dataIndex: "reportBody",
          editable: true,
        },
        {
          title: "Action",
          dataIndex: "operation",
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                  Save
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <span>
                <Button type="primary" style={{backgroundColor: '#159895'}} disabled={editingKey !== ""} onClick={() => edit(record)}>
                  Edit
                </Button>{"   "}
                |{"   "}
                <Popconfirm
                  title="Are you sure to delete this report?"
                  okButtonProps={{style:{backgroundColor: '#159895'}}}
                  
                  onConfirm={() => {
                    const newData = [...data];
                    const index = newData.findIndex((item) => record.key === item.key);
                    newData.splice(index, 1);
                    setData(newData);
                  }}
                >
                  <Button type="primary" danger>
                        Delete Post
                  </Button>
                </Popconfirm>
              </span>
            );
          },
        },
      ];
      

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          pageSize: 6,
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default EditableTable;
