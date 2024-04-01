import { BadRequestError } from '../../src/exception/BadRequestError';
import { NotFoundError } from '../../src/exception/NotFoundError';
import { PerguntasNivelDTO } from '../../src/model/PerguntasNivelDTO';
import perguntasNivelRepository from '../../src/repository/perguntasNivelRepository';
import { PerguntasNivelService } from '../../src/service/PerguntasNivelService';

const perguntaNivelService = new PerguntasNivelService;

const perguntaNivelMock = {
    id: 2,
    nivel:4,
    pontuacao: 55,
    tempo: 34
};

describe('testando a função createPerguntNivel', () => {

    it('deve criar e retornar uma instancia de PerguntaNivelDTO', async () => {

        perguntasNivelRepository.getPerguntasNivelByNivel = jest.fn().mockResolvedValueOnce(null);
        perguntasNivelRepository.createPerguntasNivel = jest.fn().mockResolvedValueOnce(perguntaNivelMock);

        const perguntaNivel = await perguntaNivelService.createPerguntNivel(new PerguntasNivelDTO(perguntaNivelMock));

        expect(perguntaNivel).toBeInstanceOf(PerguntasNivelDTO);
        expect(perguntaNivel).toEqual(perguntaNivelMock);
    });

    it('deve criar e retornar um BadRequestError com a mensagem: Esse nivel ja existe', async () => {

        perguntasNivelRepository.getPerguntasNivelByNivel = jest.fn().mockResolvedValueOnce(perguntaNivelMock);
        
        await expect(perguntaNivelService.createPerguntNivel(new PerguntasNivelDTO(perguntaNivelMock))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Esse nivel ja existe'
        });

    });
});

describe('testando a função getPerguntasNivelById', () => {

    it('deve retornar uma instancia de PerguntaNivelDTO', async () => {

        perguntasNivelRepository.getPerguntasNivelById = jest.fn().mockResolvedValueOnce(perguntaNivelMock);

        const perguntaNivel = await perguntaNivelService.getPerguntasNivelById(9);

        expect(perguntaNivel).toBeInstanceOf(PerguntasNivelDTO);
        expect(perguntaNivel).toEqual(perguntaNivelMock);
    });

    it('deve retornar um NotFoundError com a mensagem: Nivel nao encontrado', async () => {

        perguntasNivelRepository.getPerguntasNivelByNivel = jest.fn().mockResolvedValueOnce(null);
        
        await expect(perguntaNivelService.getPerguntasNivelById(4)).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Nivel nao encontrado'
        });

    });
});

describe('testando a função getAllPerguntasNivel', () => {

    it('deve retornar uma lista de instancias de PerguntaNivelDTO', async () => {

        perguntasNivelRepository.getAllPerguntasNivel = jest.fn().mockResolvedValueOnce([perguntaNivelMock]);

        const perguntaNivel = await perguntaNivelService.getAllPerguntasNivel();

        expect(perguntaNivel.every(nivel => nivel instanceof PerguntasNivelDTO)).toBeTruthy();
        expect(perguntaNivel[0]).toEqual(perguntaNivelMock);
    });

});

describe('testando a função updatePerguntasNivel', () => {

    it('deve retornar uma instancia de PerguntaNivelDTO', async () => {

        perguntasNivelRepository.getPerguntasNivelById = jest.fn().mockResolvedValueOnce(perguntaNivelMock);
        perguntasNivelRepository.getPerguntasNivelByNivel = jest.fn().mockResolvedValueOnce(null);
        perguntasNivelRepository.alterPerguntasNivel = jest.fn().mockResolvedValueOnce(perguntaNivelMock);

        const perguntaNivel = await perguntaNivelService.updatePerguntasNivel(3, new PerguntasNivelDTO(perguntaNivelMock));

        expect(perguntaNivel).toBeInstanceOf(PerguntasNivelDTO);
        expect(perguntaNivel).toEqual(perguntaNivelMock);
    });

    it('deve retornar um NotFoundError com a mensagem: Nivel nao encontrado', async () => {

        perguntasNivelRepository.getPerguntasNivelById = jest.fn().mockResolvedValueOnce(null);
        
        await expect(perguntaNivelService.updatePerguntasNivel(4, new PerguntasNivelDTO(perguntaNivelMock))).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Nivel nao encontrado'
        });

    });

    it('deve retornar um BadRequestError com a mensagem: Nivel ja existe', async () => {

        perguntasNivelRepository.getPerguntasNivelById = jest.fn().mockResolvedValueOnce(perguntaNivelMock);
        perguntasNivelRepository.getPerguntasNivelByNivel = jest.fn().mockResolvedValueOnce(perguntaNivelMock);
        
        await expect(perguntaNivelService.updatePerguntasNivel(4, new PerguntasNivelDTO(perguntaNivelMock))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Nivel ja existe'
        });

    });

});

describe('testando a função deletePerguntasNivel', () => {

    it('a função perguntasNivelRepository.deletePerguntasNivedeve deve ser executada apenas 1 vez', async () => {

        perguntasNivelRepository.getPerguntasNivelById = jest.fn().mockResolvedValueOnce(perguntaNivelMock);
        perguntasNivelRepository.deletePerguntasNivel = jest.fn();

        await perguntaNivelService.deletePerguntasNivel(3);

        expect(perguntasNivelRepository.deletePerguntasNivel).toHaveBeenCalled();
        expect(perguntasNivelRepository.deletePerguntasNivel).toHaveBeenCalledTimes(1);
    });

    it('não deve retornar uma exceção', () => {

        perguntasNivelRepository.getPerguntasNivelById = jest.fn().mockResolvedValueOnce(perguntaNivelMock);
        perguntasNivelRepository.deletePerguntasNivel = jest.fn();

        expect(async () => await perguntaNivelService.deletePerguntasNivel(3)).not.toThrow();
    });

    
    it('deve retornar um NotFoundError com a mensagem: Nivel nao encontrado', async () => {

        perguntasNivelRepository.getPerguntasNivelById = jest.fn().mockResolvedValueOnce(null);
        
        await expect(perguntaNivelService.deletePerguntasNivel(4)).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Nivel nao encontrado'
        });

    });

});