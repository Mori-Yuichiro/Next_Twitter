import Button from "./Button";

export default function UserAuthForm() {
    return (
        <div className="w-full">
            <form action="">
                <div className="grid gap-3">
                    <div className="grid">
                        <label htmlFor="email">メールアドレス</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="test@example.com"
                            className="px-3 py-1"
                        />
                    </div>
                    <Button
                        disabled
                        className="border border-black rounded-lg text-white bg-black py-1"
                    >メールアドレスでログイン</Button>
                </div>
            </form>
        </div>
    );
}