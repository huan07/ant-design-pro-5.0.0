export default ({ data = [] }) => {
  return (
    <>
      <h3>Comments ({data.length})</h3>
      <dl>
        {data.map(
          (item, index) =>
            index < 2 && (
              <>
                <dt key={item.id}>{item.user}</dt>
                <dd>{item.content}</dd>
              </>
            ),
        )}
      </dl>
    </>
  );
};
