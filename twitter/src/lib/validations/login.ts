import { z } from "zod";

export const loginPatchScheme = z.object({
    email: z.string()
        .min(1, { message: "Emailは1文字以上にしてください" })
        .email({ message: "Emailの形式が違います" }),
    password: z.string()
        .min(8, { message: "パスワードは8文字以上にしてください" })
});

export type LoginPatchSchemaType = z.infer<typeof loginPatchScheme>;