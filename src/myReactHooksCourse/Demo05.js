import { useEffect, useRef } from 'react';

// 创建一个自定义 Hook 用于在render()执行前执行一次性代码
function useSingleton(callback) {
  // 用一个 called ref 标记 callback 是否执行过
  const called = useRef(false);

  // 如果已经执行过，则直接返回
  if (called.current) {
    return;
  }
  callback();
  called.current = true;
}

const MyComp = () => {
  // 使用自定义 Hook
  useSingleton(() => {
    console.log('1. 这段代码 只执行一次');
  });

  useEffect(() => {
    // todo 为啥这个之后还要执行一次render呢？state的并没有改变呢
    console.log('3. 这段代码 在render之后 只执行一次');
  }, []);

  console.log('2. render ');

  return <div>My Component</div>;
};

export default MyComp;
