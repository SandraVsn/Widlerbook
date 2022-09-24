import { ISkill } from '../types/ISkill';

interface SkillProps {
  skill: ISkill;
}

const Skill = ({ skill: { id, name, votes = 3 } }: SkillProps) => {
  return (
    <li className='list-none'>
      {name}
      <span className=''>{votes}</span>
    </li>
  );
};

export default Skill;
