import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NewsStyle, NewsTone, GeneratedNews } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const newsSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    headline: {
      type: Type.STRING,
      description: "Um título jornalístico impactante, claro e conciso.",
    },
    subtitle: {
      type: Type.STRING,
      description: "Um subtítulo (linha fina) que complementa o título com mais detalhes.",
    },
    body: {
      type: Type.STRING,
      description: "O corpo da notícia completo. Use parágrafos bem estruturados separados por duas quebras de linha (\\n\\n). Formate com Markdown simples se necessário (negrito para ênfase).",
    },
    keywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5 palavras-chave ou tags relevantes para SEO.",
    },
    readingTimeMinutes: {
      type: Type.INTEGER,
      description: "Tempo estimado de leitura em minutos.",
    }
  },
  required: ["headline", "subtitle", "body", "keywords", "readingTimeMinutes"],
};

export const generateNewsArticle = async (
  topic: string,
  style: NewsStyle,
  tone: NewsTone
): Promise<GeneratedNews> => {
  if (!apiKey) {
    throw new Error("API Key não configurada.");
  }

  const prompt = `
    Atue como um jornalista sênior de um grande veículo de comunicação.
    Sua tarefa é escrever uma notícia profissional baseada no seguinte tópico:
    "${topic}"

    Diretrizes Editoriais:
    - Estilo da notícia: ${style}
    - Tom de voz: ${tone}
    - Idioma: Português (Brasil)
    - O texto deve ser pronto para publicação, sem preâmbulos.
    - Fatos devem ser tratados com objetividade (a menos que o estilo seja opinativo).
    - Estrutura de pirâmide invertida (informações mais importantes primeiro).
    - Verifique a coesão e coerência textual.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: newsSchema,
        temperature: 0.7, // Balance between creativity and factual adherence
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Resposta vazia da IA.");
    }

    const data = JSON.parse(text);
    return {
      ...data,
      date: new Date().toISOString(),
    };

  } catch (error) {
    console.error("Erro ao gerar notícia:", error);
    throw new Error("Falha ao gerar a notícia. Tente novamente.");
  }
};