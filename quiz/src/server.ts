import Express from 'express';

const app = Express();

app.use(Express.json());

app.get('/', (req, res) => res.json({message: 'deu bom heheh'}));

app.listen(3001, () => console.log('rodando...'));