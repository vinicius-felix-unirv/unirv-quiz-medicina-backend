
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

   Esse endpoint retorna um status '204' confirmando que o campus foi deletado.

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

* ### GET /perguntas/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da pergunta que deseja buscar.

   Exemplo: 

         GET http://localhost:3000/perguntas/42

   Response:

   Esse endpoint retorna uma pergunta.

   ```json
   {
      "id": 42,
      "conteudo": "exemplo",
      "perguntasnivelid": 6,
      "tempo": 25,
      "pathimage": "/exemplo",
      "status": false,
      "categoriasid": 23,
      "quizid": 18
   }
   ```
   -----
* ### GET  /usuarios/:usuariosid/quiz/:id/perguntas/:skip/:take

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da usuário, o 'id' do quiz e os valores de 'skip' e 'take'.

   Exemplo: 

         GET http://localhost:3000/usuarios/66/quiz/18/perguntas/0/10

   Response:

   Esse endpoint retorna as perguntas que ainda não foram respondidas de um quiz especifico de forma paginada. A quantidade de elementos por página varia dependendo dos valores de 'skip' e 'take'.

   ```json
   [
      {
         "id": 42,
         "conteudo": "oi yagho",
         "perguntasnivelid": 6,
         "tempo": 25,
         "pathimage": "testea",
         "status": false,
         "categoriasid": 23,
         "quizid": 18
      },
      {
         "id": 43,
         "conteudo": "oi ",
         "perguntasnivelid": 6,
         "tempo": 25,
         "pathimage": "testea",
         "status": true,
         "categoriasid": 22,
         "quizid": 18
      },
      {
         "id": 44,
         "conteudo": "oi bb ",
         "perguntasnivelid": 6,
         "tempo": 25,
         "pathimage": "testea",
         "status": true,
         "categoriasid": 23,
         "quizid": 18
      }
   ]
   ```
   ------
* ### POST /perguntas

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar um json com os seguintes atributos.

   Exemplo: 

         POST http://localhost:3000/perguntas

   Body:

   ```json
   {
      "conteudo": "Quem trampa no front é gay??",
      "perguntasnivelid": 9,
      "tempo": 10,
      "pathimage": "/frontlaele",
      "categoriasid": 22,
      "quizid": 23
   }
   ```

   Response:

   Esse endpoint retorna a nova pergunta que acaba de ser criada com base nos atributos enviados pelo body.

   ```json
   {
      "id": 45,
      "conteudo": "Quem trampa no front é yag??",
      "perguntasnivelid": 9,
      "tempo": 10,
      "pathimage": "/frontlaele",
      "status": true,
      "categoriasid": 22,
      "quizid": 23
   }
   ```
* ### PUT  /perguntas/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da pergunta e um json com os seguintes atributos.

   Exemplo: 

         PUT http://localhost:3000/perguntas/45

   Body:

   ```json
   {
      "conteudo": "qual a tua idade?",
      "perguntasnivelid": 2,
      "tempo": 30,
      "pathimage": "/frontlaele",
      "categoriasid": 22,
   }
   ```

   Response:

   Esse endpoint retorna a pergunta que acaba de ser alterada com base nos atributos enviados pelo body.

   ```json
   {
      "id": 45,
      "conteudo": "qual a tua idade?",
      "perguntasnivelid": 12,
      "tempo": 30,
      "pathimage": "/frontlaele",
      "status": true,
      "categoriasid": 22,
      "quizid": 23
   }
   ```
   ------
* ### PUT  /perguntas/:id/status

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da pergunta que deseja alterar o status.

   Exemplo: 

         PUT http://localhost:3000/perguntas/45/status

   Response:

   Esse endpoint retorna uma pergunta com o seu status alterado.

   ```json
   {
      "id": 45,
      "conteudo": "qual a tua idade?",
      "perguntasnivelid": 12,
      "tempo": 30,
      "pathimage": "/frontlaele",
      "status": false,
      "categoriasid": 22,
      "quizid": 23
   }
   ```

 ## Alternativas 

* ### GET /perguntas/:id/alternativas

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' da pergunta que você deseja buscar as alternativas.

   Exemplo: 

         GET http://localhost:3000/perguntas/43/alternativas

   Response:

   Esse endpoint retorna todas alternativas de uma pergunta específica.

   ```json
   [
      {
         "id": 179,
         "perguntasid": 43,
         "resposta": "Baguio III",
         "pathimage": null,
         "correta": false
      },
      {
         "id": 180,
         "perguntasid": 43,
         "resposta": "Baguio IV",
         "pathimage": null,
         "correta": true
      },
      {
         "id": 181,
         "perguntasid": 43,
         "resposta": "Baguio V",
         "pathimage": null,
         "correta": false
      }
   ]
   ```
   -------
* ### POST /alternativas

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar um json com os seguintes atributos.

   Exemplo: 

         Post http://localhost:3000/alternativas

   Body:

   ```json
   {
      "perguntasid": 42,
      "resposta": "Baguio I",
      "pathimage": null,
      "correta": false
   }
   ```

   Response:

   Esse endpoint retorna a alternativa criada com os atributos do body.

   ```json
   {
      "id": 12,
      "perguntasid": 42,
      "resposta": "Baguio I",
      "pathimage": null,
      "correta": false
   }
   ```
   ----
* ### POST /alternativas/many

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar um json com os seguintes atributos.

   Exemplo: 

         Post http://localhost:3000/alternativas/many

   Body:

   ```json
   [
      {
         "perguntasid": 43,
         "resposta": "Baguio I",
         "pathimage": null,
         "correta": false
      },
      {
         "perguntasid": 43,
         "resposta": "Baguio II",
         "pathimage": null,
         "correta": false
      },
      {
         "perguntasid": 43,
         "resposta": "Baguio III",
         "pathimage": null,
         "correta": false
      },
      {
         "perguntasid": 43,
         "resposta": "Baguio IV",
         "pathimage": null,
         "correta": true
      },
      {
         "perguntasid": 43,
         "resposta": "Baguio V",
         "pathimage": null,
         "correta": false
      }  
   ]
   ```

   Response:

   Esse endpoint retorna todas as alternativas criadas com os atributos do body.

   ```json
   [
      {
         "id": 177,
         "perguntasid": 43,
         "resposta": "Baguio I",
         "pathimage": null,
         "correta": false
      },
      {
         "id": 178,
         "perguntasid": 43,
         "resposta": "Baguio II",
         "pathimage": null,
         "correta": false
      },
      {
         "id": 179,
         "perguntasid": 43,
         "resposta": "Baguio III",
         "pathimage": null,
         "correta": false
      },
      {
         "id": 180,
         "perguntasid": 43,
         "resposta": "Baguio IV",
         "pathimage": null,
         "correta": true
      },
      {
         "id": 181,
         "perguntasid": 43,
         "resposta": "Baguio V",
         "pathimage": null,
         "correta": false
      }
   ]
   ```
   ----
* ### PUT /alternativas/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da alternativa e um json com os seguintes atributos.

   Exemplo: 

         PUT http://localhost:3000/alternativas/177

   Body:

   ```json
   {
      "resposta": "Hola Zeus",
      "pathimage": "heheeehe",
      "correta": true
   }
   ```

   Response:

   Esse endpoint retorna a alternativa alterada com os atributos do body.

   ```json
   {
      "id": 177,
      "perguntasid": 43,
      "resposta": "Hola Zeus",
      "pathimage": "heheeehe",
      "correta": true
   }
   ```
   ----
* ### DELETE /alternativas/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' da alternativa que você deseja deletar.

   Exemplo: 

         DELETE http://localhost:3000/alternativas/177

   Response: 

   Esse endpoint retorna um status '204' confirmando que a alternativa foi deletada.
   
         StatusCode: 204

 ## Categorias

* ### GET /categorias/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' da categoria que você deseja buscar.

   Exemplo: 

         GET http://localhost:3000/categorias/23

   Response:

   ```json
   {
      "id": 23,
      "descricao": "Anatomia II",
      "status": true,
      "imagem": "/tests",
      "cursoId": 1
   }
   ```
   ---
* ### GET  /curso/:id/categorias

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do curso para buscar todas as categorias dele.

   Exemplo: 

         GET http://localhost:3000/curso/1/categorias

   Response:

   Esse endpoint retorna todas as categorias de um curso específico.

   ```json
   [
      {
         "id": 23,
         "descricao": "Anatomia II",
         "status": true,
         "imagem": "/tests",
         "cursoId": 1
      },
      {
         "id": 25,
         "descricao": "Pediatria",
         "status": true,
         "imagem": "/tests",
         "cursoId": 1
      },
      {
         "id": 26,
         "descricao": "Cardiologia",
         "status": true,
         "imagem": "/tests",
         "cursoId": 1
      },
      {
         "id": 27,
         "descricao": "Neurologia",
         "status": true,
         "imagem": "/tests",
         "cursoId": 1
      },
      {
         "id": 22,
         "descricao": "vasos",
         "status": false,
         "imagem": "/hehehehe",
         "cursoId": 1
      }
   ]
   ```
   ---
* ### POST /categorias

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar um json com os seguintes atributos.

   Exemplo: 

         Post http://localhost:3000/categorias

   Body:

   ```json
   {
      "descricao": "Farmaco",
      "imagem": "/tests",
      "cursoId": 2
   }
   ```
   Response:

   Esse endpoint retorna a categoria criada com os atributos do body.

   ```json
   {
      "id": 28,
      "descricao": "Farmaco",
      "status": true,
      "imagem": "/tests",
      "cursoId": 2
   }
   ```
   -----
* ### PUT /categorias/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da categoria e um json com os seguintes atributos.

   Exemplo: 

         PUT http://localhost:3000/categorias/28

   Body:

   ```json
   {
      "descricao": "Farmaco II",
      "imagem": "/tests"
   }
   ```
   Response:

   Esse endpoint retorna a categoria alterada com os atributos do body.

   ```json
   {
      "id": 28,
      "descricao": "Farmaco II",
      "status": true,
      "imagem": "/tests",
      "cursoId": 2
   }
   ```
   -----
* ### PUT /categorias/:id/status

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' da categoria que você deseja alterar o status

   Exemplo: 

         PUT http://localhost:3000/categorias/28/status

   Response:

   Esse endpoint retorna a categoria com o status alterado.

   ```json
   {
      "id": 28,
      "descricao": "Farmaco",
      "status": false,
      "imagem": "/tests",
      "cursoId": 2
   }
   ```

 ## Perguntas-Nivel

* ### GET /niveis/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do nivel que você deseja buscar.

   Exemplo: 

         GET http://localhost:3000/niveis/10

   Response:

   Esse endpoint retorna um nivel.

   ```json
   {
      "id": 10,
      "nivel": 11,
      "pontuacao": 55,
      "tempo": 45
   }
   ```
   ----
* ### GET /niveis

   Para fazer uma chamada a esse endpoint é necessário estar autenticado.

   Exemplo: 

         GET http://localhost:3000/niveis

   Response:

   Esse endpoint retorna todos os niveis.

   ```json
   [
      {
         "id": 6,
         "nivel": 4,
         "pontuacao": 15,
         "tempo": 45
      },
      {
         "id": 8,
         "nivel": 1,
         "pontuacao": 15,
         "tempo": 45
      },
      {
         "id": 9,
         "nivel": 2,
         "pontuacao": 55,
         "tempo": 45
      },
   ]
   ```
   ----
* ### POST /niveis

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar um json com os seguintes atributos.

   Exemplo: 

         Post http://localhost:3000/niveis

   Body:

   ```json
   {      
      "nivel": 2,
      "pontuacao": 100,
      "tempo": 32
   }
   ```
   Response:

   Esse endpoint retorna o nivel criado com os atributos do body.

   ```json
   {
      "id": 12,
      "nivel": 2,
      "pontuacao": 100,
      "tempo": 32
   }
   ```
   -----
* ### PUT /niveis/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' do nivel que você deseja alterar e um json com os seguintes atributos.

   Exemplo: 

         PUT http://localhost:3000/niveis/12

   Body:

   ```json
   {      
      "nivel": 2,
      "pontuacao": 50,
      "tempo": 45
   }
   ```
   Response:

   Esse endpoint retorna o nivel alterado com os atributos do body.

   ```json
   {
      "id": 12,
      "nivel": 2,
      "pontuacao": 50,
      "tempo": 45
   }
   ```
   -----
* ### DELETE /niveis/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' do nivel que você deseja deletar.

   Exemplo: 

         DELETE http://localhost:3000/niveis/12

   Response:

   Esse endpoint retorna um status '204' confirmando que o nivel foi deletado.

         StatusCode: 204

 ## Progresso-Perguntas

<!-- * ### GET /usuarios/:id/progresso-perguntas -->

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do usuário que você deseja buscar o progresso das perguntas.

   Exemplo: 

         GET http://localhost:3000/usuarios/50/progresso-perguntas

   Response:

   Esse endpoint retorna todos 



   ```json
   {
      "id": 10,
      "nivel": 11,
      "pontuacao": 55,
      "tempo": 45
   }
   ```
   ----
* ### POST /progresso-perguntas

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar um json com os seguintes atributos.

   Exemplo: 

         POST http://localhost:3000/progresso-perguntas

   Body:

   ```json
   {      
      "usuariosid": 50,
      "perguntasid": 43
   }
   ```
   Response:

   Esse endpoint retorna um progresso-perguntas criado.

   ```json
   {      
      "id": 5,
      "usuariosid": 50,
      "perguntasid": 43
   }
   ```
   -----
* ### POST /progresso-perguntas/many

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar um json com os seguintes atributos.

   Exemplo: 

         POST http://localhost:3000/progresso-perguntas/many

   Body:

   ```json
   [
      {      
         "usuariosid": 50,
         "perguntasid": 42
      },
      {      
         "usuariosid": 50,
         "perguntasid": 43
      },
      {      
         "usuariosid": 50,
         "perguntasid": 44
      }
   ]
   ```
   Response:

   Esse endpoint retorna todos os progresso-perguntas criados.

   ```json
   [
      {   
         "id": 8,   
         "usuariosid": 50,
         "perguntasid": 42
      },
      {    
         "id": 9,  
         "usuariosid": 50,
         "perguntasid": 43
      },
      {  
         "id": 10,    
         "usuariosid": 50,
         "perguntasid": 44
      }
   ]
   ```

 ## Curso

* ### GET /cursos

   Para fazer uma chamada a esse endpoint é necessário estar autenticado.

   Exemplo: 

         GET http://localhost:3000/cursos

   Response:

   Esse endpoint retorna todos os cursos.

   ```json
   [
      {
         "id": 1,
         "nome": "Medicina",
         "imagem": ""
      },
      {
         "id": 2,
         "nome": "Veterinaria",
         "imagem": ""
      },
      {
         "id": 3,
         "nome": "Administração",
         "imagem": ""
      },
      {
         "id": 4,
         "nome": "software",
         "imagem": "/teste"
      }
   ]
   ```

 ## Email

* ### POST /send-email

   Para fazer uma chamada a esse endpoint é necessário passar um json com os seguintes atributos:

   Exemplo: 

         POST http://localhost:3000/send-email

   Body:

   ```json
   {      
      "to": "vinisinho@gmail.com",
      "subject": "Agora vai dar bom negao",
      "text": "Ultimos testes"
   }
   ```

   Response:

   Esse endpoint retorna uma mensagem confirmando que o email foi enviado.

   ```json
   {
	   "message": "Email sent successfully"
   }
   ```

 ## Authentication

* ### POST /authentication

   Para fazer uma chamada a esse endpoint é necessário passar um json com os seguintes atributos:

   Exemplo: 

         POST http://localhost:3000/authentication

   Body:

   ```json
   {
      "email": "Barquinha@hotmail.com",
      "senha": "Barca9393"
   }
   ```

   Response:

   Esse endpoint retorna um token que permite ao usuário ter acesso ao quiz.

   ```json
   {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjYsIm5hbWUiOiJKdWxpc2NsZXlkaSIsInJvbGUiOjEsImlhdCI6MTcxMjkzMjM3MCwiZXhwIjoxNzEyOTYxMTcwfQ.ZmBM2-lSQq98-BzN0DgGa73Ks53gC2Fb771HEWCSlkw",
      "id": 66,
      "role": 1
   }
   ```

