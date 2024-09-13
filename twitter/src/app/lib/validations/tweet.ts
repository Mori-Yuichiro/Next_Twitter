import { z } from "zod";

export const tweetPatchSchema = z.object({
    content: z.string()
        .min(1)
        .max(140, { message: "投稿は140文字以内にしてください" })
});

export type tweetPatchSchemaType = z.infer<typeof tweetPatchSchema>;