import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const cretaeUsers = new CreateUserService();

    const user = await cretaeUsers.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (req, res) => {
    return res.json({ ok: 'true' });
  },
);

export default usersRouter;
