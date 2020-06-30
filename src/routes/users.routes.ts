import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const cretaeUsers = new CreateUserService();

    const user = await cretaeUsers.execute({ name, email, password });

    return res.json(user);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default usersRouter;
