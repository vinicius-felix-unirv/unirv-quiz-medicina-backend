import { Service } from 'typedi';
import usuariosRepository from '../repository/usuariosRepository';
import { compare } from 'bcryptjs';
import { ApiError } from '../exception/apiError';
import { sign } from 'jsonwebtoken';
import { AuthResponseDTO } from '../model/AuthResponse';
import authConfig from '../authentication/auth';

@Service()
export class AuthenticationService {

    async createSession(usuario: IRequestAuth): Promise<AuthResponseDTO> {

        const user = await usuariosRepository.getUsuarioByEmail(usuario.email);

        if (!user) {
            throw new ApiError('Email nao existe', 401);
        }

        const passwordConfirmed = await compare(usuario.senha, user.senha);

        if (!passwordConfirmed) {
            throw new ApiError('Senha incorreta', 401);
        }

        const token = sign({
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
            role: user.role
        }, authConfig.jwt.secret, { algorithm: 'HS256' },);

        return new AuthResponseDTO(user, token);
    }
}



export interface IRequestAuth {
    email: string;
    senha: string;
}

