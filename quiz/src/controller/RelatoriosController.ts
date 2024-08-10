
import { Request, Response } from 'express';

import relatoriosRepository from '../repository/relatoriosRepository';

export class RelatoriosController{

    async getRelatorio(req: Request, res: Response): Promise<Response>{

        const relatorio = await relatoriosRepository.getRealatorio();

        return res.status(200).json(relatorio);
    }
}