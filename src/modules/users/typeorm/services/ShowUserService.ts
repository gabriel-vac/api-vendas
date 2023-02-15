import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import { UserRepository } from '../repositories/UsersRepository';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export default ShowUserService;
