import axiosInstance from "@/lib/axiosInstance";
import { registerPatchScheme, RegisterPatchSchemeType } from "@/lib/validations/register";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function useRegisterModalHook() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterPatchSchemeType>({
        resolver: zodResolver(registerPatchScheme)
    });

    const [message, setMessage] = useState<string | null>(null);

    const { instance } = axiosInstance();

    const router = useRouter();

    const onSubmit = async (data: RegisterPatchSchemeType) => {
        try {
            const response = await instance.post("/api/auth/register", data);

            if (response.status === 200) router.push("/login");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setMessage(err.response.data.message);
            } else {
                setMessage("unexpected error");
            }
        }
    }

    return {
        message,
        register,
        handleSubmit,
        errors,
        onSubmit,
    };
}