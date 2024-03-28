
import { BadRequestError } from '../../src/exception/BadRequestError';
import { NotFoundError } from '../../src/exception/NotFoundError';
import { CampusDTO } from '../../src/model/CampusDTO';
import campusRepository from '../../src/repository/campusRepository';
import usuariosRepository from '../../src/repository/usuariosRepository';
import { CampusService } from '../../src/service/CampusService';

const campusMock = {
    id: 1,
    curso: 'Veterinaria',
    turma: '4C',
    periodo: 6,
    nome: 'Laura',
    usuariosid: 2
};

const campusService = new CampusService();

describe('testando função getCampusByUserId', () => {

    it('deve retorne um campusDTO', async () => {
        
        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(campusMock);

        const result = await campusService.getCampusByUserId(1);
        
        expect(result).toBeInstanceOf(CampusDTO);
        expect(result).toEqual(campusMock);
    });

    it('deve retornar um NotFoundError com a mensagem: Campus nao encontrado', async () => {

        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(null);

        await expect(campusService.getCampusByUserId(1)).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Campus nao encontrado'
        });

    });

});

describe('testando a função getAllCampusByUserId', () => {
    it('deve retornar uma lista de campusDTO', async () => {

        campusRepository.getAllCampusByUserId = jest.fn().mockResolvedValueOnce([campusMock, campusMock]);

        const campusList = await campusService.getAllCampusByUserId(3);

        expect(campusList).toEqual([campusMock, campusMock]);
        expect(campusList[0]).toBeInstanceOf(CampusDTO);
        expect(campusList).toHaveLength(2);
    });

    it('deve retornar uma lista vazia', async () => {

        campusRepository.getAllCampusByUserId = jest.fn().mockResolvedValueOnce([]);

        const campusList = await campusService.getAllCampusByUserId(3);

        expect(campusList).toEqual([]);
        expect(campusList[0]).not.toBeInstanceOf(CampusDTO);
        expect(campusList).toHaveLength(0);
    });


});

describe('testando a função createCampus', () => {
    
    const campusMock02 = {
        id: 1,
        curso: 'Medicina',
        turma: '3A',
        periodo: 3,
        nome: 'Admilson',
        usuariosid: 9
    };

    const user = {
        id: 1,
        nome: 'string',
        email: 'string',
        senha: 'string',
        telefone: 'string',
        sexo: 2,
        datanascimento: '28/02/2003',
        role: 4,
        uf: 'string',
        campus: 3,
        foto: 'string',
        pontuacao: 67,
        status: true,
    };

    it('deve criar um novo campus e retornar uma instancia de CampusDTO', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(user);

        campusRepository.getAllCampusByUserId = jest.fn().mockResolvedValueOnce([campusMock]);

        campusRepository.createCampus = jest.fn().mockResolvedValueOnce(campusMock02);

        const createdCampus = await campusService.createCampus(new CampusDTO(campusMock02));

        expect(createdCampus).toBeInstanceOf(CampusDTO);
        expect(createdCampus).toEqual(campusMock02);

    });

    it('deve retornar um NotFoundError com a mensagem: Usuarios nao encontrados', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(null);

        await expect(campusService.createCampus(new CampusDTO(campusMock02))).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Usuarios nao encontrados' 
        });

    });

    it('deve retornar um BadRequestError com a mensagem: Campus ja existe', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(user);

        campusRepository.getAllCampusByUserId = jest.fn().mockResolvedValueOnce([campusMock, campusMock02]);

        await expect(campusService.createCampus(new CampusDTO(campusMock02))
        ).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Campus ja existe'
        });

    });
});

describe('testando a função updatedCampus', () => {

    it('deve retornar uma instancia de CampusDTO alterada', async () => {

        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(campusMock);
        
        campusRepository.getAllCampusByUserId = jest.fn().mockResolvedValueOnce([]);
        
        campusMock.curso = 'Odonto';
        campusRepository.putCampus = jest.fn().mockResolvedValueOnce(campusMock);

        const updatedCampus = await campusService.updatedCampus(1, new CampusDTO(campusMock));

        expect(updatedCampus).toBeInstanceOf(CampusDTO);
        expect(updatedCampus).toEqual(campusMock);

    });

    it('deve retornar um NotFoundError com a mensagem: Campus nao encontrado', async () => {

        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(null);
        
        await expect(campusService.updatedCampus(2, new CampusDTO(campusMock))).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Campus nao encontrado'
        });
    });

    it('deve retornar um BadRequestError com a mensagem: Campus ja existe', async () => {

        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(campusMock);

        campusRepository.getAllCampusByUserId = jest.fn().mockResolvedValueOnce([campusMock]);
        
        await expect(campusService.updatedCampus(2, new CampusDTO(campusMock))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Campus ja existe'
        });
    });
});

describe('testando a função deleteCampus', () => {

    it('deve retornar um NotFoundError com a mensagem: Campus nao encontrado', async () => {

        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(null);

        await expect(campusService.deleteCampus(4)).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Campus nao encontrado'
        });
    });

    it('deve executar uma vez a função campusRepository.deleteCampus', async () => {
        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(campusMock);

        campusRepository.deleteCampus = jest.fn();

        await campusService.deleteCampus(7);

        expect(campusRepository.deleteCampus).toHaveBeenCalled();
        expect(campusRepository.deleteCampus).toHaveBeenCalledTimes(1);
    });

    it('não deve retornar uma exceção', async () => {
        campusRepository.getCampusByUserId = jest.fn().mockResolvedValueOnce(campusMock);

        campusRepository.deleteCampus = jest.fn();

        expect(async () => await campusService.deleteCampus(7)).not.toThrow();
    });
});
