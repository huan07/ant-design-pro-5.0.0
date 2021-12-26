import React, { useState, useCallback } from 'react';

// 自定义受控组件（ 状态提升思路？）
// ! 推荐用这个
function PriceInput({
  // 定义默认的 value 的数据结构
  value = {},
  // 默认不处理 onChange 事件
  onChange = () => {}, // ! 回调函数绑定到原生组件，这个地方的onChange回调函数不需要用useCallback缓存
}) {
  console.log('子组件 ', value);

  return (
    <>
      {/* 输入价格的数量 */}
      <input value={value.amount} onChange={(evt) => onChange({ amount: evt.target.value })} />
      {/* 选择货币种类*/}
      <select value={value.currency} onChange={(evt) => onChange({ currency: evt.target.value })}>
        <option value="rmb">RMB</option>
        <option value="dollar">Dollar</option>
      </select>
    </>
  );
}

const Demo = () => {
  const [value, setValue] = useState({ amount: 99, currency: 'dollar' });

  console.log('父组件 ', value);

  return <PriceInput value={value} onChange={(value) => setValue((prevState) => ({ ...prevState, ...value }))} />;
};

export default Demo;
