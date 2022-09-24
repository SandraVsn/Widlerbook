import { useEffect, useState } from 'react';
import Wilder from '../components/Wilder';
import { getAllWilders } from '../services/wilders';
import { IWilder } from '../types/IWilder';

const Home = () => {
  const [wilders, setWilders] = useState<IWilder[]>([]);
  const [loadingWilders, setLoadingWilders] = useState(false);

  const loadWildersIntoState = async () => {
    setLoadingWilders(true);
    try {
      setWilders(await getAllWilders());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWilders(false);
    }
  };

  useEffect(() => {
    loadWildersIntoState();
  }, []);

  return (
    <>
      <h2 className='font-bold text-2xl my-4'>Wilders</h2>
      <section className='flex flex-wrap'>
        {loadingWilders
          ? 'Loading...'
          : wilders.map((wilder) => (
              <Wilder
                key={wilder.id}
                wilder={wilder}
                loadWildersIntoState={loadWildersIntoState}
              />
            ))}
      </section>
    </>
  );
};

export default Home;
