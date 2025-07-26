// src/ai/flows/social-media-flow.ts
'use server';

/**
 * @fileOverview An AI flow for generating tailored social media posts for different platforms.
 *
 * This file defines a Genkit flow that takes a general post idea and creates specific versions
 * for Twitter, LinkedIn, and Facebook, adapting the tone and format for each platform.
 *
 * - `generateSocialMediaPosts` - A function to generate posts for multiple platforms.
 * - `SocialMediaPostInput` - The input type for the post generation function.
 * - `SocialMediaPostOutput` - The return type for the post generation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schema for a single generated social media post
const SocialMediaPostSchema = z.object({
  platform: z.enum(['Twitter', 'LinkedIn', 'Facebook']).describe('The social media platform for which the post is tailored.'),
  content: z.string().describe('The full content of the social media post, ready to be published.'),
});

// Input schema for the flow
const SocialMediaPostInputSchema = z.object({
  postIdea: z.string().describe('The core idea or message for the social media post.'),
});
export type SocialMediaPostInput = z.infer<typeof SocialMediaPostInputSchema>;

// Output schema for the flow, containing an array of generated posts
const SocialMediaPostOutputSchema = z.object({
  posts: z.array(SocialMediaPostSchema).describe('An array of generated social media posts, one for each specified platform.'),
});
export type SocialMediaPostOutput = z.infer<typeof SocialMediaPostOutputSchema>;

// The main function that will be called from the frontend
export async function generateSocialMediaPosts(input: SocialMediaPostInput): Promise<SocialMediaPostOutput> {
  return socialMediaPostFlow(input);
}

// Define the Genkit prompt
const socialMediaPrompt = ai.definePrompt({
  name: 'socialMediaPostPrompt',
  input: { schema: SocialMediaPostInputSchema },
  output: { schema: SocialMediaPostOutputSchema },
  prompt: `
    You are a social media marketing expert. Your task is to take a user's post idea and create tailored posts for Twitter, LinkedIn, and Facebook.

    User's Post Idea:
    "{{{postIdea}}}"

    For each platform, consider the following guidelines:

    - **Twitter**: Keep it concise, engaging, and use relevant hashtags. The tone should be conversational and punchy. Maximum 280 characters.
    - **LinkedIn**: Make it professional and insightful. Focus on the business value or professional aspect of the idea. Use professional hashtags. The tone should be more formal and detailed.
    - **Facebook**: Make it friendly and engaging. Encourage interaction with a question or a call to action. The tone can be more personal and visual.

    Generate a JSON object containing a list of social media posts, one for each platform (Twitter, LinkedIn, Facebook), following the output schema.
  `,
});

// Define the Genkit flow
const socialMediaPostFlow = ai.defineFlow(
  {
    name: 'socialMediaPostFlow',
    inputSchema: SocialMediaPostInputSchema,
    outputSchema: SocialMediaPostOutputSchema,
  },
  async (input) => {
    // Execute the prompt and get the structured output
    const { output } = await socialMediaPrompt(input);
    
    // The output will be automatically validated against the output schema.
    // If the LLM fails to produce valid JSON, Genkit will throw an error.
    return output!;
  }
);
