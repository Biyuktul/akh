import { Avatar } from 'antd';

const Photo = (src) => {
  return (
    <Avatar
      size={32}
      src={src}
      alt="My Image"
      style={{ borderRadius: '50%', objectFit: 'cover' }}
    />
  );
};

export default Photo