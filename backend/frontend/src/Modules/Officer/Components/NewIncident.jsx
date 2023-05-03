import React from 'react'
import { Button, Input, Select, Form, InputNumber, Row, Col, DatePicker } from 'antd';
const { Option } = Select;


const NewIncident = ({setIncidents, handleOk, incidents, setAddVisible}) => {
  
     
        return (
        <Form layout="vertical" onFinish={handleOk} style={{ height: '500px', width: '1100px', overflow: 'scroll' }}>
        <Row gutter={8}>
  <Col span={12} xs={24} md={12}>
    <Form.Item label="Type" name="caseType" rules={[{ required: true, message: 'Please enter case type' }]}>
      <Input placeholder="Enter case type" />
    </Form.Item>
  </Col>
  <Col span={12}>
    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status' }]}>
      <Select defaultValue="Open">
        <Option value="Open">Open</Option>
        <Option value="Closed">Closed</Option>
      </Select>
    </Form.Item>
  </Col>
</Row>
<Row gutter={24}>
  <Col span={12}>
    <Form.Item label="Priority" name="priority" rules={[{ required: true, message: 'Please enter priority' }]}>
      <InputNumber min={1} max={10} />
    </Form.Item>
  </Col>
  <Col span={12}>
    <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select date' }]}>
      <DatePicker />
    </Form.Item>
  </Col>
</Row>
<Row gutter={24}>
  <Col span={24}>
    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter description' }]}>
      <Input.TextArea rows={4} placeholder="Enter description" />
    </Form.Item>
  </Col>
</Row>
<Row gutter={24}>
  <Col span={12}>
    <Form.Item label="Victims">
      <Input.Group compact>
        <Form.Item name="victimName" noStyle>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="victimAge" noStyle>
          <InputNumber placeholder="Age" />
        </Form.Item>
        <Form.Item name="victimGender" noStyle>
          <Input placeholder="Gender" />
        </Form.Item>
        <Form.Item name="victimContact" noStyle>
          <Input placeholder="Contact information" />
        </Form.Item>
      </Input.Group>
    </Form.Item>
  </Col>
  <Col span={12}>
    <Form.Item label="Witnesses">
      <Input.Group compact>
        <Form.Item name="witnessName" noStyle>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="witnessAge" noStyle>
          <InputNumber placeholder="Age" />
        </Form.Item>
        <Form.Item name="witnessGender" noStyle>
          <Input placeholder="Gender" />
        </Form.Item>
        <Form.Item name="witnessContact" noStyle>
          <Input placeholder="Contact information" />
        </Form.Item>
        <Form.Item name="witnessStatement" noStyle>
          <Input.TextArea rows={4} placeholder="Witness statement" />
        </Form.Item>
      </Input.Group>
    </Form.Item>
  </Col>
</Row>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
  )
}

export default NewIncident
