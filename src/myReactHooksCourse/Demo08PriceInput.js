import React, { useState, useCallback } from 'react';

function PriceInput({ value = { amount: 0, currency: 'rmb' }, onChange = () => {} }) {
  const handleChange = useCallback(
    (deltaValue) => {
      onChange({
        ...value,
        ...deltaValue,
      });
    },
    [value, onChange],
  );

  console.log('子组件 ', value);

  return (
    <>
      <input value={value.amount} onChange={(evt) => handleChange({ amount: evt.target.value })} />
      <select value={value.currency} onChange={(evt) => handleChange({ currency: evt.target.value })}>
        <option value="rmb">RMB</option>
        <option value="dollar">Dollar</option>
      </select>
    </>
  );
}

// Example Wrapper
export default () => {
  const [price, setPrice] = useState();

  console.log('父组件 ', price);

  return (
    <>
      <PriceInput value={price} onChange={setPrice} />
      <p>{JSON.stringify(price)}</p>
    </>
  );
};
