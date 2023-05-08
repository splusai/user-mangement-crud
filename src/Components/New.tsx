import { message } from 'antd';

const New = () => {

  const handleClick = () => {
    message.success('This is a success message');
  };

  return (
    <button onClick={handleClick}>Click me!</button>
  );
};

export default New