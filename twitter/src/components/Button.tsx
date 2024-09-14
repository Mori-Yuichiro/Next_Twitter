import { ButtonType } from "../types/button/Button";

export default function Button({ children, ...props }: ButtonType) {
    return (
        <button {...props}>{children}</button>
    );
}