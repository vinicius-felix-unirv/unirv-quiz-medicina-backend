import { progressoperguntas } from '@prisma/client';

export interface IProgressoPerguntasDTO{

   id?: number;
   usuariosid: number | null;
   perguntasid: number | null;

}

export class ProgressoPerguntasDTO{

  private id?: number;
  private usuariosid: number | null;
  private perguntasid: number | null;

  constructor(data: IProgressoPerguntasDTO | progressoperguntas){

    this.id = data.id;
    this.usuariosid = data.usuariosid;
    this.perguntasid = data.perguntasid;
  }

  getId(): number | undefined { return this.id; }

  getUsuariosId(): number | null { return this.usuariosid; }

  getPerguntasId(): number | null { return this.perguntasid; }

}