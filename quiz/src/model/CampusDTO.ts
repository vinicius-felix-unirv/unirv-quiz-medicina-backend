import { campus } from '@prisma/client';

export interface ICampusDTO{

    id?: number;        
    curso: string | null;
    turma: string | null;
    periodo: number | null;   
    nome: string | null;
    usuariosid: number | null;
}

export class CampusDTO {

  private id?: number;        
  private curso: string | null;
  private turma: string | null;
  private periodo: number | null;   
  private nome: string | null;
  private usuariosid: number | null;

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

  getCurso(): string | null{
    return this.curso;
  }

  getTurma(): string | null{
    return this.turma;
  }

  getPeriodo(): number | null{
    return this.periodo;
  }

  getNome(): string | null{
    return this.nome;
  }

  getUsuarioId(): number | null{
    return this.usuariosid;
  }

}