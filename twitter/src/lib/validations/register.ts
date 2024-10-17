import { z } from "zod";

export const registerPatchScheme = z.object({
    name: z.string()
        .min(1, { message: "名前は1文字以上にしてください" }),
    email: z.string()
        .min(1, { message: "Emailは1文字以上にしてください" })
        .email({ message: "Emailの形式が違います" }),
    password: z.string()
        .min(8, { message: "パスワードは8文字以上にしてください" })
});

export type RegisterPatchSchemeType = z.infer<typeof registerPatchScheme>;