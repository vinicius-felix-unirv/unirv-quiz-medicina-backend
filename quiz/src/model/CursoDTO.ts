import { curso } from '@prisma/client';

export interface ICursoDTO {
    id: number;
    nome: string;
    imagem: string;
}

export class CursoDTO {

    private id?: number;
    private nome: string;
    private imagem: string;

    constructor(data: ICursoDTO | curso){
        this.id = data.id;
        this.nome = data.nome;
        this.imagem = data.imagem;
    }

    getId(): number | undefined { return this.id; }

    getNome(): string { return this.nome; }

    getImagem(): string { return this.imagem; }


}