import { campus } from '@prisma/client';

export interface ICampusDTO{

    id?: number;        
    curso: string;
    turma: string;
    periodo: number;   
    nome: string;
    usuariosid: number;
}

export class CampusDTO {

  private id?: number;        
  private curso: string;
  private turma: string;
  private periodo: number;   
  private nome: string;
  private usuariosid: number;

  constructor(data: ICampusDTO | campus){
    this.id = data.id;
    this.curso = data.curso;
    this.turma = data.turma;
    this.periodo = data.periodo;
    this.nome = data.nome;
    this.usuariosid = data.usuariosid;
  }

  getId(): number | undefined {
    return this.id;
  }

  getCurso(): string{
    return this.curso;
  }

  getTurma(): string{
    return this.turma;
  }

  getPeriodo(): number{
    return this.periodo;
  }

  getNome(): string{
    return this.nome;
  }

  getUsuarioId(): number{
    return this.usuariosid;
  }

}