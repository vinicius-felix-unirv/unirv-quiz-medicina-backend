
# Primeiros passos

 Faça um clone da aplicação:

      git clone https://github.com/vinicius-felix-unirv/unirv-quiz-medicina-backend.git


## Configuração:

 Navegue até a pasta quiz e adicione um novo arquivo '.env' e coloque as seguintes variáveis de ambiente:

   ```env
   DATABASE_URL="postgresql://postgres:MOgOnBYzQgVEFuhQTerBHDCmURButwvc@roundhouse.proxy.rlwy.net:32795/railway"

   # configurações do envio de email

   MAIL_HOST="smtp.gmail.com"
   MAIL_PORT=465
   MAIL_USER="devquizunirv@gmail.com"
   MAIL_PASS="lupfpdggauhebqfd"
   MAIL_FROM="devquizunirv@gmail.com"
   ```
 Logo a pos a criação do arquivo .env execute os seguintes comandos:

 Esse comando é para instalar todas as dependencias da aplicação.

      npm install

 Esse comando serve para executar as migrations do prisma no banco de dados.

      npx prisma migrate dev

 Comando para execução:

      npm run dev
 

# Routes

* [Usuarios](#usuarios)
* [Campus](#campus)
* [Quiz](#quiz)
* [Quiz-avaliativo-usuarios](#quiz-avaliativo-usuarios)
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

            GET http://localhost:3000/usuarios/70

   Response:
   
   Esse endpoint devolve um usuário.

   ```json
    {
      "id": 70,
		"nome": "Exemplo",
		"email": "hablaaabb@hotmail.com",
		"senha": "$2a$10$QhgiRPWIQIlmsQJMWXEvSuMdAwv/mXPEHoejMQTymZMu8m9KYeZZG",
		"telefone": "exemplo",
		"sexo": 1,
		"datanascimento": "2013-02-14T00:00:00.000Z",
		"role": 1,
		"uf": "go",
		"foto": "string",
		"pontuacao": 267,
		"status": true,
		"cidade": "piranguataubua",
		"turma": "3A111111111",
		"periodo": 31,
		"cursoid": 5,
		"campusid": 109
    }
   ```
   --------
* ### GET /cursos/:id/usuarios/:skip/:take

   Para fazer uma chamada a esse endpoint é necessário passar o 'id' do curso e o valor do skip e take e estar autenticado.

   Exemplo:

            GET http://localhost:3000/cursos/5/usuarios/0/2

    Response: 

    Esse endpoint retorna vários usuários que pertencem a um curso específico e que o status seja true de forma paginada, podendo alterar a quantidade por página através do parâmetro ':skip' e ':take'.

   ```json
   [
	   {
         "id": 70,
         "nome": "Exemplo",
         "email": "hablaaabb@hotmail.com",
         "senha": "$2a$10$QhgiRPWIQIlmsQJMWXEvSuMdAwv/mXPEHoejMQTymZMu8m9KYeZZG",
         "telefone": "exemplo",
         "sexo": 1,
         "datanascimento": "2013-02-14T00:00:00.000Z",
         "role": 1,
         "uf": "go",
         "foto": "string",
         "pontuacao": 267,
         "status": true,
         "cidade": "piranguataubua",
         "turma": "3A111111111",
         "periodo": 31,
         "cursoid": 5,
         "campusid": 109
	   },
	   {
         "id": 103,
         "nome": "Juliscleydi",
         "email": "bb@gmail.com",
         "senha": "$2a$10$tGz5i4iCqdq7y4vwfWLeoO35Yj53ljPVjmmd5HDh.nBAxw5DOVBPy",
         "telefone": "string",
         "sexo": 1,
         "datanascimento": "2013-02-14T00:00:00.000Z",
         "role": 1,
         "uf": "go",
         "foto": "string",
         "pontuacao": 0,
         "status": true,
         "cidade": "americana",
         "turma": "3A",
         "periodo": 3,
         "cursoid": 5,
         "campusid": 109
	   }
   ]
   ```
   ---------
* ### GET /cursos/:id/usuarios/ranking

   Para fazer uma chamada a esse endpoint é necessário passar o 'id' do curso e estar autenticado.

   Exemplo:

        GET http://localhost:3000/cursos/5/usuarios/ranking

   Response:

   Esse endpoint retorna os 10 usuários com a maior pontuação em ordem decrescente.
   
   'Observação': ainda falta refatorar a logica da pontuação para validar os pontos do usuário com um curso especifico.

   ```json
    [
	   {
         "id": 104,
         "nome": "aaaaaaaaaaaaaaaaaa",
         "email": "ddddddddddddddddddddddddddddd",
         "senha": "$2a$10$q/NVNVrPVxLivoczLpq1W.grLGnvvDtwi1T1ENJNZmVPfdQ/Jx3ne",
         "telefone": "string",
         "sexo": 1,
         "datanascimento": "2013-02-14T00:00:00.000Z",
         "role": 3,
         "uf": "go",
         "foto": "string",
         "pontuacao": 1000,
         "status": true,
         "cidade": "americana",
         "turma": "3A",
         "periodo": 3,
         "cursoid": 5,
         "campusid": 109
	   },
	   {
         "id": 70,
         "nome": "Exemplo",
         "email": "hablaaabb@hotmail.com",
         "senha": "$2a$10$QhgiRPWIQIlmsQJMWXEvSuMdAwv/mXPEHoejMQTymZMu8m9KYeZZG",
         "telefone": "exemplo",
         "sexo": 1,
         "datanascimento": "2013-02-14T00:00:00.000Z",
         "role": 1,
         "uf": "go",
         "foto": "string",
         "pontuacao": 267,
         "status": true,
         "cidade": "piranguataubua",
         "turma": "3A111111111",
         "periodo": 31,
         "cursoid": 5,
         "campusid": 109
	   },
	   {
         "id": 103,
         "nome": "Juliscleydi",
         "email": "bb@gmail.com",
         "senha": "$2a$10$tGz5i4iCqdq7y4vwfWLeoO35Yj53ljPVjmmd5HDh.nBAxw5DOVBPy",
         "telefone": "string",
         "sexo": 1,
         "datanascimento": "2013-02-14T00:00:00.000Z",
         "role": 3,
         "uf": "go",
         "foto": "string",
         "pontuacao": 0,
         "status": true,
         "cidade": "americana",
         "turma": "3A",
         "periodo": 3,
         "cursoid": 5,
         "campusid": 109
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
      "nome": "aaaaaaaaaaaaaaaaaa",
      "email": "ddddddddddddddddddddddddddddd",
      "senha": "Barca",
      "telefone": "string",
      "sexo": 1,
      "datanascimento": "2013-02-14T13:15:03-08:00",
      "uf": "go",
      "foto": "string",
      "cidade": "americana",
      "turma": "3A",
      "periodo": 3,
      "cursoid": 5,
      "campusid": 109
   }
   ```

   Response:

   Esse endpoint retorna um novo usuário com os valores que foram passados.

   ```json
   {
      "id": 104,
      "nome": "aaaaaaaaaaaaaaaaaa",
      "email": "ddddddddddddddddddddddddddddd",
      "senha": "$2a$10$q/NVNVrPVxLivoczLpq1W.grLGnvvDtwi1T1ENJNZmVPfdQ/Jx3ne",
      "telefone": "string",
      "sexo": 1,
      "datanascimento": "2013-02-14T00:00:00.000Z",
      "role": 3,
      "uf": "go",
      "foto": "string",
      "pontuacao": 1000,
      "status": true,
      "cidade": "americana",
      "turma": "3A",
      "periodo": 3,
      "cursoid": 5,
      "campusid": 109
   }
   ```
   --------
* ### PUT /usuarios/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do usuário e um json com os seguintes atributos:

   Exemplo:

        PUT http://localhost:3000/usuarios/70

   Body:

   ```json
   {
      "nome": "Exemplo",
      "email": "hablaaabb@hotmail.com",
      "telefone": "exemplo",
      "sexo": 1,
      "datanascimento": "2013-02-14T13:15:03-08:00",
      "uf": "go",
      "foto": "string",
		"cidade": "piranguataubua",
		"turma": "3A111111111",
		"periodo": 31,
		"cursoid": 5,
		"campusid": 109
   }
   ```

   Response:

   Esse endpoint retorna o usuário alterado

   ```json
   {
      "id": 70,
      "nome": "Exemplo",
      "email": "hablaaabb@hotmail.com",
      "senha": "$2a$10$75GQSUkJpOcCU.tz4qSgHu24uj/zvtJNSI38fPH5jMLel6h8fEERG",
      "telefone": "exemplo",
      "sexo": 1,
      "datanascimento": "2013-02-14T00:00:00.000Z",
      "role": 1,
      "uf": "go",
      "foto": "string",
      "pontuacao": 0,
      "status": true,
      "cidade": "piranguataubua",
      "turma": "3A111111111",
      "periodo": 31,
      "cursoid": 5,
      "campusid": 109
   }
   ```
   --------
* ### PUT /usuarios/:id/pontuacao

   Para fazer uma chamada a esse endpoint é necessario estar autenticado e passar o 'id' do usuário que se deseja adicionar os pontos e um json com o atributo:

   Exemplo:

        PUT http://localhost:3000/usuarios/104/pontuacao

   Body:

   ```json
   {
	   "pontuacao": 1000
   }
   ```

   Response: 

   Esse endpoint retorna um usuário com a sua pontuação alterada.

   ```json
   {
      "id": 104,
      "nome": "aaaaaaaaaaaaaaaaaa",
      "email": "ddddddddddddddddddddddddddddd",
      "senha": "$2a$10$q/NVNVrPVxLivoczLpq1W.grLGnvvDtwi1T1ENJNZmVPfdQ/Jx3ne",
      "telefone": "string",
      "sexo": 1,
      "datanascimento": "2013-02-14T00:00:00.000Z",
      "role": 3,
      "uf": "go",
      "foto": "string",
      "pontuacao": 1000,
      "status": true,
      "cidade": "americana",
      "turma": "3A",
      "periodo": 3,
      "cursoid": 5,
      "campusid": 109
   }
   ```
   --------
* ### PUT /usuarios/:id/trocar-senha

   Para fazer uma chamada a esse endpoint é necessário o 'id' do usuário que deseja trocar a senha e um json com o atributo:

   Exemplo:

        PUT http://localhost:3000/usuarios/70/trocar-senha

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

* ### GET /campus
   
   Para fazer a chamada a esse endpoint é necessario estar autenticado para buscar todos os campus.

   Examplo: 

        GET http://localhost:3000/campus

   Response: 

   Esse endpoint retorna todos os campus.

   ```json
   [
      {
         "id": 109,
         "nomecampus": "Unirv II"
      },
      {
         "id": 111,
         "nomecampus": "IF"
      },
      {
         "id": 112,
         "nomecampus": "UNIRV"
      }
   ]
   ```
   --------
* ### GET /campus/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do campus que procuras.

   Exemplo:

        Get http://localhost:3000/campus/109

   Response:

   Esse endpoint retorna um campus.

   ```json
   {
      "id": 109,
      "nomecampus": "Unirv II"
   }
   ```
   --------
* ### PUT /campus/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do curso que vc deseja alterar e um json com os seguintes atributos:

   Exemplo:

         PUT http://localhost:3000/campus/109

   Body:

   ```json
   {
	   "nomecampus": "Unirv II"
   }
   ```

   Response:

   Esse endpoint retorna um usuário alterado com os valores passados pelo body.

   ```json
   {
      "id": 109,
      "nomecampus": "Unirv I"
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
	   "nomecampus": "UNIRV"
   }
   ```

   Response:

   Esse endpoint retorna o novo campus criado.

   ```json
   {
		"id": 112,
		"nomecampus": "UNIRV"
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

         GET http://localhost:3000/quiz/34
      
   Response:

   Esse endpoint retorna um quiz.

   ```json
   {
      "id": 34,
      "titulo": "Odonto",
      "cursoid": 5,
      "imagem": "/testes"
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
         "id": 34,
         "titulo": "Odonto",
         "cursoid": 5,
         "imagem": "/testes"
      },
      {
         "id": 35,
         "titulo": "Farmaco II",
         "cursoid": 5,
         "imagem": "/teste"
      },
      {
         "id": 36,
         "titulo": "Farmaco I",
         "cursoid": 5,
         "imagem": "/teste"
      },
      {
         "id": 38,
         "titulo": "Farmaco",
         "cursoid": 5,
         "imagem": "/teste"
      },
      {
         "id": 39,
         "titulo": "Farmaco 3",
         "cursoid": 5,
         "imagem": "/teste"
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
         "id": 34,
         "titulo": "Odonto",
         "cursoid": 5,
         "imagem": "/testes"
      },
      {
         "id": 35,
         "titulo": "Farmaco II",
         "cursoid": 5,
         "imagem": "/teste"
      },
      {
         "id": 36,
         "titulo": "Farmaco I",
         "cursoid": 5,
         "imagem": "/teste"
      },
      {
         "id": 37,
         "titulo": "Farmaco",
         "cursoid": 6,
         "imagem": "/teste"
      },
      {
         "id": 38,
         "titulo": "Farmaco",
         "cursoid": 5,
         "imagem": "/teste"
      },
      {
         "id": 39,
         "titulo": "Farmaco 3",
         "cursoid": 5,
         "imagem": "/teste"
      },
      {
         "id": 40,
         "titulo": "Farmaco I",
         "cursoid": 6,
         "imagem": "/testes"
      },
      {
         "id": 41,
         "titulo": "Odonto",
         "cursoid": 6,
         "imagem": "/teste"
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
      "titulo": "anatomia 23",
      "cursoid": 5,
      "imagem": "/testes"
   }
   ```
   
   Response:

   Esse endpoint retorna o quiz que acaba de ser criado com os valores passados pelo body.

   ```json
   {
      "id": 42,
      "titulo": "anatomia 23",
      "cursoid": 5,
      "imagem": "/testes"
   }
   ```
   --------
* ### PUT /quiz/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' do quiz que deseja alterar e um json com os seguintes atributos.

   Exemplo: 

         PUT http://localhost:3000/quiz/40

   Body:

   ```json
   {
      "titulo": "Farmaco I",
      "imagem": "/testes"
   }
   ```
      
   Response:

   Esse endpoint retorna o quiz que acaba de ser alterado com os valores passados pelo body.

   ```json
   {
      "id": 40,
      "titulo": "Farmaco I",
      "cursoid": 6,
      "imagem": "/testes"
   }
   ```
 -------
 
 ## Quiz-Avaliativo-Usuarios

* ### GET /quiz-avaliativos-usuarios/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' do
   quiz-avaliativos-usuarios.

         GET http://localhost:3000/quiz-avaliativos-usuarios/1
   
   Response: 

   ```json
   {
      "id": 1,
      "quizavaliativoid": 4,
      "usuarioid": 103,
      "pontuacao": 30,
      "horainicial": "2013-02-14T00:00:00.000Z",
      "horafinal": "2013-02-14T00:00:00.000Z"
   }
   ```
   --------
* ### GET /quiz-avaliativos-usuarios/:id/:skip/:take

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' do
   quiz-avaliativos-usuarios e os valores de skip e take.

         GET http://localhost:3000/quiz-avaliativos-usuarios/4/0/10
   
   Response: 

   ```json
   [
      {
         "id": 1,
         "quizavaliativoid": 4,
         "usuarioid": 103,
         "pontuacao": 30,
         "horainicial": "2013-02-14T00:00:00.000Z",
         "horafinal": "2013-02-14T00:00:00.000Z"
      },
      {
         "id": 3,
         "quizavaliativoid": 4,
         "usuarioid": 104,
         "pontuacao": 500,
         "horainicial": "2013-02-14T00:00:00.000Z",
         "horafinal": "2013-02-14T00:00:00.000Z"
      }
   ]
   ```
   --------
* ### POST /quiz-avaliativos-usuarios

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar um json com os seguintes atributos.

         POST http://localhost:3000/quiz-avaliativos-usuarios
   
   Body: 
   ```json
   {
      "quizavaliativoid": 4,
      "usuarioid": 104,
      "pontuacao": 70,
      "horainicial": "2013-02-14T13:15:03-08:00",
      "horafinal": "2013-02-14T13:15:03-09:00"
   }
   ```
   Response: 

   ```json
   {
      "id": 1,
      "quizavaliativoid": 4,
      "usuarioid": 104,
      "pontuacao": 70,
      "horainicial": "2013-02-14T00:00:00.000Z",
      "horafinal": "2013-02-14T00:00:00.000Z"
   }
   ```
   --------
 ## Perguntas

* ### GET /perguntas/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da pergunta que deseja buscar.

   Exemplo: 

         GET http://localhost:3000/perguntas/83

   Response:

   Esse endpoint retorna uma pergunta.

   ```json
   {
      "id": 83,
      "conteudo": "olha la",
      "perguntasnivelid": 12,
      "tempo": 50,
      "pathimage": "/teste01",
      "status": true,
      "categoriasid": 31,
      "quizid": 75
   }
   ```
   -----
* ### GET  /usuarios/:usuariosid/quiz/:id/categorias/:categoriasid/perguntas/:skip/:take

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da usuário, o 'id' do quiz e o 'id' da categoria e o valor de 'take'.

   Exemplo: 

         GET http://localhost:3000/usuarios/105/quiz/75/categorias/30/perguntas/10

   Response:

   Esse endpoint retorna as perguntas de uma categoria que ainda não foram respondidas de um quiz-avaliativo especifico e que o status seja true de forma paginada. A quantidade de elementos por página varia dependendo dos valores de 'skip' e 'take'.

   ```json
   [
      {
         "id": 82,
         "conteudo": "olha la",
         "perguntasnivelid": 12,
         "tempo": 50,
         "pathimage": "/teste01",
         "status": true,
         "categoriasid": 30,
         "quizid": 75
      },
      {
         "id": 84,
         "conteudo": "Vc quer bolo?",
         "perguntasnivelid": 9,
         "tempo": 70,
         "pathimage": "/teste01",
         "status": true,
         "categoriasid": 30,
         "quizid": 75
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
      "conteudo": "pq tuu ta aqui",
      "perguntasnivelid": 9,
      "tempo": 13,
      "pathimage": "/frontlaele",
      "categoriasid": 30,
      "quizid": 75
   }
   ```

   Response:

   Esse endpoint retorna a nova pergunta que acaba de ser criada com base nos atributos enviados pelo body.

   ```json
   {
      "id": 85,
      "conteudo": "pq tuu ta aqui",
      "perguntasnivelid": 9,
      "tempo": 13,
      "pathimage": "/frontlaele",
      "status": true,
      "categoriasid": 30,
      "quizid": 75
   }
   ```
* ### PUT  /perguntas/:id

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da pergunta e um json com os seguintes atributos.

   Exemplo: 

         PUT http://localhost:3000/perguntas/51

   Body:

   ```json
   {
      "conteudo": "Quer",
      "perguntasnivelid": 12,
      "tempo": 50,
      "pathimage": "/fsddsddddddddddddddddddddddddddddddsdle",
      "categoriasid": 31
   }
   ```

   Response:

   Esse endpoint retorna a pergunta que acaba de ser alterada com base nos atributos enviados pelo body.

   ```json
   {
      "id": 51,
      "conteudo": "Quer",
      "perguntasnivelid": 12,
      "tempo": 50,
      "pathimage": "/fsddsddddddddddddddddddddddddddddddsdle",
      "status": true,
      "categoriasid": 31,
      "quizid": 58
   }
   ```
   ------
* ### PUT  /perguntas/:id/status

   Para fazer uma chamada a esse endpoint é necessário estar autenticado, passar o 'id' da pergunta que deseja alterar o status.

   Exemplo: 

         PUT http://localhost:3000/perguntas/50/status

   Response:

   Esse endpoint retorna uma pergunta com o seu status alterado.

   ```json
   {
      "id": 50,
      "conteudo": "qual a tua idade?",
      "perguntasnivelid": 12,
      "tempo": 50,
      "pathimage": "/frontlaele",
      "status": true,
      "categoriasid": 30,
      "quizid": 45
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
* ### GET  /cursos/:id/categorias

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do curso para buscar todas as categorias dele.

   Exemplo: 

         GET http://localhost:3000/cursos/1/categorias

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
* ### GET  /quiz/:id/categorias

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do quiz para buscar todas as categorias dele.

   Exemplo: 

         GET http://localhost:3000/quiz/1/categorias

   Response:

   Esse endpoint retorna todas as categorias de um quiz específico.

   ```json
   [
      {
         "id": 1,
         "descricao": "Anatomia",
         "status": true,
         "imagem": "/Anatomia.png",
         "cursoId": 1
      },
      {
         "id": 2,
         "descricao": "Farmacologia",
         "status": true,
         "imagem": "/Farmacologia.png",
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
 ## Progresso-Perguntas

* ### GET /usuarios/:usuarioid/quiz/:quizid/progresso-perguntas

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do usuário e o 'id' do quiz que você deseja buscar o progresso.

   Exemplo: 

         GET http://localhost:3000/usuarios/66/quiz/18/progresso-perguntas

   Response:

   Esse endpoint retorna o progresso atual e o total.

   ```json
   {
      "progressoAtual": 3,
      "progressoTotal": 3
   }
   ```
   ----
* ### GET /usuarios/:usuarioid/quiz/:quizid/categorias/:categoriaid/progresso-perguntas

   Para fazer uma chamada a esse endpoint é necessário estar autenticado e passar o 'id' do usuário, o 'id' do quiz e o 'id' da categoria que você deseja buscar o progresso.

   Exemplo: 

         GET http://localhost:3000/usuarios/66/quiz/18/categorias/22/progresso-perguntas

   Response:

   Esse endpoint retorna o progresso atual e o total.

   ```json
   {
      "progressoAtual": 0,
      "progressoTotal": 1
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

