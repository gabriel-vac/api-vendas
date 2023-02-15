import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import { UserRepository } from '../repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateUserService {
  public async execute({ id, name, email }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const product = await userRepository.findOne(id);

    if (!product) {
      throw new AppError('User not found', 404);
    }

    const userExists = await userRepository.findByName('name');

    if (userExists && name !== product.name) {
      throw new AppError('There is already one user with this name');
    }

    product.name = name;
    product.email = email;

    await userRepository.save(product);

    return product;
  }
}

export default UpdateUserService;
