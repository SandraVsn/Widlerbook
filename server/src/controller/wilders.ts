import dataSource from '../db';
import Skill from '../models/Skill';
import Wilder from '../models/Wilder';
import Grade from '../models/Grade';
import { IController } from '../types/IController';

const wildersController: IController = {
  create: async (req, res) => {
    const { name, bio, city } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send('the name should have a length between 1 and 100 characters');
    }

    try {
      const created = await dataSource
        .getRepository(Wilder)
        .save({ name, bio, city });
      res.status(201).send(created);
    } catch (err) {
      console.error(err);
      res.send('error while creating wilder');
    }
  },
  read: async (req, res) => {
    try {
      const wilders = await dataSource
        .getRepository(Wilder)
        .find({ relations: { grades: { skill: true } } });

      res.send(
        wilders.map((w) => ({
          ...w,
          grades: undefined,
          skills: w.grades.map((g) => ({
            id: g.skill.id,
            name: g.skill.name,
            votes: g.votes,
          })),
        }))
      );
    } catch (err) {
      console.error(err);
      res.send('error while reading wilders');
    }
  },
  readOne: async (req, res) => {
    try {
      const wilder = await dataSource.getRepository(Wilder).findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: { grades: { skill: true } },
      });
      wilder !== null
        ? res.send({
            ...wilder,
            grades: undefined,
            skills: wilder.grades.map((g) => ({
              id: g.skill.id,
              name: g.skill.name,
              vote: g.votes,
            })),
          })
        : res.send('Wilder not found');
    } catch (err) {
      console.error(err);
      res.send('Wilder not found');
    }
  },

  update: async (req, res) => {
    const { name } = req.body;
    if (name?.length > 100 || name?.length === 0) {
      return res
        .status(422)
        .send('the name should have a length between 1 and 100 characters');
    }

    try {
      const { affected } = await dataSource
        .getRepository(Wilder)
        .update(req.params.id, req.body);
      if (affected !== 0) return res.send('wilder updated');
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.send('error while updating wilder');
    }
  },
  delete: async (req, res) => {
    try {
      const { affected } = await dataSource
        .getRepository(Wilder)
        .delete(req.params.id);
      if (affected !== 0) return res.send('wilder deleted');
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
    }
  },
  addSkill: async (req, res) => {
    const wilderToUpdate = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: parseInt(req.params.wilderId, 10) });

    if (wilderToUpdate === null)
      return res.status(404).send('wilder not found');

    const skillToAdd = await dataSource
      .getRepository(Skill)
      .findOneBy({ id: req.body.skillId });

    if (skillToAdd === null) return res.status(404).send('skill not found');

    await dataSource
      .getRepository(Grade)
      .insert({ wilder: wilderToUpdate, skill: skillToAdd });

    res.send('skill added to wilder');
  },
  removeSkill: async (req, res) => {
    const wilderToUpdate = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: parseInt(req.params.wilderId, 10) });

    if (wilderToUpdate === null)
      return res.status(404).send('wilder not found');

    const skillToRemove = await dataSource
      .getRepository(Skill)
      .findOneBy({ id: parseInt(req.params.skillId, 10) });

    if (skillToRemove === null) return res.status(404).send('skill not found');

    await dataSource.getRepository(Grade).delete({
      wilderId: wilderToUpdate.id,
      skillId: skillToRemove.id,
    });
    res.send('skill deleted from wilder');
  },
};

export default wildersController;
