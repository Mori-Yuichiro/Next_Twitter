import useAuthFormHook from "@/hooks/auth/useAuthFormHook";
import Button from "./Button";

export default function UserAuthForm() {
    const {
        register,
        handleSubmit,
        errors,
        onSubmit,
        message,
        loading
    } = useAuthFormHook();

    return (
        <div className="w-full">
            {message && <p className="text-red-500">{message}</p>}
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <form action="">
                <div className="grid gap-3">
                    <div className="grid gap-y-3">
                        <label htmlFor="email">メールアドレス</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="test@example.com"
                            className="px-3 py-1"
                            {...register("email")}
                        />
                        <label htmlFor="password">パスワード</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            className="px-3 py-1"
                            {...register("password")}
                        />
                    </div>
                    <Button
                        className="border border-black rounded-lg text-white bg-black py-1"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin mx-auto" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M13 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM7.34 6.34a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm11.32 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0 11.32a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-11.32 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM21 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-8 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-8-8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" /></svg>
                            </>
                        ) : (
                            <>メールアドレスでログイン</>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}