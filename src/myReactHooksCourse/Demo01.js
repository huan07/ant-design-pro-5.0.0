import React from 'react';

export default function UserList() {
  // 使用三个 state 分别保存用户列表，loading 状态和错误状态
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);

  // ! 定义获取用户的回调函数，try catch
  const fetchUsers = async () => {
    setLoading(true);
    setUsers([]);
    setError(null);
    try {
      const res = await fetch('https://reqres.in/api/users/');
      const json = await res.json();
      setUsers(json.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? 'Loading...' : 'Show Users'}
      </button>
      {error && <div style={{ color: 'red' }}>Failed: {String(error)}</div>}
      <br />
      <ul>
        {Array.isArray(users) &&
          users.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </>
  );
}
