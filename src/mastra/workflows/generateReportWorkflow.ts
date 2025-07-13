import { createStep, createWorkflow } from "@mastra/core/workflows";
import { researchWorkflow } from "./researchWorkflow";
import { writeFileSync } from 'fs';
import { z } from "zod";

// Map research output to report input and handle conditional logic
const processResearchResultStep = createStep({
  id: "process-research-result",
  inputSchema: z.object({
    approved: z.boolean(),
    researchData: z.any(),
  }),
  outputSchema: z.object({
    reportPath: z.string().optional(),
    completed: z.boolean(),
  }),
  execute: async ({ inputData, mastra }: { inputData: any; mastra: any }) => {
    // First determine if research was approved/successful
    const approved = inputData.approved && !!inputData.researchData;

    if (!approved) {
      console.log("Research not approved or incomplete, ending workflow");
      return { completed: false };
    }

    // If approved, generate report
    try {
      console.log("Generating report...");
      const agent = mastra.getAgent("reportAgent");
      const response = await agent.generate([
        {
          role: "user",
          content: `Generate a report based on this research: ${JSON.stringify(inputData.researchData)}`,
        }
      ]);

      const reportPath = "report.md";
      writeFileSync(reportPath, response.text);

      console.log("Report generated successfully!");
      return { reportPath, completed: true };
    } catch (error) {
      console.error("Error generating report:", error);
      return { completed: false };
    }
  }
});

// Create the report generation workflow that iteratively researches and generates reports
export const generateReportWorkflow = createWorkflow({
  id: "generate-report-workflow",
  steps: [researchWorkflow, processResearchResultStep],
  inputSchema: z.object({}),
  outputSchema: z.object({
    reportPath: z.string().optional(),
    completed: z.boolean(),
  }),
});

// The workflow logic:
// 1. Run researchWorkflow iteratively until approved
// 2. Process results and generate report if approved
generateReportWorkflow
  .dowhile(researchWorkflow, async ({ inputData }: { inputData: any }) => {
    const isCompleted = inputData.approved;
    return isCompleted !== true;
  })
  .then(processResearchResultStep)
  .commit();
