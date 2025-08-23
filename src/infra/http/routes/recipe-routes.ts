import Elysia, { t } from 'elysia';
import { RecipeController } from '../controllers/recipe-controller';

const recipeDtoSchema = t.Object({
  id: t.String({ format: 'uuid', description: 'O ID único da receita' }),
  ingredientes: t.Array(t.String(), { description: 'Lista de ingredientes identificados' }),
  receita: t.String({ description: 'O nome da receita gerada' }),
  modo_preparo: t.String({ description: 'As instruções detalhadas para preparar a receita' }),
  data_criacao: t.String({ format: 'date-time', description: 'A data e hora de quando a receita foi criada' }),
});

const errorSchema = t.Object({
  error: t.String(),
});


export const setupRecipeRoutes = (app: Elysia, controller: RecipeController) => {
  const boundController = {
    create: controller.create.bind(controller),
    list: controller.list.bind(controller),
    getById: controller.getById.bind(controller),
    delete: controller.delete.bind(controller),
  };

  return app.group('/recipes', (group) =>
    group
      .post(
        '/',
        boundController.create, 
        {
          body: t.Object({
            files: t.Files({
              minItems: 3,
              maxItems: 3,
              type: ['image/jpeg', 'image/png'],
              error: 'É necessário enviar exatamente 3 arquivos de imagem (JPEG ou PNG).'
            }),
          }),
          detail: {
            summary: 'Cria uma nova receita a partir de 3 imagens',
            description: 'Faz o upload de 3 imagens de ingredientes. A IA identifica os ingredientes e gera uma receita única que é salva no banco de dados.',
            tags: ['Recipes']
          },
          response: {
            201: recipeDtoSchema,
            400: errorSchema,
            500: errorSchema
          }
        }
      )

      .get(
        '/', 
        boundController.list, 
        {
          detail: {
            summary: 'Lista todas as receitas geradas',
            description: 'Retorna um array com todas as receitas que foram criadas e salvas no banco de dados.',
            tags: ['Recipes']
          },
          response: {
            200: t.Array(recipeDtoSchema)
          }
        }
      )

      .get(
        '/:id', 
        boundController.getById, 
        {
          params: t.Object({ 
            id: t.String({ 
              format: 'uuid', 
              description: 'O ID da receita a ser buscada',
              error: 'O ID fornecido é inválido.' 
            }) 
          }),
          detail: {
            summary: 'Busca uma receita específica por ID',
            tags: ['Recipes']
          },
          response: {
            200: recipeDtoSchema,
            404: errorSchema
          }
        }
      )
      .delete(
        '/:id', 
        boundController.delete, 
        {
          params: t.Object({ 
            id: t.String({ 
              format: 'uuid', 
              description: 'O ID da receita a ser deletada',
              error: 'O ID fornecido é inválido.' 
            }) 
          }),
          detail: {
            summary: 'Remove uma receita específica',
            tags: ['Recipes']
          },
          response: {
            204: t.Void(),
            404: errorSchema
          }
        }
      )
  );
};