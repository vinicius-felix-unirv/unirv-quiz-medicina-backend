import { UsuarioDTO } from './../model/UsuariosDTO';
import { usuarios } from '@prisma/client';
import { prisma } from '../db/quizClientPrisma';

export default {

  async getUsuarioByEmail(email: string): Promise<usuarios | null> {

    const usuario = await prisma.usuarios.findFirst({ where: { email: email } });

    return usuario;
  },

  async getUsuarioById(id: number): Promise<usuarios | null> {

    const usuario = await prisma.usuarios.findUnique({ where: { id: id } });

    return usuario;
  },

  async getAllUsuariosByCursoId(skip: number, take: number, cursoId: number): Promise<usuarios[]> {

    const usuarios = await prisma.usuarios.findMany({
      skip: skip,
      take: take,
      where: { 
        campus: {
          some: {cursoid: cursoId}
        }
      }
    });

    return usuarios;
  },

  async createUsuario(usuario: UsuarioDTO): Promise<usuarios> {

    const newUsuario = await prisma.usuarios.create(
      {
        data:
                    {
                      nome: usuario.getNome(),
                      email: usuario.getEmail(),
                      senha: usuario.getSenha(),
                      telefone: usuario.getTelefone(),
                      sexo: usuario.getSexo(),
                      datanascimento: usuario.getDataNascimento(),
                      uf: usuario.getUf(),
                      foto: usuario.getFoto()
                    } as usuarios
      }
    );

    return newUsuario;
  },

  async updateusuario(id: number, usuario: UsuarioDTO): Promise<usuarios> {

    const updatedUsuario = await prisma.usuarios.update(

      {
        where: { id: id },
        data:
                {
                  nome: usuario.getNome(),
                  email: usuario.getEmail(),
                  telefone: usuario.getTelefone(),
                  sexo: usuario.getSexo(),
                  datanascimento: usuario.getDataNascimento(),
                  uf: usuario.getUf(),
                  foto: usuario.getFoto(),
                }
      }
    );

    return updatedUsuario;
  },

  async updateSenhaUsuario(id: number, usuario: UsuarioDTO): Promise<usuarios> {

    const updateSenha = await prisma.usuarios.update(

      {
        where: { id: id },
        data:
                {
                  senha: usuario.getSenha()
                }
      }
    );

    return updateSenha;
  },

  async addPontuacao(userId: number, pontuacao: number): Promise<usuarios> {

    const addedPontuacao = await prisma.usuarios.update({
      where: {id: userId},
      data: {pontuacao: pontuacao}
    });

    return addedPontuacao;
  },

  async getTopTenPontuacao(cursoId: number): Promise<usuarios[]> {

    const topTen = await prisma.usuarios.findMany({
      take: 10,
      where: {
        campus: {
          some: {
            cursoid: cursoId
          }
        }
      },
      orderBy: {pontuacao: 'desc'}
    });

    return topTen;
    
  }
};