
# Routes

* [Usuarios](#usuarios)
* [Campus](#campus)
* [Quiz](#quiz)
* [Perguntas](#perguntas)
* [Progresso Perguntas](#progresso-perguntas)
* [Perguntas Nivel](#perguntas-nivel)
* [Categorias](#categorias)
* [Alternativas](#alternativas)
* [Cursos](#cursos)
* [Email](#email)
* [Authentication](#authentication)


## Usuarios

* ### GET   /usuarios/:id
   Para fazer uma chama a esse endpoint é necessário o 'id' do usuario e estar autenticado

   Exemplo:

            GET http://localhost:3000/usuarios/67

   Response:
   ```json
    {
        "id": 67,
        "nome": "Juliscleydi",
        "email": "hablaaabb@hotmail.com",
        "senha": "$2a$10$q5zZ3x.7N4zr6.duNOhqNuuBjOl23E2Wq/ua5RDXgMF48Nl707Pm2",
        "telefone": "string",
        "sexo": 1,
        "datanascimento": "2013-02-14T00:00:00.000Z",
        "role": 2,
        "uf": "go",
        "foto": "string",
        "pontuacao": 0,
        "status": true,
        "cidade": "americana"
    }
   ```
* ### GET   /cursos/:id/usuarios/:skip/:take
* ### GET   /cursos/:id/usuarios/ranking
* ### POST  /usuarios-campus
* ### POST  /usuarios
* ### PUT   /usuarios/:id
* ### PUT   /usuarios/:id/pontuacao
* ### PUT   /usuarios/:id/trocar-senha

 ## Campus

* ### GET /usuarios/:id/campus
* ### GET    /campus/:id
* ### PUT    /campus/:id
* ### POST   /campus
* ### DELETE /campus/:id

 ## Quiz

* ### GET /quiz/:id
* ### GET /curso/:id/quiz/:skip/:take
* ### GET /quiz/:skip/:take
* ### POST /quiz
* ### PUT /quiz/:id

 ## Perguntas

* ### GET  /perguntas/:id
* ### GET  /usuarios/:usuariosid/quiz/:id/perguntas/:skip/:take
* ### POST /perguntas
* ### PUT  /perguntas/:id
* ### PUT  /perguntas/status/:id

 ## Alternativas 

* ### GET    /perguntas/:id/alternativas
* ### POST   /alternativas
* ### POST   /alternativas/many
* ### PUT    /alternativas/:id
* ### DELETE /alternativas/:id

 ## Categorias

* ### GET  /categorias/:id
* ### GET  /curso/:id/categorias
* ### POST /categorias
* ### PUT  /categorias/:id
* ### PUT  /categorias/:id/status

 ## Perguntas-Nivel

* ### GET    /niveis/:id
* ### GET    /niveis
* ### POST   /niveis
* ### PUT    /niveis/:id
* ### DELETE /niveis/:id

 ## Progresso-Perguntas

* ### GET  /usuarios/:id/progresso-perguntas
* ### POST /progresso-perguntas
* ### POST /progresso-perguntas/many

 ## Curso

* ### GET /cursos

 ## Email

* ### POST /send-email

 ## Authentication

* ### POST /authentication

```json
{
    "name": "Pedro"
}
```