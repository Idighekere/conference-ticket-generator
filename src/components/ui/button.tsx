import { MouseEventHandler } from "react";

type ButtonProps = {
    title: string;
    variant?: "primary" | "secondary" | 'outline' | 'danger'
    className?: string;
    type?: "submit" | 'button' | 'reset'
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined | (() => void);
    disabled?: boolean
}
const Button = ({ title, variant = "primary", className, type = "button", onClick, disabled }: ButtonProps) => {

    let buttonStyles = ''
    switch (variant) {
        case 'primary':
            buttonStyles = ' bg-primary-green'
            break;
        case 'outline':
            buttonStyles = 'border-primary-green border text-primary-green'
            break;
        case 'danger':
            buttonStyles = 'bg-red-600  text-white'
            break;
        default:
            break;
    }


    return (
        <button className={`${buttonStyles} ${className} px-4 py-2 rounded-md cursor-pointer`} type={type} onClick={onClick} disabled={disabled} >{title}</button>
    )
}

export default Button
