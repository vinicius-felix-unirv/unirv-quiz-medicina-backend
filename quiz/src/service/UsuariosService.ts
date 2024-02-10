import { Service } from 'typedi';
import { UsuarioDTO } from '../model/UsuariosDTO';
import usuariosRepository from '../repository/usuariosRepository';
import { hash } from 'bcryptjs';
import { NotFoundError } from '../exception/NotFoundError';

@Service()
export class UsuarioService {

  async getUsuarioById(id: number): Promise<UsuarioDTO> {

    const usuarioExists = await usuariosRepository.getUsuarioById(id);

    if (usuarioExists == null) throw new NotFoundError('Usuario does not exist');

    return new UsuarioDTO(usuarioExists);

  }

  async getAllUsuarios(): Promise<UsuarioDTO[]> {

    const usuarios = await usuariosRepository.getAllUsuarios();

    const allUsuarios = usuarios.map((usuarios) => new UsuarioDTO(usuarios));

    return allUsuarios;

  }

  async saveUsuario(usuario: UsuarioDTO): Promise<UsuarioDTO> {

    const emailExists = await usuariosRepository.getUsuarioByEmail(usuario.getEmail());

    if (emailExists != null) throw new NotFoundError('Usuario already exists');

    const hashedPassword = await hash(usuario.getSenha(), 10);

    usuario.setPasswordHashed(hashedPassword);

    const newUsuario = await usuariosRepository.createUsuario(usuario);

    return new UsuarioDTO(newUsuario);
  }

  async alterUsuario(id: number, usuario: UsuarioDTO): Promise<UsuarioDTO> {

    const usuarioExists = await usuariosRepository.getUsuarioById(id);

    if (usuarioExists == null) throw new NotFoundError('Usuario not found');

    const emailExists = await usuariosRepository.getUsuarioByEmail(usuario.getEmail());

    if (emailExists != null) throw new NotFoundError('Usuario already exists');

    const updatedUsuario = await usuariosRepository.updateusuario(id, usuario);

    return new UsuarioDTO(updatedUsuario);
  }

}

