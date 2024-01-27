import { logs } from '@prisma/client';

export interface ILogsDTO{

    id?: number;
    usuariosid: number;
    descricao: string;
}

export class LogsDTO{

  private id?: number;
  private usuariosid: number | null;
  private descricao: string;


  constructor(data: ILogsDTO | logs){

    this.id = data.id;
    this.usuariosid = data.usuariosid;
    this.descricao = data.descricao;

  }

  getId(): number { return this.id!; }

  getUsuariosId(): number { return this.usuariosid!; }

  getDescricao(): string { return this.descricao; }
 
}