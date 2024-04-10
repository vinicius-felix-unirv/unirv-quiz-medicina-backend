
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

* ### GET /usuarios/:id
   Para fazer uma chamada a esse endpoint é necessário passar o 'id' do usuário e estar autenticado.

   Exemplo:

            GET http://localhost:3000/usuarios/67

   Response:
   
   Esse endpoint devolve um usuário.
   ```json
    {
        "id": 66,
        "nome": "Julia",
        "email": "julia@hotmail.com",
        "senha": "$2a$10$YYeHpUoLNoqzmtTRDRGTSeLXDkZrTAwUS6XWk84WXL/W06zpCnFpO",
        "telefone": "string",
        "sexo": 2,
        "datanascimento": "2013-02-14T00:00:00.000Z",
        "role": 1,
        "uf": "go",
        "foto": "string",
        "pontuacao": 10,
        "status": true,
        "cidade": "Americana"
    }
   ```
* ### GET /cursos/:id/usuarios/:skip/:take

   Para fazer uma chamada a esse endpoint é necessário passar o 'id' do curso e o valor do skip e take e estar autenticado.

   Exemplo:

            GET http://localhost:3000/cursos/2/usuarios/0/2

    Response: 

    Esse endpoint retorna vários usuários que pertencem a um curso específico de forma paginada, podendo alterar a quantidade por página através do parâmetro ':skip' e ':take'.

   ```json
   [
        {
            "id": 66,
            "nome": "Julia",
            "email": "julia@hotmail.com",
            "senha": "$2a$10$YYeHpUoLNoqzmtTRDRGTSeLXDkZrTAwUS6XWk84WXL/W06zpCnFpO",
            "telefone": "string",
            "sexo": 2,
            "datanascimento": "2013-02-14T00:00:00.000Z",
            "role": 1,
            "uf": "go",
            "foto": "string",
            "pontuacao": 10,
            "status": true,
            "cidade": "Americana"
        },
        {
            "id": 68,
            "nome": "Bruno",
            "email": "bruninho@hotmail.com",
            "senha": "$2a$10$73UqdO/SSFBqmL3t4Bj6R.NfkQay4TX2zN7Hc1H/n3xGGfSYJo7JK",
            "telefone": "string",
            "sexo": 1,
            "datanascimento": "2013-02-14T00:00:00.000Z",
            "role": 2,
            "uf": "go",
            "foto": "string",
            "pontuacao": 120,
            "status": true,
            "cidade": "Americana"
        }
    ]
   ```

* ### GET /cursos/:id/usuarios/ranking

   Para fazer uma chamada a esse endpoint é necessário passar o 'id' do curso e estar autenticado.

   Exemplo:

        GET http://localhost:3000/cursos/2/usuarios/ranking

   Response:

   Esse endpoint retorna os 10 usuários com a maior pontuação em ordem decrescente.
   
   'Observação': ainda falta refatorar a logica da pontuação para validar os pontos do usuário com um curso especifico.

   ```json
    [
        {
            "id": 68,
            "nome": "Juliscleydi",
            "email": "vaitojen@hotmail.com",
            "senha": "$2a$10$73UqdO/SSFBqmL3t4Bj6R.NfkQay4TX2zN7Hc1H/n3xGGfSYJo7JK",
            "telefone": "string",
            "sexo": 1,
            "datanascimento": "2013-02-14T00:00:00.000Z",
            "role": 2,
            "uf": "go",
            "foto": "string",
            "pontuacao": 246,
            "status": true,
            "cidade": "Americana"
        },
        {
            "id": 66,
            "nome": "Juliscleydi",
            "email": "hehehe@hotmail.com",
            "senha": "$2a$10$YYeHpUoLNoqzmtTRDRGTSeLXDkZrTAwUS6XWk84WXL/W06zpCnFpO",
            "telefone": "string",
            "sexo": 1,
            "datanascimento": "2013-02-14T00:00:00.000Z",
            "role": 1,
            "uf": "go",
            "foto": "string",
            "pontuacao": 123,
            "status": true,
            "cidade": "Americana"
        }
    ]
   ```
* ### POST  /usuarios

   Para fazer uma chamada a esse endpoint é necessário passar um json com os seguintes atributos:

   Exemplo:

        POST http://localhost:3000/usuarios

   Body:

   ```json
   {
    "nome": "Breno",
    "email": "Breno9292@hotmail.com",
    "senha": "12345678",
    "telefone": "649825635958",
    "sexo": 1,
    "datanascimento": "2013-02-14T13:15:03-08:00",
    "uf": "go",
    "foto": "string",
    "cidade": "americana"
  }
   ```

   Response:

   Esse endpoint retorna um novo usuário com os valores que foram passados.

   ```json
   {
	"id": 89,
	"nome": "Breno",
	"email": "Breno9292@hotmail.com",
	"senha": "$2a$10$q5zZ3x.7N4zr6.duNOhqNuuBjOl23E2Wq/ua5RDXgMF48Nl707Pm2",
	"telefone": "649825635958",
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
* ### POST  /usuarios-campus

   Para fazer uma chamada a esse endpoint é necessário passar um json com os seguintes atributos:

   Exemplo: 

        POST http://localhost:3000/usuarios-campus
   
   Body: 

   ```json
   {
    "nome": "exemplo",
    "email": "exemplo@hotmail.com",
    "senha": "exemplo",
    "telefone": "exemplo",
    "sexo": 1,
    "datanascimento": "2013-02-14T13:15:03-08:00",
    "uf": "go",
    "foto": "/exemplo",
	"cidade": "exemplo",
	"cursoid": 2,
	"turma": "5A",
	"periodo": 7,
	"nomecampus": "Unirv"
  }
   ```

   Response:

   Esse endpoint retorna um novo usuário e um novo campus criado para esse usuário.

   ```json
    {
	    "usuario": {
            "id": 69,
            "nome": "exemplo",
            "email": "exemplo@hotmail.com",
            "senha": "$2a$10$NlJmn1N0bYhTdgJ9uoyxYesH4JCFfI98cnRzZoZ3nFU6ZJf930BN6",
            "telefone": "exemplo",
            "sexo": 1,
            "datanascimento": "2013-02-14T00:00:00.000Z",
            "role": 2,
            "uf": "go",
            "foto": "/exemplo",
            "pontuacao": 0,
            "status": true,
            "cidade": "exemplo"
        },
        "campus": {
            "id": 107,
            "cursoid": 2,
            "turma": "5A",
            "periodo": 7,
            "nomecampus": "Unirv",
            "usuariosid": 69
        }
    }
   ```
* ### PUT   /usuarios/:id

   ```json
   
   ```
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
