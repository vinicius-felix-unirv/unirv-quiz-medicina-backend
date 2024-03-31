import { BadRequestError } from '../../src/exception/BadRequestError';
import { NotFoundError } from '../../src/exception/NotFoundError';
import { UsuarioDTO } from '../../src/model/UsuariosDTO';
import usuariosRepository from '../../src/repository/usuariosRepository';
import { UsuarioService } from '../../src/service/UsuariosService';

const user = {
    id: 1,
    nome: 'string',
    email: 'string',
    senha: 'string',
    telefone: 'string',
    sexo: 2,
    datanascimento: new Date('2024-03-28'),
    role: 4,
    uf: 'string',
    foto: 'string',
    pontuacao: 67,
    status: true,
};

const usuarioService = new UsuarioService();

describe('testando a função getUsuarioById', () =>{

    it('deve retornar uma instancia de UsuarioDTO', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(user);

        const userById = await usuarioService.getUsuarioById(3);

        expect(userById).toEqual(user);
        expect(userById).toBeInstanceOf(UsuarioDTO);
    });

    it('deve retornar um NotFoundError com a mensagem: Usuario nao encontrado', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(null);

        await expect(usuarioService.getUsuarioById(3)).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Usuario nao encontrado'
        });

    });
});

describe('testando a função getAllUsuarios', () => {

    it('deve retornar uma lista de instancias de UsuarioDTO', async () => {

        usuariosRepository.getAllUsuarios = jest.fn().mockResolvedValueOnce([user]);

        const userList = await usuarioService.getAllUsuarios();

        expect(userList).toHaveLength(1);
        expect(userList.every(user => user instanceof UsuarioDTO)).toBeTruthy();
    });
});

describe('testando a função saveUsuario', () => {

    it('deve criar um usuario e retornar uma instancia de UsuarioDTO', async () => {

        usuariosRepository.getUsuarioByEmail = jest.fn().mockResolvedValueOnce(null);
        usuariosRepository.createUsuario = jest.fn().mockResolvedValueOnce(user);

        const newUser = await usuarioService.saveUsuario(new UsuarioDTO(user));

        expect(newUser).toBeInstanceOf(UsuarioDTO);
        expect(newUser).toEqual(user);
    });

    it('deve retornar um BadRequestError com a mensagem: Usuario ja existe', async () => {

        usuariosRepository.getUsuarioByEmail = jest.fn().mockResolvedValueOnce(user);

        await expect(usuarioService.saveUsuario(new UsuarioDTO(user))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Usuario ja existe'
        });

    });
});

describe('testando a função alterUsuario', () => {

    it('deve retornar uma instancia de UsuarioDTO alterada', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(user);

        usuariosRepository.getUsuarioByEmail = jest.fn().mockResolvedValueOnce(null);

        usuariosRepository.updateusuario = jest.fn().mockResolvedValueOnce(user);

        const newUser = await usuarioService.alterUsuario(2, new UsuarioDTO(user));

        expect(newUser).toBeInstanceOf(UsuarioDTO);
        expect(newUser).toEqual(user);
    });

    it('deve retornar um NotFoundError com a mensagem: Usuario nao encontrado', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(null);

        await expect(usuarioService.alterUsuario(3, new UsuarioDTO(user))).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Usuario nao encontrado'
        });
    });

    it('deve retornar um BadRequestError com a mensagem: Usuario ja existe', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(user);

        usuariosRepository.getUsuarioByEmail = jest.fn().mockResolvedValueOnce([user]);

        await expect(usuarioService.alterUsuario(3, new UsuarioDTO(user))).rejects.toMatchObject({
            constructor: BadRequestError,
            message: 'Usuario ja existe'
        });
    });
});

describe('testando a função alterPassword', () => {

    

    it('deve retornar um NotFoundError com a mensagem: Usuario nao encontrado', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(null);

        await expect(usuarioService.alterPassword(2, 'ueueueu')).rejects.toMatchObject({
            constructor: NotFoundError,
            message: 'Usuario nao encontrado'
        });
        
    });

    it('deve executar a função usuariosRepository.updateSenhaUsuario apenas uma vez', async () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(user);
        usuariosRepository.updateSenhaUsuario = jest.fn().mockImplementation(() => {
            console.log('updateSenhaUsuario foi chamado');
        });

        await usuarioService.alterPassword(2, 'ueueueu');

        expect(usuariosRepository.updateSenhaUsuario).toHaveBeenCalled();
        expect(usuariosRepository.updateSenhaUsuario).toHaveBeenCalledTimes(1);

    });

    it('não deve retornar uma exceção', () => {

        usuariosRepository.getUsuarioById = jest.fn().mockResolvedValueOnce(user);
        usuariosRepository.updateSenhaUsuario = jest.fn();

        expect(async () => await usuarioService.alterPassword(2, 'ueueueu')).not.toThrow();

    });

    
});