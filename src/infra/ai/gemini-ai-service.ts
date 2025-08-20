import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
import { IAIService } from './ai-service';


export class GeminiAIService implements IAIService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  private visionModel = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
  private textModel = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

  private async fileToGenerativePart(file: File) {
    const buffer = await file.arrayBuffer();
    return {
      inlineData: {
        data: Buffer.from(buffer).toString('base64'),
        mimeType: file.type,
      },
    };
  }

  async identifyIngredientsFromImages(images: File[]): Promise<string[]> {
    const imageParts = await Promise.all(images.map(this.fileToGenerativePart));

    const prompt = `
      Analise estas imagens e liste todos os ingredientes comestíveis que você vê.
      Responda apenas com uma lista de ingredientes separados por vírgula, em português e em letras minúsculas.
      Exemplo: tomate, cebola, alho, manjericão
    `;

    const result = await this.visionModel.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
    
    return responseText.split(',').map(ingredient => ingredient.trim()).filter(Boolean);
  }

  async generateRecipeFromIngredients(ingredients: string[]): Promise<{ recipeName: string; instructions: string }> {
    const prompt = `
      Você é um chef de cozinha criativo. Crie uma receita única em português usando os seguintes ingredientes: ${ingredients.join(', ')}.
      A resposta DEVE ser um objeto JSON, e nada mais, com a seguinte estrutura:
      {
        "recipeName": "Nome Criativo da Receita",
        "instructions": "Modo de preparo detalhado em passos (use \\n para novas linhas)."
      }
    `;

    const result = await this.textModel.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(jsonString);
      return {
        recipeName: parsed.recipeName,
        instructions: parsed.instructions,
      };
    } catch (error) {
      console.error("Falha ao parsear resposta da IA:", responseText);
      throw new Error("Não foi possível gerar uma receita válida da IA.");
    }
  }
}