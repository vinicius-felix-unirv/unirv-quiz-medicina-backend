import { BadRequestError } from '../../src/exception/BadRequestError';
import { NotFoundError } from '../../src/exception/NotFoundError';
import { CategoriasDTO } from '../../src/model/CategoriasDTO';
import categoriasRepository from '../../src/repository/categoriasRepository';
import { CategoriasService } from '../../src/service/CategoriasService';

jest.mock('../../src/repository/categoriasRepository');

const categoriasService = new CategoriasService();

const categoriaMock = {
    id: 3,
    descricao: 'string',
    status: true,
};

describe('testando a função saveCategoria', () => {

    it('deve criar uma categoria e retornar uma instancia de categoriasDTO', async () => {

        categoriasRepository.getCategoria = jest.fn().mockResolvedValueOnce(null);
        categoriasRepository.createCategoria = jest.fn().mockResolvedValueOnce(categoriaMock);

        const newCategoria = await categoriasService.saveCategoria(new CategoriasDTO(categoriaMock));

        expect(newCategoria).toBeInstanceOf(CategoriasDTO);
        expect(newCategoria).toEqual(categoriaMock);
    });

    it('deve retornar um BadRequestError', () => {

        categoriasRepository.getCategoria = jest.fn().mockResolvedValueOnce(categoriaMock);
        categoriasRepository.createCategoria = jest.fn().mockResolvedValueOnce(categoriaMock);

        expect(async () => {
            await categoriasService.saveCategoria(new CategoriasDTO(categoriaMock));
        }).rejects.toThrow(BadRequestError);
    });
});

describe('testando a função getCategoriaId', () => {

    it('deve retornar uma intancia de CategoriasDTO', async () => {

        categoriasRepository.getCategoriaId = jest.fn().mockResolvedValueOnce(categoriaMock);

        const newCategoria = await categoriasService.getCategoriaId(3);

        expect(newCategoria).toBeInstanceOf(CategoriasDTO);
        expect(newCategoria).toEqual(categoriaMock);
        
    });

    it('deve retornar um NotFoundError',  () => {

        categoriasRepository.getCategoriaId = jest.fn().mockResolvedValueOnce(null);

        expect(async () => {
            await categoriasService.getCategoriaId(3);
        }).rejects.toThrow(NotFoundError);
        
    });

});

