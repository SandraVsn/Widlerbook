import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneWilder } from '../services/wilders';
import { IWilder } from '../types/IWilder';
import ErrorPage from '../components/ErrorPage';
import WilderProfile from '../components/WilderProfile';

const EditWilder = () => {
  const [wilder, setWilder] = useState<IWilder>();
  const [loadingWilder, setLoadingWilder] = useState(false);
  const { id } = useParams();

  const loadOneWilderIntoState = async () => {
    setLoadingWilder(true);
    try {
      if (id !== undefined) setWilder(await getOneWilder(parseInt(id)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWilder(false);
    }
  };

  useEffect(() => {
    loadOneWilderIntoState();
  }, []);

  return (
    <div>
      {loadingWilder ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {wilder === undefined ? (
            <ErrorPage />
          ) : (
            <WilderProfile wilder={wilder} />
          )}
        </div>
      )}
    </div>
  );
};

export default EditWilder;
