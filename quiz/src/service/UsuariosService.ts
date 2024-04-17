import { Service } from 'typedi';
import { UsuarioDTO } from '../model/UsuariosDTO';
import usuariosRepository from '../repository/usuariosRepository';
import { hash } from 'bcryptjs';
import { NotFoundError } from '../exception/NotFoundError';
import { BadRequestError } from '../exception/BadRequestError';
import { usuarios } from '@prisma/client';
import { campusService, cursoService } from './containerConfig';

@Service()
export class UsuarioService {

  async checksUsuarioExistsById(id: number): Promise<usuarios>{

    const usuarioExists = await usuariosRepository.getUsuarioById(id);

    if (!usuarioExists) throw new NotFoundError('Usuario nao encontrado');

    return usuarioExists;
  }

  async getUsuarioById(id: number): Promise<UsuarioDTO> {

    const usuario = await this.checksUsuarioExistsById(id);

    return new UsuarioDTO(usuario);

  }

  async getAllUsuariosByCursoId(skip: number, take: number, cursoId: number): Promise<UsuarioDTO[]> {

    await cursoService.checksCursoExistsById(cursoId);

    const usuarios = await usuariosRepository.getAllUsuariosByCursoId(skip, take, cursoId);

    const allUsuarios = usuarios.map((usuarios) => new UsuarioDTO(usuarios));

    return allUsuarios;

  }

  async saveUsuario(usuario: UsuarioDTO): Promise<UsuarioDTO> {

    const emailExists = await usuariosRepository.getUsuarioByEmail(usuario.getEmail());

    if (emailExists) throw new BadRequestError('Email ja cadastrado');

    await cursoService.checksCursoExistsById(usuario.getCursoId());

    await campusService.checksCampusExistsById(usuario.getCampusId());

    const hashedPassword = await hash(usuario.getSenha(), 10);

    usuario.setPasswordHashed(hashedPassword);

    const newUsuario = await usuariosRepository.createUsuario(usuario);

    return new UsuarioDTO(newUsuario);
  }

  async alterUsuario(id: number, usuario: UsuarioDTO): Promise<UsuarioDTO> {

    await this.checksUsuarioExistsById(id);

    await cursoService.checksCursoExistsById(usuario.getCursoId());

    await campusService.checksCampusExistsById(usuario.getCampusId());

    const emailExists = await usuariosRepository.getUsuarioByEmail(usuario.getEmail());

    if (emailExists != null && emailExists.id != id) throw new BadRequestError('Email ja cadastrado');

    const updatedUsuario = await usuariosRepository.updateusuario(id, usuario);

    return new UsuarioDTO(updatedUsuario);
  }

  

  async alterPassword(userId: number, password: string): Promise<void>{

    const userExists = await this.checksUsuarioExistsById(userId);
    
    const user = new UsuarioDTO(userExists);

    const hashedPassword = await hash(password, 10);
    
    user.setPasswordHashed(hashedPassword);
    
    await usuariosRepository.updateSenhaUsuario(userId, user);
    
  }

  async addPontuacao(userId: number, pontuacao: number): Promise<UsuarioDTO> {

    const userExists = await this.checksUsuarioExistsById(userId);

    if(pontuacao < 0) throw new BadRequestError('A pontuacao nao pode ser negativa');

    const newPontuacao = userExists.pontuacao + pontuacao;

    const addedPontuacao = await usuariosRepository.addPontuacao(userId, newPontuacao);

    return new UsuarioDTO(addedPontuacao);
  }

  async getRankingByCursoId(cursoId: number): Promise<UsuarioDTO[]> {

    await cursoService.checksCursoExistsById(cursoId);

    const ranking = await usuariosRepository.getTopTenPontuacao(cursoId);

    return ranking.map(usuario => new UsuarioDTO(usuario));

  }

}

