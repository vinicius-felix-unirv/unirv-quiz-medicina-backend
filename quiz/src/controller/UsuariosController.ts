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

    const skip = parseInt(req.params.skip);
    const take = parseInt(req.params.take);
    const cursoId = parseInt(req.params.id);

    const usuarios = await usuarioService.getAllUsuariosByCursoId(skip, take, cursoId);

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

  async getRankingByCursoId(req: Request, res: Response): Promise<Response> {

    const cursoId = parseInt(req.params.id);

    const ranking = await usuarioService.getRankingByCursoId(cursoId);

    return res.status(200).json(ranking);
  }
}