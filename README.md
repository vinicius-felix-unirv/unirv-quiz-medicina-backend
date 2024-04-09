
# Routes

### Usuarios

* GET   /usuarios/:id
* GET   /cursos/:id/usuarios/:skip/:take
* GET   /cursos/:id/usuarios/ranking
* POST  /usuarios-campus
* POST  /usuarios
* PUT   /usuarios/:id
* PUT   /usuarios/:id/pontuacao
* PUT   /usuarios/:id/trocar-senha

### Campus

* GET    /usuarios/:id/campus
* GET    /campus/:id
* PUT    /campus/:id
* POST   /campus
* DELETE /campus/:id

### Quiz

* GET /quiz/:id
* GET /curso/:id/quiz/:skip/:take
* GET /quiz/:skip/:take
* POST /quiz
* PUT /quiz/:id

### Perguntas

* GET  /perguntas/:id
* GET  /usuarios/:usuariosid/quiz/:id/perguntas/:skip/:take
* POST /perguntas
* PUT  /perguntas/:id
* PUT  /perguntas/status/:id

### Alternativas 

* GET    /perguntas/:id/alternativas
* POST   /alternativas
* POST   /alternativas/many
* PUT    /alternativas/:id
* DELETE /alternativas/:id

### Categorias

* GET  /categorias/:id
* GET  /curso/:id/categorias
* POST /categorias
* PUT  /categorias/:id
* PUT  /categorias/:id/status

### Perguntas-Nivel

* GET    /niveis/:id
* GET    /niveis
* POST   /niveis
* PUT    /niveis/:id
* DELETE /niveis/:id

### Progresso-Perguntas

* GET  /usuarios/:id/progresso-perguntas
* POST /progresso-perguntas
* POST /progresso-perguntas/many

### Curso

* GET /cursos

### Email

* POST /send-email

### authentication

* POST /authentication

```json
{
    "name": "Pedro"
}
```