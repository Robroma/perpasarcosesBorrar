import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodios } from '../store/episodiosSlice';
import { RootState } from '../store';
import { Episodios } from '../types/episodios';

export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.episodios
  );

  useEffect(() => {
    dispatch(fetchEpisodios());
  }, [dispatch]);

  return (
    <>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading &&
          data.map((episodio: Episodios, index: number) => (
            <article key={index}>
              <h1>{episodio.name}</h1>
              <h1>{episodio.image}</h1>
            </article>
          ))}
      </div>
    </>
  );
}

