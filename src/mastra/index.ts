import { Mastra } from '@mastra/core';
import { reportAgent, researchAgent, evaluationAgent } from './agents';
import { mainWorkflow } from './workflows';
import { LibSQLStore } from '@mastra/libsql';

export const mastra = new Mastra({
  storage: new LibSQLStore({
    url: 'file:../mastra.db',
  }),
  // @ts-ignore
  agents: { researchAgent, reportAgent, evaluationAgent },
  // @ts-ignore
  workflows: { mainWorkflow },
});
