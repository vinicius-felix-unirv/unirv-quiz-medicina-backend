
# Routes

* [Usuarios](#usuarios)
* [Campus](#campus)
* [Quiz](#quiz)
* [Perguntas](#perguntas)
* [Progresso Perguntas](#progresso-perguntas)
* [Perguntas Nivel](#perguntas-nivel)
* [Categorias](#categorias)
* [Alternativas](#alternativas)
* [Cursos](#curso)
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
   --------
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
   ---------
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
   --------
* ### POST /usuarios

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
   --------
* ### POST /usuarios-campus

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
   --------
* ### PUT /usuarios/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do usuário e um json com os seguintes atributos:

   Exemplo:

        PUT http://localhost:3000/usuarios/69

   Body:

   ```json
   {
    "nome": "Exemplo",
    "email": "exemplo0202@hotmail.com",
    "telefone": "exemplo",
    "sexo": 1,
    "datanascimento": "2013-02-14T13:15:03-08:00",
    "uf": "go",
    "foto": "string"
   }
   ```

   Response:

   Esse endpoint retorna o usuário alterado

   ```json
   {
      "id": 69,
      "nome": "Exemplo",
      "email": "exemplo0202@hotmail.com",
      "senha": "$2a$10$NlJmn1N0bYhTdgJ9uoyxYesH4JCFfI98cnRzZoZ3nFU6ZJf930BN6",
      "telefone": "exemplo",
      "sexo": 1,
      "datanascimento": "2013-02-14T00:00:00.000Z",
      "role": 2,
      "uf": "go",
      "foto": "string",
      "pontuacao": 0,
      "status": true,
      "cidade": "exemplo"
   }
   ```
   --------
* ### PUT /usuarios/:id/pontuacao

   Para fazer uma chamada a esse endpoint é necessario estar autenticado e passar o 'id' do usuário que se deseja adicionar os pontos e um json com o atributo:

   Exemplo:

        PUT http://localhost:3000/usuarios/66/pontuacao

   Body:

   ```json
   {
	"pontuacao": 123
   }
   ```

   Response: 

   Esse endpoint retorna um usuário com a sua pontuação alterada.

   ```json
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
   ```
   --------
* ### PUT /usuarios/:id/trocar-senha

   Para fazer uma chamada a esse endpoint é necessário o 'id' do usuário que deseja trocar a senha e um json com o atributo:

   Exemplo:

        PUT http://localhost:3000/usuarios/66/trocar-senha

    Body:

    ```json
    {
	   "senha": "hehe2&5464"
    }
    ```

    Response:

    Esse endpoint retorna uma mensagem de sucesso ao conseguir trocar a senha.

    ```json
    {
	   "message": "success"
    }
    ```
  
 ## Campus

* ### GET /usuarios/:id/campus
   
   Para fazer a chamada a esse endpoint é necessario estar autenticado e passar o 'id' do usuário para buscar todos os campus de um usuário.

   Examplo: 

        GET http://localhost:3000/usuarios/66/campus

   Response: 

   Esse endpoint retorna todos os campus de um usuário específico.

   ```json
   [
      {
         "id": 105,
         "cursoid": 2,
         "turma": "5A",
         "periodo": 7,
         "nomecampus": "Unirv",
         "usuariosid": 66
      },
      {
         "id": 108,
         "cursoid": 1,
         "turma": "2A",
         "periodo": 4,
         "nomecampus": "Unirv",
         "usuariosid": 66
      }
   ]
   ```
   --------
* ### GET /campus/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do campus que procuras.

   Exemplo:

        Get http://localhost:3000/campus/105

   Response:

   Esse endpoint retorna um campus.

   ```json
   {
      "id": 105,
      "cursoid": 2,
      "turma": "5A",
      "periodo": 7,
      "nomecampus": "Unirv",
      "usuariosid": 66
   }
   ```
   --------
* ### PUT /campus/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do curso que vc deseja alterar e um json com os seguintes atributos:

   Exemplo:

         PUT http://localhost:3000/campus/88

   Body:

   ```json
   {
      "cursoid": 1,
      "turma": "4A",
      "periodo": 8,
      "nome": "Unirv"
   }
   ```

   Response:

   Esse endpoint retorna um usuário alterado com os valores passados pelo body.

   ```json
   {
      "id": 88,
      "cursoid": 1,
      "turma": "4A",
      "periodo": 8,
      "nome": "Unirv",
      "usuariosid": 47
   }
   ```
   --------
* ### POST /campus

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar um json com os seguintes atributos:

   Exemplo:

         POST http://localhost:3000/campus

   Body:

   ```json
   {
      "cursoid": 1,
      "turma": "2A",
      "periodo": 4,
      "nomecampus": "Unirv",
      "usuariosid": 66
   }
   ```

   Response:

   Esse endpoint retorna o novo campus criado.

   ```json
   {
      "id": 107,
      "cursoid": 1,
      "turma": "2A",
      "periodo": 4,
      "nomecampus": "Unirv",
      "usuariosid": 66
   }
   ```
   --------
* ### DELETE /campus/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do campus que deseja apagar.

   Exemplo: 

         DELETE http://localhost:3000/campus/88

   Response:

         StatusCode: 204

  
 ## Quiz

* ### GET /quiz/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do quiz que deseja buscar. 

   Exemplo: 

         GET http://localhost:3000/quiz/18
      
   Response:

   Esse endpoint retorna um quiz.

   ```json
   {
      "id": 18,
      "titulo": "Medicina",
      "cursoid": 1
   }
   ```
   --------
* ### GET /curso/:id/quiz/:skip/:take

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do curso e o valor de 'skip' e 'take' para buscar os quizzes de um curso específico.

   Exemplo: 

         GET http://localhost:3000/curso/1/quiz/0/10
      
   Response:

   Esse endpoint retorna vários quizzes que pertencem a um curso específico de forma paginada. A quantidade de elementos por página varia dependendo dos valores de 'skip' e 'take'.

   ```json
   [
      {
         "id": 18,
         "titulo": "Medicina I",
         "cursoid": 1
      },
      {
         "id": 29,
         "titulo": "Anatomia",
         "cursoid": 1
      },
      {
         "id": 30,
         "titulo": "farmaco",
         "cursoid": 1
      },
      {
         "id": 31,
         "titulo": "ossos",
         "cursoid": 1
      }
   ]
   ```
   --------
* ### GET /quiz/:skip/:take

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar os valores de 'skip' e 'take' para buscar os todos os quizzes de forma paginada.

   Exemplo: 

         GET http://localhost:3000/quiz/0/10
      
   Response:

   Esse endpoint retorna vários quizzes de forma paginada. A quantidade de elementos por página varia dependendo dos valores de 'skip' e 'take'.

   ```json
   [
      {
         "id": 18,
         "titulo": "Medicina I",
         "cursoid": 1
      },
      {
         "id": 23,
         "titulo": "Veterinaria",
         "cursoid": 4
      },
      {
         "id": 26,
         "titulo": "Redes I",
         "cursoid": 4
      },
      {
         "id": 27,
         "titulo": "Redes II",
         "cursoid": 4
      },
      {
         "id": 28,
         "titulo": "Banco de dados",
         "cursoid": 4
      },
      {
         "id": 29,
         "titulo": "Anatomia",
         "cursoid": 1
      },
      {
         "id": 30,
         "titulo": "farmaco",
         "cursoid": 1
      },
      {
         "id": 31,
         "titulo": "ossos",
         "cursoid": 1
      },
      {
         "id": 32,
         "titulo": "cavalos",
         "cursoid": 2
      },
      {
         "id": 33,
         "titulo": "coelhos",
         "cursoid": 2
      }
   ]
   ```
   --------
* ### POST /quiz

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar um json com os seguintes atributos.

   Exemplo: 

         POST http://localhost:3000/quiz

   Body:

   ```json
   {
      "titulo": "coelhos",
      "cursoid": 2
   }
   ```
   
   Response:

   Esse endpoint retorna o quiz que acaba de ser criado com os valores passados pelo body.

   ```json
   {
      "id": 33,
      "titulo": "coelhos",
      "cursoid": 2
   }
   ```
   --------
* ### PUT /quiz/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' do quiz que deseja alterar e um json com os seguintes atributos.

   Exemplo: 

         PUT http://localhost:3000/quiz/33

   Body:

   ```json
   {
      "titulo": "Vaquinhas"
   }
   ```
      
   Response:

   Esse endpoint retorna o quiz que acaba de ser alterado com os valores passados pelo body.

   ```json
   {
      "id": 33,
      "titulo": "Vaquinhas",
      "cursoid": 2
   }
   ```

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
