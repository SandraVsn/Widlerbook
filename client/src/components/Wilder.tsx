import { useState } from 'react';
import { Link } from 'react-router-dom';
import blank_profile from '../assets/avatar.png';
import { deleteWilder } from '../services/wilders';
import { IWilder } from '../types/IWilder';
import Skill from './Skill';

interface WilderProps {
  wilder: IWilder;
  loadWildersIntoState: () => void;
}

const Wilder = ({
  wilder: { id, name, city, bio, skills = [] },
  loadWildersIntoState,
}: WilderProps) => {
  const [processing, setProcessing] = useState(false);

  const handleDelete = async () => {
    setProcessing(true);
    try {
      await deleteWilder(id);
      loadWildersIntoState();
    } catch (err) {
      console.log(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <article className='flex flex-col w-52 border border-gray-100 rounded-md shadow-md mr-3 mb-3'>
      <button
        onClick={handleDelete}
        className='self-end mr-1'
        disabled={processing}
      >
        Delete
      </button>
      <img
        src={blank_profile}
        alt={name}
        className='w-44 h-44 rounded-full self-center'
      />
      <h3>{name[0].toUpperCase() + name.split('').splice(1).join('')}</h3>
      <p>{city}</p>
      <p>{bio}</p>
      <h4>Wild Skills</h4>

      <ul className=''>
        {skills.map((skill) => (
          <Skill key={skill.id} skill={skill} />
        ))}
      </ul>
      <Link to={`/wilders/${id}`}>
        <button className=''>Edit</button>
      </Link>
    </article>
  );
};

export default Wilder;
