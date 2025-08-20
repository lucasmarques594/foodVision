import Elysia from 'elysia';
import { swagger } from '@elysiajs/swagger';
import 'dotenv/config';

const app = new Elysia();

app.use(swagger({
    path: '/swagger',
    documentation: {
        info: {
            title: 'FoodVision API',
            version: '1.0.0',
            description: 'API para gerar receitas a partir de imagens de ingredientes.'
        }
    }
}));


app.get('/', () => ({ status: 'FoodVision API Online!' }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🔥 FoodVision API está rodando em http://localhost:${port}`);
  console.log(`📚 Documentação da API disponível em http://localhost:${port}/swagger`);

});