import { z } from "zod";

export const sugestionModel = z.string();

export const suggestionsModel = z.array(sugestionModel);

export type Suggestion = z.infer<typeof sugestionModel>;
