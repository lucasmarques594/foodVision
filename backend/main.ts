import { app } from './src/infra/http/server';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🔥 FoodVision API está rodando em http://localhost:${port}`);
  console.log(`📚 Documentação da API disponível em http://localhost:${port}/swagger`);
});