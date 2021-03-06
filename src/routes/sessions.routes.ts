import { Router } from 'express';

import AuthenticateUserService from '../services/AutheticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });

  return res.json({ user, token });
  // return res.status(400).json({ error: e.message });
});

export default sessionRouter;
