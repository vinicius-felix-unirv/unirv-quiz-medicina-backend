import { Service } from 'typedi';
import usuariosRepository from '../repository/usuariosRepository';
import { compare } from 'bcryptjs';
import { ApiError } from '../exception/ApiError';
import { sign } from 'jsonwebtoken';
import { AuthResponse } from '../model/AuthResponse';
import authConfig from '../authentication/auth';
import logsRepository from '../repository/logsRepository';
import { LogsDTO } from '../model/LogsDTO';

@Service()
export class AuthenticationService {

  async createSession(usuario: IRequestAuth): Promise<AuthResponse> {

    const user = await usuariosRepository.getUsuarioByEmail(usuario.email);
    const passwordConfirmed = await compare(usuario.senha, user.senha);

    if (!user || !passwordConfirmed) {
      throw new ApiError('Email e/ou Senha Incorretos', 401);
    }

    const token = sign({
      id: user.id,
      name: user.nome,
      role: user.role
    }, authConfig.jwt.secret, { expiresIn: '10s' });

    await logsRepository.createLogs(new LogsDTO({usuariosid: user.id,
      descricao: 'Login successfully'}));

    return { token: token };
  }
}

export interface IRequestAuth {
  email: string;
  senha: string;
}

