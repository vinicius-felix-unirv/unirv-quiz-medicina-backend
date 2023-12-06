import Express from 'express';

const app = Express();

app.use(Express.json());

app.get('/', (req, res) => res.json({message: 'deu bom outra vez'}));

app.listen(3002, () => console.log('rodando...'));