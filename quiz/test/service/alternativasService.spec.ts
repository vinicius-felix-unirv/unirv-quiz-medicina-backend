import { BadRequestError } from '../../src/exception/BadRequestError';
import { AllAlternativasDTO, AlternativasDTO } from '../../src/model/AlternativasDTO';
import alternativasRepository from '../../src/repository/alternativasRepository';
import { AlternativasService } from '../../src/service/AlternativasService';

jest.mock('../../src/repository/alternativasRepository');

const alternativasService = new AlternativasService();
const alternativaMock = {
    id: 3,
    perguntasid: 2,
    resposta: 'string',
    pathimage: 'string',
    correta: false,
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

