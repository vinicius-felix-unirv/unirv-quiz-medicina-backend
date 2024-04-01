import { Request, Response } from 'express';
import { categoriasService } from '../service/containerConfig';
import { CategoriasDTO } from '../model/CategoriasDTO';

export class CategoriasController {

  async postCategoria(req:Request, res: Response): Promise<Response> {

    const body = req.body;

    const createdCategoria = await categoriasService.saveCategoria(new CategoriasDTO(body));

    return res.status(201).json(createdCategoria);

  }

  async putCategoria(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);
    const body = req.body;

    const updatedCategoria = await categoriasService.alterCategoria(id, new CategoriasDTO(body));

    return res.status(200).json(updatedCategoria);

  }

  async putStatusCategoria(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);

    const updatedCategoria = await categoriasService.alterStatusCategoria(id);

    return res.status(200).json(updatedCategoria);

  }

  async getAllCategorias(req: Request, res: Response): Promise<Response> {

    const categoriasDTOs = await categoriasService.getAllCategorias();

    return res.status(200).json(categoriasDTOs);
  }

  async getCategoriaId(req: Request, res: Response): Promise<Response> {

    const id = parseInt(req.params.id);

    const categoria = await categoriasService.getCategoriaId(id);

    return res.status(200).json(categoria);
  }

  async getAllCategoriaByCursoId(req: Request, res: Response): Promise<Response> { 

    const cursoId = parseInt(req.params.cursoid);

    const allCategoriasByCurso = await categoriasService.getAllCategoriasByCursoId(cursoId);

    return res.status(200).json(allCategoriasByCurso);
  }
}