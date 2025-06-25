import { Mastra } from '@mastra/core';
import { reportAgent, researchAgent, evaluationAgent, learningExtractionAgent } from './agents';
import { mainWorkflow, researchWorkflow } from './workflows';
import { LibSQLStore } from '@mastra/libsql';

export const mastra = new Mastra({
  storage: new LibSQLStore({
    url: 'file:../mastra.db',
  }),
  agents: { researchAgent, reportAgent, evaluationAgent, learningExtractionAgent },
  workflows: { mainWorkflow, researchWorkflow },
});
