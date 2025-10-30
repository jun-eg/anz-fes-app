import z from "zod";

export const OpenAIOutputSchema = z.object({
  results: z.array(
    z.object({
      memberId: z.string(),
      name: z.string(),
      assigned: z.array(
        z.object({
          slotId: z.string(),
          date: z.string(), // "YYYY-MM-DD"
          start: z.string(), // "HH:mm"
          end: z.string(), // "HH:mm"
          role: z.string(),
        })
      ),
    })
  ),
  creationResult: z.object({
    ok: z.boolean(),
    reasons: z.array(z.string()),
  }),
});

export type FestivalShiftPlan = z.infer<typeof OpenAIOutputSchema>;
