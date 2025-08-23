import Elysia, { t } from 'elysia';
import { RecipeController } from '../controllers/recipe-controller';

export const setupRecipeRoutes = (app: Elysia, controller: RecipeController) => {
  return app.group('/recipes', (group) =>
    group
      .post(
        '/',
        (ctx) => controller.create(ctx), {
          body: t.Object({
            files: t.Files({
              minItems: 3,
              maxItems: 3,
              type: ['image/jpeg', 'image/png'],
              error: 'É necessário enviar exatamente 3 arquivos de imagem (JPEG ou PNG).'
            }),
          }),
          detail: { summary: 'Cria uma nova receita a partir de 3 imagens', tags: ['Recipes'] }
        }
      )
      .get('/', (ctx) => controller.list(ctx), {
        detail: { summary: 'Lista todas as receitas', tags: ['Recipes'] }
      })
      .get('/:id', (ctx) => controller.getById(ctx), {
        params: t.Object({ id: t.String({ format: 'uuid', error: 'ID inválido.' }) }),
        detail: { summary: 'Busca uma receita por ID', tags: ['Recipes'] }
      })
      .delete('/:id', (ctx) => controller.delete(ctx), {
        params: t.Object({ id: t.String({ format: 'uuid', error: 'ID inválido.' }) }),
        detail: { summary: 'Deleta uma receita por ID', tags: ['Recipes'] }
      })
  );
};