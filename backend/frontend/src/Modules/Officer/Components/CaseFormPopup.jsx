import { Button, Form, Input, Popover } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import GroupFormation from './GroupFormation';

const AddCase = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const handleCancle = () => {
        setVisible(false)
  }

const content = (
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Form>
              <Form.Item label="Input 1">
                <Input />
              </Form.Item>
              <Form.Item label="Input 2">
                <Input />
              </Form.Item>
              <Form.Item label="Input 3">
                <Input />
              </Form.Item>
              <Form.Item label="I">
                <GroupFormation />
              </Form.Item>
              <Form.Item label="Input 4">
                <Input />
              </Form.Item>
              <Form.Item label="Input 5">
                <Input />
              </Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1, marginLeft: 30}}>
            <Form>
              <Form.Item label="Input 6">
                <Input />
              </Form.Item>
              <Form.Item label="Input 7">
                <Input />
              </Form.Item>
              <Form.Item label="Input 8">
                <Input />
              </Form.Item>
              <Form.Item label="Input 9">
                <Input />
              </Form.Item>
              <Form.Item label="Input 10">
                <Input />
              </Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1, marginLeft: 30}}>
            <Form>
              <Form.Item label="Input 6">
                <Input />
              </Form.Item>
              <Form.Item label="Input 7">
                <Input />
              </Form.Item>
              <Form.Item label="Input 8">
                <Input />
              </Form.Item>
              <Form.Item label="Input 9">
                <TextArea />
              </Form.Item>
              <Form.Item label="Input 10">
                <TextArea />
              </Form.Item>
              <div style={{ textAlign: 'right' }}>
                <Button style={{ marginRight: 8 }}>
                  Open
                </Button>
                <Button onClick={handleCancle}>
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      );
  
  return (
    <div style={{ position: 'relative' }} className='mt-5`A'    aria-activedescendant='A23'>
      <div style={{ marginLeft: 100, whiteSpace: 'nowrap' }}>
        <Popover
          placement="bottom"
          title="New Case Registration Form"
          content={content}
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          destroyTooltipOnHide={true}
          overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
        <Button icon={<PlusOutlined />} style={{marginTop: '20px', backgroundColor: '#1677ff', width: '50px', }}/>
        </Popover>
      </div>
      {visible && <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} />}
    </div>
  );
};

export default AddCase;