import { BadRequestError } from '../../src/exception/BadRequestError';
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


