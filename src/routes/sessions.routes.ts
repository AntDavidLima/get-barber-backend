import { Router } from 'express';

import AuthenticateUserService from '../services/AutheticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const user = await authenticateUser.execute({ email, password });

    delete user.password;

    return res.json(user);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default sessionRouter;
