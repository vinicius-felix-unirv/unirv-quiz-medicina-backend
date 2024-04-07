import { campus } from '@prisma/client';

export interface ICampusDTO{

    id?: number;        
    cursoid: number;
    turma: string;
    periodo: number;   
    nomecampus: string;
    usuariosid: number;
}

export class CampusDTO {

  private id?: number;        
  private cursoid: number;
  private turma: string;
  private periodo: number;   
  private nomecampus: string;
  private usuariosid: number;

  constructor(data: ICampusDTO | campus){
    
    this.id = data.id;
    this.cursoid = data.cursoid;
    this.turma = data.turma;
    this.periodo = data.periodo;
    this.nomecampus = data.nomecampus;
    this.usuariosid = data.usuariosid;
  }

  getId(): number | undefined {
    return this.id;
  }

  getCursoId(): number{
    return this.cursoid;
  }

  getTurma(): string{
    return this.turma;
  }

  getPeriodo(): number{
    return this.periodo;
  }

  getNomeCampus(): string{
    return this.nomecampus;
  }

  getUsuarioId(): number{
    return this.usuariosid;
  }

}