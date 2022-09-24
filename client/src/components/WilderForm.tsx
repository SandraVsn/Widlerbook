import { useState, FormEvent } from 'react';
import { createWilder } from '../services/wilders';
import { IWilderInput } from '../types/IWilder';

export default function WilderForm() {
  const [name, setName] = useState<IWilderInput['name']>('');
  const [city, setCity] = useState<IWilderInput['city']>('');
  const [bio, setBio] = useState<IWilderInput['bio']>('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await createWilder({ name, city, bio });
      return alert('Wilder created');
    } catch (err) {
      console.error(err);
      return alert('Problem while creating new Wilder, please try again');
    } finally {
      setProcessing(false);
      setName('');
      setBio('');
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className=''>
      <p>Ajouter un Wilder</p>
      <input
        className='bg-gray-200 appearance-none rounded py-0.5 px-4 focus:outline-none focus:bg-white border-2 focus:border-wcs'
        placeholder='Nom'
        type='text'
        id='name'
        disabled={processing}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        className='bg-gray-200 appearance-none rounded py-0.5 px-4 focus:outline-none focus:bg-white border-2 focus:border-wcs'
        placeholder='City'
        type='text'
        disabled={processing}
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
      <input
        className='bg-gray-200 appearance-none rounded py-0.5 px-4 focus:outline-none focus:bg-white border-2 focus:border-wcs'
        placeholder='Bio'
        type='text'
        disabled={processing}
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />
      <button type='submit' disabled={processing}>
        Ajouter
      </button>
      <br />
      <br />
    </form>
  );
}
