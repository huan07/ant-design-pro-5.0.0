import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

function SearchUserList() {
  const [users, setUsers] = useState(null);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const doFetch = async () => {
      // 组件首次加载时发请求获取用户数据
      const res = await fetch('https://reqres.in/api/users/');
      setUsers(await res.json());
    };
    doFetch();
  }, []);

  let usersToShow = null;
  if (users) {
    // ! 无论组件为何刷新，这里一定会对数组做一次过滤的操作
    usersToShow = users.data.filter((user) => user.first_name.includes(searchKey));
  }

  console.log('render', users, searchKey);

  return (
    <>
      <input type="text" value={searchKey} onChange={(evt) => setSearchKey(evt.target.value)} />
      <ul>
        {Array.isArray(usersToShow) &&
          usersToShow.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </>
  );
}

function SearchUserListAfter() {
  const [users, setUsers] = useState(null);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const doFetch = async () => {
      // 组件首次加载时发请求获取用户数据
      const res = await fetch('https://reqres.in/api/users/');
      setUsers(await res.json());
    };
    doFetch();
  }, []);

  // !! 使用userMemo缓存计算的结果
  const usersToShow = useMemo(() => {
    return users
      ? users.data.filter((user) => {
          return String(user?.first_name || '')
            .toLowerCase()
            .includes(String(searchKey || '').toLowerCase());
        })
      : null;
  }, [users, searchKey]);

  console.log('render useMemo', users, searchKey);

  return (
    <>
      <input type="text" value={searchKey} onChange={(evt) => setSearchKey(evt.target.value)} />
      <ul>
        {Array.isArray(usersToShow) &&
          usersToShow.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </>
  );
}

//
//
function Timer() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0);

  // ! 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef(null);

  // TODO 为啥这个地方一直执行呢，即使是暂停呢
  // console.log('= = = = = = = = = = = = = = = = = = = timer 1.', timer);

  const handleStart = useCallback(() => {
    // 使用current属性设置 ref 的值
    timer.current = window.setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  }, []);

  const handlePause = useCallback(() => {
    window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  return (
    <>
      {time} seconds.
      <br />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </>
  );
}

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputEl} />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

export default () => (
  <>
    <SearchUserList />
    <br />
    <br />
    <SearchUserListAfter />
    <br />
    <br />
    <Timer />
    <br />
    <br />
    <TextInputWithFocusButton />
  </>
);
