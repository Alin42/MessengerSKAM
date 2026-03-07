type ButtonProps = {
    onClick: () => void;
    label: string;
}

function Button({onClick, label} : ButtonProps){
    return <button onClick={onClick}>{label}</button>
}

export default Button