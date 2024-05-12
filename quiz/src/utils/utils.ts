export class UtilsHelp {

  static retornaAutorizacao(role: number): AuthorizationByRole[] {

    const authorization: { [key: number]: AuthorizationByRole[] } = {
      3: [{ method: ['GET'], url: ['/campus'] }],
    };

    return authorization[role];
  }

}

export interface AuthorizationByRole {
  method: string[];
  url: string[];
}
