import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Wilder from './Wilder';
import Skill from './Skill';

@Entity()
class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  votes: number;

  @Column()
  skillId: number;

  @Column()
  wilderId: number;

  @ManyToOne(() => Wilder, (w) => w.grades)
  wilder: Wilder;

  @ManyToOne(() => Skill, (s) => s.grades)
  skill: Skill;
}

export default Grade;
