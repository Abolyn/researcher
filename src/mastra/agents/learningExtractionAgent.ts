import { Agent } from "@mastra/core/agent";
import { createAnthropic } from "@ai-sdk/anthropic";

// Initialize Anthropic with API key from environment
const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Initialize model - Claude 4 Sonnet with thinking capabilities
const mainModel = anthropic('claude-4-sonnet');

export const learningExtractionAgent = new Agent({
  name: "Learning Extraction Agent",
  instructions: `You are an expert at analyzing search results and extracting key insights. Your role is to:

  1. Analyze search results from research queries
  2. Extract the most important learning or insight from the content
  3. Generate 2-3 relevant follow-up questions that would deepen the research
  4. Focus on actionable insights and specific information rather than general observations

  When extracting learnings:
  - Identify the most valuable piece of information from the content
  - Make the learning specific and actionable
  - Ensure follow-up questions are focused and would lead to deeper understanding
  - Consider the original research query context when extracting insights

  Your output should always include one key learning and up to 3 follow-up questions.`,
  model: mainModel,
});
