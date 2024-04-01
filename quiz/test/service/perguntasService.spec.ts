import { BadRequestError } from '../../src/exception/BadRequestError';
import { NotFoundError } from '../../src/exception/NotFoundError';
import { PerguntaDTO } from '../../src/model/PerguntaDTO';
import perguntasRepository from '../../src/repository/perguntasRepository';
import { PerguntasService } from '../../src/service/PerguntasService';

const perguntasService = new PerguntasService();

const perguntaMock = {
    id: 2,                 
    conteudo: 'qual teu nome',
    perguntasnivelid: 4,
    tempo: 45,
    pathimage: '/test',
    status: true,     
    categoriasid: 1,
    quizid: 9
};

describe('testando a função getPergunta', () => {

    it('deve retornar uma instancia de PerguntaDTO', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(perguntaMock);

        const pergunta = await perguntasService.getPerguntaById(4);

        expect(pergunta).toBeInstanceOf(PerguntaDTO);
        expect(pergunta).toEqual(perguntaMock);
    });

    it('deve retornar um NotFoundError com a mensagem: Pergunta nao encontrada', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(null);

        await expect(perguntasService.getPerguntaById(4)).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Pergunta nao encontrada'
        });

    });
});

describe('testando a função getAllPergunta', () => {

    it('deve retornar uma lista de  instancias de PerguntaDTO', async () => {

        perguntasRepository.getAllPerguntas = jest.fn().mockResolvedValueOnce([perguntaMock]);

        const pergunta = await perguntasService.getAllPerguntas();

        expect(pergunta.every(pergunta => pergunta instanceof PerguntaDTO)).toBeTruthy();
        expect(pergunta[0]).toEqual(perguntaMock);
    });
});

describe('testando a função savePergunta', () => {

    it('deve criar e retornar uma instancia de PerguntaDTO', async () => {

        perguntasRepository.getPergunta = jest.fn().mockResolvedValueOnce(null);
        perguntasRepository.createPergunta = jest.fn().mockResolvedValueOnce(perguntaMock);

        const pergunta = await perguntasService.savePergunta(new PerguntaDTO(perguntaMock));

        expect(pergunta).toEqual(perguntaMock);
        expect(pergunta).toBeInstanceOf(PerguntaDTO);
    });

    it('deve retornar um BadRequestError com a mensagem: Pergunta ja existe', async () => {

        perguntasRepository.getPergunta = jest.fn().mockResolvedValueOnce(perguntaMock);

        await expect(perguntasService.savePergunta(new PerguntaDTO(perguntaMock))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Pergunta ja existe'
        });

    });
});

describe('testando a função alterPergunta', () => {

    it('deve retornar uma instancia de PerguntaDTO', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(perguntaMock);
        perguntasRepository.getPergunta = jest.fn().mockResolvedValueOnce(null);

        perguntaMock.conteudo = 'blabla';
        perguntasRepository.updatePergunta = jest.fn().mockResolvedValueOnce(perguntaMock);

        const pergunta = await perguntasService.alterPergunta(3,new PerguntaDTO(perguntaMock));

        expect(pergunta).toEqual(perguntaMock);
        expect(pergunta).toBeInstanceOf(PerguntaDTO);
    });

    it('deve retornar um BadRequestError com a mensagem: Pergunta ja existe', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(perguntaMock);

        perguntasRepository.getPergunta = jest.fn().mockResolvedValueOnce(perguntaMock);

        await expect(perguntasService.alterPergunta(4, new PerguntaDTO(perguntaMock))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Pergunta ja existe'
        });

    });

    it('deve retornar um NotFoundError com a mensagem: Pergunta nao encontrada', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(null);

        await expect(perguntasService.alterPergunta(4, new PerguntaDTO(perguntaMock))).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Pergunta nao encontrada'
        });

    });
});

describe('testando a função alterStatusPergunta', () => {

    it('deve retornar uma instancia de PerguntaDTO', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(perguntaMock);

        perguntaMock.status = !perguntaMock.status;
        perguntasRepository.updatePergunta = jest.fn().mockResolvedValueOnce(perguntaMock);

        const pergunta = await perguntasService.alterStatusPergunta(9);

        expect(pergunta).toEqual(perguntaMock);
        expect(pergunta).toBeInstanceOf(PerguntaDTO);
    });

    it('deve retornar um NotFoundError com a mensagem: Pergunta nao encontrada', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(null);

        await expect(perguntasService.alterStatusPergunta(4)).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Pergunta nao encontrada'
        });

    });
});