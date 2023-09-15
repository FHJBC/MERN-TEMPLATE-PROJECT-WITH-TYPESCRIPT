import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../repositories/user.repository';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    console.log("BODY", JSON.stringify(req.body, null, 2));

    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    console.log("user found", user);

    if (user !== null) {
      user.username = username;

      await user.save();

      return res.status(200).json(user).end();
    }

    return res.status(404).json({ message: `User with ${id} not found` }).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}