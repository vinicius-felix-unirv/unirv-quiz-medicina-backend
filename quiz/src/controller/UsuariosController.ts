import { Request, Response } from 'express';
import { usuarioService } from '../service/containerConfig';
import { UsuarioDTO } from '../model/UsuariosDTO';


export class UsuariosController {

  async getUsuarioById(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);

    const usuario = await usuarioService.getUsuarioById(id);

    return res.status(200).json(usuario);
  
  }

  async getAllUsuarios(req: Request, res: Response): Promise<Response> {

    const usuarios = await usuarioService.getAllUsuarios();

    return res.status(200).json(usuarios);
  }

  async postUsuario(req: Request, res: Response): Promise<Response> {

    const usuarioRequest = req.body;

    const usuarioResponse = await usuarioService.saveUsuario(new UsuarioDTO(usuarioRequest));

    return res.status(201).json(usuarioResponse);
  }

  async putUsuario(req: Request, res: Response): Promise<Response> {
    
    const id = parseInt(req.params.id);
    const usuarioRequest = req.body;

    const updatedUsuarioResponse = await usuarioService.alterUsuario(id, new UsuarioDTO(usuarioRequest));

    return res.status(200).json(updatedUsuarioResponse);

  }

  async putSenha(req: Request, res: Response): Promise<Response> {

    const userId = parseInt(req.params.id);
    const {senha} = req.body;

    await usuarioService.alterPassword(userId, senha);

    return res.status(200).json({message: 'success'});
  }

  async putPontuacao(req: Request, res: Response): Promise<Response> {

    const userId = parseInt(req.params.id);
    const pontuacao = req.body.pontuacao;

    const user = await usuarioService.addPontuacao(userId, pontuacao);

    return res.status(200).json(user);
  }
}