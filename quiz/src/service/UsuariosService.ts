import { Service } from 'typedi';
import { IUsuarioAndCampusDTO, UsuarioDTO } from '../model/UsuariosDTO';
import usuariosRepository from '../repository/usuariosRepository';
import { hash } from 'bcryptjs';
import { NotFoundError } from '../exception/NotFoundError';
import { BadRequestError } from '../exception/BadRequestError';
import cursoRepository from '../repository/cursoRepository';
import campusRepository from '../repository/campusRepository';
import { CampusDTO } from '../model/CampusDTO';

@Service()
export class UsuarioService {

  async getUsuarioById(id: number): Promise<UsuarioDTO> {

    const usuarioExists = await usuariosRepository.getUsuarioById(id);

    if (!usuarioExists) throw new NotFoundError('Usuario nao encontrado');

    return new UsuarioDTO(usuarioExists);

  }

  async getAllUsuariosByCursoId(skip: number, take: number, cursoId: number): Promise<UsuarioDTO[]> {

    const cursoExists = await cursoRepository.getCursoById(cursoId);

    if (!cursoExists) throw new NotFoundError('Curso nao encontrado');

    const usuarios = await usuariosRepository.getAllUsuariosByCursoId(skip, take, cursoId);

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

  async saveUsuarioAndCampus(data: IUsuarioAndCampusDTO): Promise<{usuario: UsuarioDTO, campus: CampusDTO}> {

    const emailExists = await usuariosRepository.getUsuarioByEmail(data.email);

    if (emailExists) throw new BadRequestError('Email ja cadastrado');

    const usuarioDTO = new UsuarioDTO({
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      telefone: data.telefone,
      sexo: data.sexo,
      datanascimento: data.datanascimento,
      uf: data.uf,
      foto: data.foto,
      role: 2,
      pontuacao: 0,
      status: true,
      cidade: data.cidade,
    });

    const hashedPassword = await hash(data.senha, 10);

    usuarioDTO.setPasswordHashed(hashedPassword);

    const cursoExist = await cursoRepository.getCursoById(data.cursoid);

    if(!cursoExist) throw new NotFoundError('Curso nao encontrados');
    
    const newUsuario = await usuariosRepository.createUsuario(usuarioDTO);

    const campusDTO = new CampusDTO({
      usuariosid: newUsuario.id,
      nomecampus: data.nomecampus,
      turma: data.turma,
      periodo: data.periodo,
      cursoid: data.cursoid,
    });
    const newCampus = await campusRepository.createCampus(campusDTO);

    return {
      usuario: new UsuarioDTO(newUsuario),
      campus: new CampusDTO(newCampus)
    }; 
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

  async getRankingByCursoId(cursoId: number): Promise<UsuarioDTO[]> {

    const cursoExists = await cursoRepository.getCursoById(cursoId);

    if(!cursoExists) throw new NotFoundError('Curso nao encontrado');

    const ranking = await usuariosRepository.getTopTenPontuacao(cursoId);

    return ranking.map(usuario => new UsuarioDTO(usuario));

  }

}

