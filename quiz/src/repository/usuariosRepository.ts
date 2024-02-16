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

  async getAllUsuarios(): Promise<usuarios[]> {

    const usuarios = await prisma.usuarios.findMany();

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
                      role: usuario.getRole(),
                      uf: usuario.getUf(),
                      foto: usuario.getFoto(),
                      pontuacao: usuario.getPontuacao(),
                      status: usuario.getStatus()
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
                  senha: usuario.getSenha(),
                  telefone: usuario.getTelefone(),
                  sexo: usuario.getSexo(),
                  datanascimento: usuario.getDataNascimento(),
                  role: usuario.getRole(),
                  uf: usuario.getUf(),
                  foto: usuario.getFoto(),
                  pontuacao: usuario.getPontuacao(),
                  status: usuario.getStatus()
                }
      }
    );

    return updatedUsuario;
  }
};