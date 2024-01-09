import { Request, Response } from 'express';
import { usuarioService } from '../service/containerConfig';
import { UsuarioDTO } from '../model/UsuariosDTO';


export class UsuariosController {

  async getUsuarioById(req: Request, res: Response) {

    try {

      const id = parseInt(req.params.id);

      const usuario = await usuarioService.getUsuarioById(id);

      return res.status(200).json(usuario);

    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAllUsuarios(req: Request, res: Response) {

    const usuarios = await usuarioService.getAllUsuarios();

    return res.status(200).json(usuarios);
  }

  async postUsuario(req: Request, res: Response) {

    const usuarioRequest = req.body;

    const usuarioResponse = await usuarioService.saveUsuario(new UsuarioDTO(usuarioRequest));



    return res.status(201).json(usuarioResponse);
  }

  async putUsuario(req: Request, res: Response) {

    try {

      const id = parseInt(req.params.id);
      const usuarioRequest = req.body;

      const updatedUsuarioResponse = await usuarioService.alterUsuario(id, new UsuarioDTO(usuarioRequest));

      return res.status(200).json(updatedUsuarioResponse);

    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

  }
}