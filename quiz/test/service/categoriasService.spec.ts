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

describe('testando a função getAllCategorias', () => {

    it('deve retornar uma lista de CategoriasDTO', async () => {

        categoriasRepository.getAllCategorias = jest.fn().mockResolvedValueOnce([categoriaMock]);

        const categoriasList = await categoriasService.getAllCategorias();

        expect(categoriasList).toEqual([categoriaMock]);
        expect(categoriasList[0]).toBeInstanceOf(CategoriasDTO);
        expect(categoriasList).toHaveLength(1);
    });

    it('deve retornar uma lista vazia', async () => {

        categoriasRepository.getAllCategorias = jest.fn().mockResolvedValueOnce([]);

        const categoriasList = await categoriasService.getAllCategorias();

        expect(categoriasList).toEqual([]);
        expect(categoriasList[0]).not.toBeInstanceOf(CategoriasDTO);
        expect(categoriasList).toHaveLength(0);
    });
});

describe('testando a função alterStatusCategoria', () => {
    it('deve retornar uma instancia de CategoriasDTO com o status alterado', async () => {

        categoriasRepository.getCategoriaId = jest.fn().mockResolvedValueOnce(categoriaMock);

        categoriaMock.status = !categoriaMock.status;
        categoriasRepository.updateCategoria = jest.fn().mockResolvedValueOnce(categoriaMock);

        const updatedCategoria = await categoriasService.alterCategoria(2, new CategoriasDTO(categoriaMock));
        
        expect(updatedCategoria).toBeInstanceOf(CategoriasDTO);
        expect(updatedCategoria.getStatus()).not.toEqual(!categoriaMock.status);
        expect(updatedCategoria).toEqual(categoriaMock);

    });

    it('deve retornar um NotFoundError', () => {

        categoriasRepository.getCategoriaId = jest.fn().mockResolvedValueOnce(null);

        expect(async () => {
            await categoriasService.alterCategoria(2, new CategoriasDTO(categoriaMock));
        }).rejects.toThrow(NotFoundError);

    });
});

describe('testando a função alterCategoria', () => {

    it('deve retornar uma instancia de CategoriasDTO alterada', async () => {

        categoriasRepository.getCategoriaId = jest.fn().mockResolvedValueOnce(categoriaMock);
        categoriasRepository.getCategoria = jest.fn().mockResolvedValueOnce(null);

        categoriaMock.descricao = 'TDD';
        categoriasRepository.updateCategoria = jest.fn().mockResolvedValueOnce(categoriaMock);

        const upedatedcategoria = await categoriasService.alterCategoria(3, new CategoriasDTO(categoriaMock));

        expect(upedatedcategoria).toBeInstanceOf(CategoriasDTO);
        expect(upedatedcategoria.getDescricao()).toEqual(categoriaMock.descricao);

    });

    it('deve retornar um NotFoundError', () => {

        categoriasRepository.getCategoriaId = jest.fn().mockResolvedValueOnce(null);

        expect(async () => {
            await categoriasService.alterCategoria(4, new CategoriasDTO(categoriaMock));
        }).rejects.toThrow(NotFoundError);
    });

    it('deve retornar um BadRequestError', () => {

        categoriasRepository.getCategoriaId = jest.fn().mockResolvedValueOnce(categoriaMock);

        categoriasRepository.getCategoria = jest.fn().mockResolvedValueOnce(categoriaMock);

        expect(async () => {
            await categoriasService.alterCategoria(4, new CategoriasDTO(categoriaMock));
        }).rejects.toThrow(BadRequestError);
    });

    
});