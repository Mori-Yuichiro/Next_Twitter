import { loginPatchScheme, LoginPatchSchemaType } from "@/lib/validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useAuthFormHook() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginPatchSchemaType>({
        resolver: zodResolver(loginPatchScheme)
    });

    const [message, setMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (data: LoginPatchSchemaType) => {
        try {
            const { email, password } = data;

            const response = await signIn("credentials", {
                redirect: false,
                email,
                password
            });

            if (response) {
                if (response.ok) {
                    setLoading(true);
                    router.push("/home");
                }

                if (response.error) {
                    reset({ email: "", password: "" });
                    setMessage(response?.error);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        message,
        loading
    };
}