import { BadRequestError } from '../../src/exception/BadRequestError';
import { NotFoundError } from '../../src/exception/NotFoundError';
import { AllAlternativasDTO, AlternativasDTO } from '../../src/model/AlternativasDTO';
import alternativasRepository from '../../src/repository/alternativasRepository';
import perguntasRepository from '../../src/repository/perguntasRepository';
import { AlternativasService } from '../../src/service/AlternativasService';

const alternativasService = new AlternativasService();
const alternativaMock = {
    id: 3,
    perguntasid: 2,
    resposta: 'string',
    pathimage: 'string',
    correta: false,
};

const alternativaMock02 = {
    id: 38,
    perguntasid: 2,
    resposta: 'teu pai',
    pathimage: 'test',
    correta: true,
};

const perguntaMock = {
    id: 5,
    conteudo: 'string',
    perguntasnivelid: 2,
    tempo: 34,
    pathimage: 'string',
    status: true,
    categoriasid: 3,
    quizid: 1
};

describe('testando a função alternativasCanBePersistent', () => {

    it('não deve retornar uma exeção', () => {

        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([]);

        expect( async () => {
            await alternativasService.alternativasCanBePersistent(new AllAlternativasDTO([alternativaMock]));
        }).not.toThrow();

    });

    it('deve retornar um BadRequestError com a mensagem: limit of alternativa exceeded', async () => {

        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([alternativaMock, alternativaMock, alternativaMock, alternativaMock, alternativaMock]);

        await expect(alternativasService.alternativasCanBePersistent(new AllAlternativasDTO([alternativaMock]))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'limit of alternativa exceeded'
          });
    });

    it('deve retornar um BadRequestError com a mensagem: Alternativa already exists', async () => {

        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([alternativaMock]);      
        
        await expect(alternativasService.alternativasCanBePersistent(new AllAlternativasDTO([alternativaMock]))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Alternativa already exists'
          });
    });
});

describe('testando a função saveAlternativa', () => {

    it('deve criar uma alternativa e retornar uma AlternativasDTO', async () => {

        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([]);

        alternativasRepository.createAlternativa = jest.fn().mockResolvedValueOnce(alternativaMock);

        const newAlternativa = await alternativasService.saveAlternativa(new AlternativasDTO(alternativaMock));

        expect(newAlternativa).toBeInstanceOf(AlternativasDTO);
        expect(newAlternativa).toEqual(alternativaMock);
    });

    it('deve retornar um BadRequestError com a mensagem: limit of alternativa exceeded', async () => {

        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([alternativaMock, alternativaMock, alternativaMock, alternativaMock, alternativaMock]);

        await expect(alternativasService.saveAlternativa(new AlternativasDTO(alternativaMock))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'limit of alternativa exceeded'
        });

    });

    it('deve retornar um BadRequestError com a mensagem: Alternativa already exists', async () => {

        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([alternativaMock]);

        await expect(alternativasService.saveAlternativa(new AlternativasDTO(alternativaMock))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Alternativa already exists'
        });

    });
});

describe('testando a função saveManyAlternativas', () => {
    const alternativasMockList = [
        alternativaMock,
        alternativaMock,
        alternativaMock,
        alternativaMock,
        alternativaMock,
        alternativaMock,
    ];

    it('deve criar varias alternativas e retornar uma lista de AlternativasDTO', async () => {

        const createAlternativaMock = jest.fn();

        createAlternativaMock.mockResolvedValueOnce(alternativaMock);
        createAlternativaMock.mockResolvedValueOnce(alternativaMock02);
        alternativasRepository.createAlternativa = createAlternativaMock;

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(perguntaMock);
        
        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([]);

        const newAlternativasList = await alternativasService.saveManyAlternativas(new AllAlternativasDTO([alternativaMock, alternativaMock02]));

        expect(newAlternativasList[0]).toEqual(alternativaMock);
        expect(newAlternativasList[1]).toEqual(alternativaMock02);
        expect(newAlternativasList).toHaveLength(2);
        expect(alternativasRepository.createAlternativa).toHaveBeenCalledTimes(2);
        expect(newAlternativasList.every( alternativa => alternativa instanceof AlternativasDTO)).toBeTruthy();
    });

    it('deve retornar um NotFoundError com a mensagem: Pergunta not found', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(null);

        await expect(alternativasService.saveManyAlternativas(new AllAlternativasDTO([alternativaMock, alternativaMock02]))).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Pergunta not found'
        });
    });

    it('deve retornar um BadRequestError com a mensagem: The limit of alternatives must be greater than 2 and less than 5', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValue(perguntaMock);

        await expect(alternativasService.saveManyAlternativas(new AllAlternativasDTO(alternativasMockList))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'The limit of alternatives must be greater than 2 and less than 5'
        });

        await expect(alternativasService.saveManyAlternativas(new AllAlternativasDTO([alternativaMock]))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'The limit of alternatives must be greater than 2 and less than 5'
        });
    });

    it('deve retornar um BadRequestError com a mensagem: the alternatives cannot be the same', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValue(perguntaMock);

        await expect(alternativasService.saveManyAlternativas(new AllAlternativasDTO([alternativaMock, alternativaMock]))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'the alternatives cannot be the same'
        });

    });
});

describe('testando a função getAllAlternativasByPerguntaId', () => {

    it('deve retornar uma lista de AlternativasDTO', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(perguntaMock);
        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([alternativaMock]);

        const alternativaList = await alternativasService.getAllAlternativasByPerguntaId(3);

        expect(alternativaList).toHaveLength(1);
        expect(alternativaList[0]).toEqual(alternativaMock);
        expect(alternativaList.every(alternativa => alternativa instanceof AlternativasDTO)).toBeTruthy();
    });

    it('deve retornar um NotFoundError com a mensagem: Pergunta not found', async () => {

        perguntasRepository.getPerguntaById = jest.fn().mockResolvedValueOnce(null);

        await expect(alternativasService.getAllAlternativasByPerguntaId(3)).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Pergunta not found'
        });
    });
});

describe('testando a função updateAlternativa', () => {

    it('deve retornar uma instancia de AlternativasDTO alterada', async () => {

        alternativasRepository.getAlternativaById = jest.fn().mockResolvedValueOnce(alternativaMock);

        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([ alternativaMock02]);

        alternativaMock.resposta = 'blablabla';
        alternativasRepository.updateAlternativa = jest.fn().mockResolvedValueOnce(alternativaMock);

        const upedatedAlternativa = await alternativasService.updateAlternativa(4, new AlternativasDTO(alternativaMock));
        
        expect(upedatedAlternativa).toBeInstanceOf(AlternativasDTO);
        expect(upedatedAlternativa).toEqual(alternativaMock);
    });

    it('deve retornar um NotFoundError com a mensagem: Alternativa not found', async () => {

        alternativasRepository.getAlternativaById = jest.fn().mockResolvedValueOnce(null);

        await expect(alternativasService.updateAlternativa(2, new AlternativasDTO(alternativaMock))).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Alternativa not found'
        });
    });

    it('deve retornar um BadRequestError com a mensagem: Alternativa already exists', async () => {

        alternativasRepository.getAlternativaById = jest.fn().mockResolvedValueOnce(alternativaMock);

        alternativaMock02.resposta = 'string';
        alternativasRepository.gatAllAternativasByPerguntaId = jest.fn().mockResolvedValueOnce([alternativaMock, alternativaMock02]);

        await expect(alternativasService.updateAlternativa(2, new AlternativasDTO(alternativaMock))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Alternativa already exists'
        });
    });
});
