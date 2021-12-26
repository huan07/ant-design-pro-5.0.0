import React, { useCallback, useMemo } from 'react';
import { useSearchParam } from 'react-use';

function SearchBox({ data }) {
  const searchKey = useSearchParam('key') || '';

  const filtered = useMemo(() => {
    return data.filter((item) => item.title.toLowerCase().includes(searchKey.toLowerCase()));
  }, [searchKey, data]);

  const handleSearch = useCallback((evt) => {
    window.history.pushState({}, '', `${window.location.pathname}?key=${evt.target.value}`);
  }, []);

  return (
    <>
      <h2>Movies (Search key in URL)</h2>
      <input value={searchKey} placeholder="Search..." onChange={handleSearch} />
      <ul>
        {filtered.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}

export default () => {
  const data = [
    {
      id: 1,
      title: 'Mein Kampf',
    },
    {
      id: 2,
      title: 'Tumannost Andromedy',
    },
    {
      id: 3,
      title: 'Terumae romae (Thermae Romae)',
    },
    {
      id: 4,
      title: 'White Banners',
    },
    {
      id: 5,
      title: 'Train, The',
    },
  ];
  return <SearchBox data={data} />;
};
