import { Mastra } from '@mastra/core';
import { LibSQLStore } from '@mastra/libsql';
import { researchWorkflow } from './workflows/researchWorkflow';
import { learningExtractionAgent } from './agents/learningExtractionAgent';
import { evaluationAgent } from './agents/evaluationAgent';
import { reportAgent } from './agents/reportAgent';
import { researchAgent } from './agents/researchAgent';
import { generateReportWorkflow } from './workflows/generateReportWorkflow';

export const mastra = new Mastra({
  storage: new LibSQLStore({
    url: process.env.DATABASE_URL || 'file:./mastra.db',
  }),
  agents: { researchAgent, reportAgent, evaluationAgent, learningExtractionAgent },
  workflows: { generateReportWorkflow, researchWorkflow },
});
