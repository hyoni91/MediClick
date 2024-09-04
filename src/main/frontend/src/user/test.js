import React from 'react';

const ExampleComponent = () => {
  const handleClick = (e) => {
    console.log('Clicked element:', e.target); // 클릭된 요소
    console.log('Event handler attached to:', e.currentTarget); // 이벤트 핸들러가 붙어 있는 요소
  };

  return (
    <div onClick={handleClick}>
      <button>Click me</button>
    </div>
  );
};

export default ExampleComponent;