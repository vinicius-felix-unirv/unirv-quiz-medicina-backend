import { Service } from 'typedi';
import { UsuarioDTO } from '../model/UsuariosDTO';
import usuariosRepository from '../repository/usuariosRepository';
import { hash } from 'bcryptjs';
import { NotFoundError } from '../exception/NotFoundError';
import { BadRequestError } from '../exception/BadRequestError';

@Service()
export class UsuarioService {

  async getUsuarioById(id: number): Promise<UsuarioDTO> {

    const usuarioExists = await usuariosRepository.getUsuarioById(id);

    if (usuarioExists == null) throw new NotFoundError('Usuario nao encontrado');

    return new UsuarioDTO(usuarioExists);

  }

  async getAllUsuarios(): Promise<UsuarioDTO[]> {

    const usuarios = await usuariosRepository.getAllUsuarios();

    const allUsuarios = usuarios.map((usuarios) => new UsuarioDTO(usuarios));

    return allUsuarios;

  }

  async saveUsuario(usuario: UsuarioDTO): Promise<UsuarioDTO> {

    const emailExists = await usuariosRepository.getUsuarioByEmail(usuario.getEmail());

    if (emailExists) throw new BadRequestError('Email ja cadastrado');

    const hashedPassword = await hash(usuario.getSenha(), 10);

    usuario.setPasswordHashed(hashedPassword);

    const newUsuario = await usuariosRepository.createUsuario(usuario);

    return new UsuarioDTO(newUsuario);
  }

  async alterUsuario(id: number, usuario: UsuarioDTO): Promise<UsuarioDTO> {

    const usuarioExists = await usuariosRepository.getUsuarioById(id);

    if (!usuarioExists) throw new NotFoundError('Usuario nao encontrado');

    const emailExists = await usuariosRepository.getUsuarioByEmail(usuario.getEmail());

    if (emailExists != null && emailExists.id != id) throw new BadRequestError('Email ja cadastrado');

    const updatedUsuario = await usuariosRepository.updateusuario(id, usuario);

    return new UsuarioDTO(updatedUsuario);
  }

  async alterPassword(userId: number, password: string): Promise<void>{

    const userExists = await usuariosRepository.getUsuarioById(userId);
    
    if(!userExists) throw new NotFoundError('Usuario nao encontrado');
    
    const user = new UsuarioDTO(userExists);

    const hashedPassword = await hash(password, 10);
    
    user.setPasswordHashed(hashedPassword);
    
    await usuariosRepository.updateSenhaUsuario(userId, user);
    
  }

  async addPontuacao(userId: number, pontuacao: number): Promise<UsuarioDTO> {

    const userExists = await usuariosRepository.getUsuarioById(userId);

    if (!userExists) throw new NotFoundError('Usuario nao encontrado');

    if(pontuacao < 0) throw new BadRequestError('A pontuacao nao pode ser negativa');

    const newPontuacao = userExists.pontuacao + pontuacao;

    const addedPontuacao = await usuariosRepository.addPontuacao(userId, newPontuacao);

    return new UsuarioDTO(addedPontuacao);
  }

  async getRanking(): Promise<UsuarioDTO[]> {

    const ranking = await usuariosRepository.getTopTenPontuacao();

    return ranking.map(usuario => new UsuarioDTO(usuario));

  }

}

