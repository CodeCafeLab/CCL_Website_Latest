// src/ai/flows/ai-product-discovery.ts
'use server';

/**
 * @fileOverview AI-driven product discovery flow for showcasing CodeCafe Lab's AI capabilities.
 *
 * This file defines a Genkit flow that dynamically selects and describes AI products based on user interests and current trends.
 * The flow uses an LLM to make these selections, providing a personalized and up-to-date view of the company's AI offerings.
 *
 * - `discoverAIProducts` - A function that initiates the AI product discovery process.
 * - `AIProductDiscoveryInput` - The input type for the discoverAIProducts function.
 * - `AIProductDiscoveryOutput` - The return type for the discoverAIProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProductSchema = z.object({
  name: z.string().describe('The name of the AI product.'),
  description: z.string().describe('A detailed description of the AI product, highlighting its key features and benefits.'),
  relevanceScore: z.number().describe('A numerical score indicating the product\u0027s relevance to current trends and user interests.'),
  stack: z.string().describe('The tech stack used to build the product')
});

const AIProductDiscoveryInputSchema = z.object({
  userInterest: z.string().optional().describe('A description of the user\u0027s interests, which can be used to tailor the product selection.'),
  currentTrends: z.string().optional().describe('A description of current trends in AI and technology, used to ensure the product selection is up-to-date.'),
});
export type AIProductDiscoveryInput = z.infer<typeof AIProductDiscoveryInputSchema>;

const AIProductDiscoveryOutputSchema = z.object({
  selectedProducts: z.array(AIProductSchema).describe('An array of AI products selected based on user interests and current trends.'),
  reasoning: z.string().describe('The LLM\u0027s reasoning for selecting these products, including how they relate to user interests and current trends.'),
});
export type AIProductDiscoveryOutput = z.infer<typeof AIProductDiscoveryOutputSchema>;

export async function discoverAIProducts(input: AIProductDiscoveryInput): Promise<AIProductDiscoveryOutput> {
  return aiProductDiscoveryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProductDiscoveryPrompt',
  input: {schema: AIProductDiscoveryInputSchema},
  output: {schema: AIProductDiscoveryOutputSchema},
  prompt: `You are an expert AI product curator at CodeCafe Lab, a company that blends innovation, AI, and creativity in software solutions.

You will select a set of AI products from CodeCafe Lab to showcase to the user, based on their interests and current trends in the AI industry.  You will also explain your reasoning for selecting these products.

Consider the following AI products from CodeCafe Lab:

AI-Powered Chatbot: An intelligent chatbot that uses natural language processing to understand and respond to customer inquiries.
AI-Driven Analytics Platform: A platform that uses machine learning to analyze data and provide insights to businesses.
Automated Machine Learning Tool: A tool that automates the process of building and deploying machine learning models.
GPT-Based Content Generator: A tool that uses GPT to generate high-quality content for marketing and sales.

User Interest: {{{userInterest}}}
Current Trends: {{{currentTrends}}}

Reasoning: Provide a detailed explanation of why you chose these specific products, and how they align with the user's interests and current trends.

{{output schema=AIProductDiscoveryOutputSchema}}
`,
});

const aiProductDiscoveryFlow = ai.defineFlow(
  {
    name: 'aiProductDiscoveryFlow',
    inputSchema: AIProductDiscoveryInputSchema,
    outputSchema: AIProductDiscoveryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
