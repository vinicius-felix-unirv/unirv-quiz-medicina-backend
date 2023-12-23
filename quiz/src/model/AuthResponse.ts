import { usuarios } from '@prisma/client';

export interface IAuthResponse {
    token: string;
}

export class AuthResponseDTO {

    token!: string;

    constructor(userDTO: usuarios, _token: string) {
        this.token = _token;
    }
}