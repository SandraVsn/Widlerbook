import { IWilder, IWilderUpdate } from '../types/IWilder';
import blank_profile from '../assets/avatar.png';
import Skill from './Skill';
import { FormEvent, useState } from 'react';
import { updateWilder } from '../services/wilders';

interface WilderProfileProps {
  wilder: IWilder;
}

const WilderProfile = ({
  wilder: { id, name, city, bio, skills = [] },
}: WilderProfileProps) => {
  const [changeName, setChangingName] = useState<IWilderUpdate['name']>('');
  const [changeCity, setChangingCity] = useState<IWilderUpdate['city']>('');
  const [changeBio, setChangingBio] = useState<IWilderUpdate['bio']>('');
  const [processing, setProcessing] = useState(false);

  const activateChange = (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
  };

  const desactivateChange = (e: FormEvent) => {
    e.preventDefault();
    setProcessing(false);
  };

  const handleChangeName = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await updateWilder(id, { name: changeName });
      return alert('Wilder name updated');
    } catch (err) {
      console.error(err);
      return alert('Problem while creating new Wilder, please try again');
    } finally {
      setProcessing(false);
    }
  };

  const handleChangeCity = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await updateWilder(id, { city: changeCity });
      return alert('Wilder city updated');
    } catch (err) {
      console.error(err);
      return alert('Problem while creating new Wilder, please try again');
    } finally {
      setProcessing(false);
    }
  };

  const handleChangeBio = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await updateWilder(id, { bio: changeBio });
      return alert('Wilder bio updated');
    } catch (err) {
      console.error(err);
      return alert('Problem while creating new Wilder, please try again');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <img
        src={blank_profile}
        alt={name}
        className='w-60 h-60 rounded-full m-5'
      />
      <input
        className='text-3xl font-bold text-wcs disabled:bg-white'
        defaultValue={name[0].toUpperCase() + name.split('').splice(1).join('')}
        onChange={(e) => setChangingName(e.target.value)}
        disabled={!processing}
      />
      {processing ? (
        <>
          <button onClick={desactivateChange}>Annuler</button>
          <button onClick={handleChangeName}>Enregistrer</button>
        </>
      ) : (
        <button onClick={activateChange}>Modifier</button>
      )}

      <input
        className='font-light italic text-xl disabled:bg-white'
        onChange={(e) => setChangingCity(e.target.value)}
        defaultValue={city || ''}
        disabled={!processing}
      />

      {processing ? (
        <>
          <button onClick={desactivateChange}>Annuler</button>
          <button onClick={handleChangeCity}>Enregistrer</button>
        </>
      ) : (
        <button onClick={activateChange}>Modifier</button>
      )}

      <input
        className='text-xl disabled:bg-white'
        onChange={(e) => setChangingBio(e.target.value)}
        defaultValue={bio || ''}
        disabled={!processing}
      />
      {processing ? (
        <>
          <button onClick={desactivateChange}>Annuler</button>
          <button onClick={handleChangeCity}>Enregistrer</button>
        </>
      ) : (
        <button onClick={activateChange}>Modifier</button>
      )}

      <div className='flex'>
        <h4>Wild Skills</h4>
        <button>+</button>
      </div>
      <ul className=''>
        {skills.map((skill) => (
          <Skill key={skill.id} skill={skill} />
        ))}
      </ul>
    </div>
  );
};

export default WilderProfile;
