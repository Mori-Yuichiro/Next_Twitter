import { z } from "zod";

export const messagePatchSchema = z.object({
    message: z.string()
        .min(1, { message: "メッセージは1文字以上にしてください" })
});

export type MessagePatchSchemaType = z.infer<typeof messagePatchSchema>;