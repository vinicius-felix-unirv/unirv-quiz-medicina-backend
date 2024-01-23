import { perguntasnivel } from '@prisma/client';

export interface IPerguntasNivelDTO{

    id?: number;
    nivel: number;    
    pontuacao: number;
    tempo: number;   
}

export class PerguntasNivelDTO{

  private id?: number;
  private nivel: number;    
  private pontuacao: number;
  private tempo: number;   
  
  constructor(perguntasNivel: IPerguntasNivelDTO | perguntasnivel){

    this.id = perguntasNivel.id;
    this.nivel = perguntasNivel.nivel;
    this.pontuacao = perguntasNivel.pontuacao;
    this.tempo = perguntasNivel.tempo;
  }

  getId(): number {  return this.id!;  }

  getNivel(): number { return this.nivel; }
  
  getPontuacao(): number { return this.pontuacao; }
  
  getTempo(): number { return this.tempo; }
}