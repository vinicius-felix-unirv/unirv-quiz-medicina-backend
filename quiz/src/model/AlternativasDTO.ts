import { alternativas } from '@prisma/client';

export interface IAlternativasDTO {

    id?: number,
    perguntasid: number,
    conteudo: string | null,
    pathimage: string | null,
    correta: boolean,

}

export class AlternativasDTO {

    private id?: number;
    private perguntasid: number;
    private conteudo: string | null;
    private pathimage: string | null;
    private correta: boolean;

    constructor(data: alternativas | IAlternativasDTO) {

        this.id = data.id;
        this.perguntasid = data.perguntasid;
        this.conteudo = data.conteudo;
        this.pathimage = data.pathimage;
        this.correta = data.correta;
    }

    getId(): number | undefined { return this.id; }

    getPerguntasId(): number { return this.perguntasid; }

    getConteudo(): string | null { return this.conteudo; }

    getPathImage(): string | null { return this.pathimage; }

    getCorreta(): boolean { return this.correta; }
}


export class AllAlternativasDTO {

    public alternativas: AlternativasDTO[] = [];
    constructor(data: {
        perguntasid: number,
        conteudo: string,
        pathimage: string,
        correta: boolean
    }[]) {
        this.alternativas = data.map(x => new AlternativasDTO(x));
    }
}