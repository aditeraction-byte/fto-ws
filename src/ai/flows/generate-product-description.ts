'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product descriptions.
 *
 * - generateProductDescription - A function that generates a product description based on product details.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the product.'),
  articleNo: z.string().describe('The article number of the product.'),
  imageUrl: z.string().describe('The URL of the product image.').optional(),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in writing engaging product descriptions.  Generate a compelling product description for the following product:

Product Name: {{{name}}}
Article Number: {{{articleNo}}}
{{#if imageUrl}}
Image URL: {{{imageUrl}}}
{{/if}}

Write a description that is approximately 100 words and highlights the key features and benefits of the product. Make it sound appealing to customers and encourage them to purchase the product. Focus on the emotional connection a customer might have with the product. 
`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
