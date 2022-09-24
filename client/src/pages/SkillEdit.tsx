import { FormEvent, useEffect, useState } from 'react';
import { createSkill, getAllSkills } from '../services/skills';
import { ISkill, ISkillInput } from '../types/ISkill';

const SkillEdit = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [name, setName] = useState<ISkillInput['name']>('');
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await createSkill({ name });
      loadSkillsIntoState();
      setName('');
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const loadSkillsIntoState = async () => {
    setLoadingSkills(true);
    try {
      setSkills(await getAllSkills());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSkills(false);
    }
  };

  useEffect(() => {
    loadSkillsIntoState();
  }, []);

  return (
    <>
      <h2 className='font-bold text-2xl my-4'>Skills</h2>
      <h3>Ajouter Skills</h3>

      <form onSubmit={handleSubmit}>
        <input
          className='bg-gray-200 appearance-none rounded py-0.5 px-4 focus:outline-none focus:bg-white border-2 focus:border-wcs'
          placeholder='Nom du skill à ajouter'
          type='text'
          disabled={processing}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type='submit' disabled={processing}>
          Ajouter
        </button>
      </form>

      <ul>
        {loadingSkills
          ? 'Loading...'
          : skills.map((skill) => <li className='list-none'>{skill.name}</li>)}
      </ul>
    </>
  );
};

export default SkillEdit;
