import { useEffect, useState } from 'react';
import { PATH_NAME, useApi } from './apiClient';
import CommentList from './CommentList';

const ArticleView = ({ id }) => {
  // ! 利用状态的组合变化来实现并发和串行请求
  // 两个并发的请求
  const { data: article, loading, error } = useApi(PATH_NAME.article, id);
  const { data: comments } = useApi(PATH_NAME.comment, id, false);

  // 串行的请求
  const { data: user } = useApi(PATH_NAME.user, article?.userId);

  if (error) return 'Failed.';
  if (!article || loading) return 'Loading...';
  return (
    <>
      <h1>
        {id}. {article.title}. {article.userId}
      </h1>
      <br />
      <br />
      <br />
      {user && (
        <div>
          <img src={user.avatar} height="40px" alt="user" />
          <div>{user.name}</div>
        </div>
      )}
      <br />
      <br />
      <br />
      <CommentList data={comments || []} />
    </>
  );
};

export default () => {
  const [id, setId] = useState();

  useEffect(() => {
    setId(1);
  }, []);

  return (
    <>
      <ul>
        <li onClick={() => setId(1)}>Article 1</li>
        <li onClick={() => setId(2)}>Article 2</li>
        <li onClick={() => setId(3)}>Article 3</li>
      </ul>
      <ArticleView id={id} />
    </>
  );
};
