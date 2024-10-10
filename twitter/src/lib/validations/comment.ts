import { z } from "zod";

export const commentPatchSchema = z.object({
    comment: z.string()
        .min(1, { message: "コメントは1文字以上にしてください" })
});

export type commentPatchSchemaType = z.infer<typeof commentPatchSchema>;