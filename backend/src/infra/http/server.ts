import Elysia from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { PgRecipeRepository } from '../database/pg-recipe-repository';
import { GeminiAIService } from '../ai/gemini-ai-service';
import { CreateRecipeUseCase } from '../../application/usecases/create-recipe-use-case';
import { ListRecipesUseCase } from '../../application/usecases/list-recipe-use-case';
import { GetRecipeByIdUseCase } from '../../application/usecases/get-recipe-by-id-use-case';
import { DeleteRecipeUseCase } from '../../application/usecases/delete-recipe-use-case';
import { RecipeController } from './controllers/recipe-controller';
import { setupRecipeRoutes } from './routes/recipe-routes';
import { cors } from '@elysiajs/cors';    

const app = new Elysia();
app.use(cors());

const recipeRepository = new PgRecipeRepository();
const aiService = new GeminiAIService();

const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository, aiService);
const listRecipesUseCase = new ListRecipesUseCase(recipeRepository);
const getRecipeByIdUseCase = new GetRecipeByIdUseCase(recipeRepository);
const deleteRecipeUseCase = new DeleteRecipeUseCase(recipeRepository);

const recipeController = new RecipeController(
  createRecipeUseCase,
  listRecipesUseCase,
  getRecipeByIdUseCase,
  deleteRecipeUseCase
);



setupRecipeRoutes(app, recipeController);
app.get('/', () => ({ status: 'FoodVision API is running!' }), {
  detail: {
    summary: 'Verifica o status da API',
    tags: ['Status'] 
  }
});

app.use(swagger({
    path: '/swagger',
    documentation: {
        info: {
            title: 'FoodVision API',
            version: '3.0.0',
            description: 'API para gerar receitas a partir de imagens (implementação direta com Google AI).'
        },
        tags: [
          { name: 'Recipes', description: 'Endpoints para gerenciar receitas' },
          { name: 'Status', description: 'Endpoints para verificar o status da API' }
        ]
    }
}));

export { app };