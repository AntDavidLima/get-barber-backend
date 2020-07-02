import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../config/upload';

interface RequestDTO {
  user_id: string;
  avatar_filename: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatar_filename,
  }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('Only athenticated users can change avatar');
    }

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const avatarFileExists = await fs.promises.stat(avatarFilePath);
      if (avatarFileExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatar = avatar_filename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
