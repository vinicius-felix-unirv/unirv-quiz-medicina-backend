import { usuarios } from '@prisma/client';

export interface IUsuarioDTO {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  sexo: number;
  datanascimento: Date;
  role: number;
  uf: string;
  foto: string;
  pontuacao: number;
  status: boolean;
  cidade: string;
}

export interface IUsuarioAndCampusDTO{
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  sexo: number;
  datanascimento: Date;
  uf: string;
  foto: string;
  cidade: string;
  cursoid: number;
  turma: string;
  periodo: number;
  nomecampus: string;
  usuariosid: number;
}


export class UsuarioDTO {

  private id?: number;
  private nome: string;
  private email: string;
  private senha: string;
  private telefone: string;
  private sexo: number;
  private datanascimento: Date;
  private role: number;
  private uf: string;
  private foto: string;
  private pontuacao: number;
  private status: boolean;
  private cidade: string;

  constructor(data: IUsuarioDTO | usuarios) {
    this.id = data.id;
    this.nome = data.nome;
    this.email = data.email;
    this.senha = data.senha;
    this.telefone = data.telefone;
    this.sexo = data.sexo;
    this.datanascimento = data.datanascimento;
    this.role = data.role;
    this.uf = data.uf;
    this.foto = data.foto;
    this.pontuacao = data.pontuacao;
    this.status = data.status;
    this.cidade = data.cidade;
  }

  getId(): number | undefined {
    return this.id;
  }
  getNome(): string { return this.nome; }
  getEmail(): string { return this.email; }
  getSenha(): string { return this.senha; }
  getTelefone(): string { return this.telefone; }
  getSexo(): number { return this.sexo; }
  getRole(): number { return this.role; }
  getUf(): string { return this.uf; }
  getFoto(): string { return this.foto; }
  getPontuacao(): number { return this.pontuacao; }
  getStatus(): boolean { return this.status; }
  getDataNascimento(): Date { return this.datanascimento; }
  getCidade(): string { return this.cidade; }

  setPasswordHashed(hashedPassword: string) {
    this.senha = hashedPassword;
  }

}