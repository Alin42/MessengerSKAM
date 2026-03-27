import axios, { AxiosError } from "axios"
import { useState } from "react"

import Button from "../Buttons/Button.tsx"
import Label from "../Label/Label.tsx"
import TokenInput from "../LineEdit/TokenInput.tsx"
import ArrowButton from "../Buttons/ArrowButton.tsx"

import "./authFrame.css"
import { API_URL } from "../../../api/config.ts"


type SingInFrameProps = {
    onAction: (step: 'Back' | 'Continue') => void;
}

function SignInFrame({ onAction } : SingInFrameProps){
    const [token, setToken] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSingIn = async () => {
        setError(null);

        if (!token.trim()) {
            setError("Login can`t be empty");
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${API_URL}/api/login`, {
                token: token.trim(),
            });

            onAction("Continue");
        } catch (e: unknown) {
            const err = e as AxiosError;

            if (!err.response) {
                setError("Not connection to server");
                return;
            }

            switch (err.response.status) {
                case 409:
                    setError("User not exist yet");
                    break;
                case 400:
                    setError("Incorrect data");
                    break;
                default:
                    setError("Server Error");
            }
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="authFrame">
            <div className="icons">
                <ArrowButton direction="left" onClick={() => onAction("Back")}/>
            </div>
            <div className="authFrameCenter">
                <Label variant="title" >SKAM</Label>
                <div className="buttons">
                    <TokenInput onChange={setToken} value={token} />
                    <Button disabled={loading} onClick={handleSingIn}>Continue</Button>
                </div>
                <Label variant="caption" color="blue">Enter your account token to restore your account</Label>
                {error && (
                        <div className="errorText">
                            {error}
                        </div>
                    )}
            </div>
        </div>
    )
}
export default SignInFrame