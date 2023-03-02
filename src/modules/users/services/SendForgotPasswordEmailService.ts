import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import EtherealMail from '@config/mail/EtherealMail';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = await usersTokenRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: user.email,
      body: `Solicitação de refinição de senha recebida: ${token?.token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
