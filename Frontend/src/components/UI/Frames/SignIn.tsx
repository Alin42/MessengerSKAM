import { useState } from 'react'
import axios from 'axios'

import { FrameWrapper } from './FrameWrapper'
import Label from '../Label/Label'
import Input from '../Input/Input'
import Button from '../Buttons/Button/Button'
import ArrowButton from '../Buttons/Button/ArrowButton'

import { api } from "../../../api/api"
import styles from './frame.module.css'

type SignInProps = {
  onAction: (step: 'Continue' | 'Back') => void
};

function SignInFrame({ onAction }: SignInProps) {
  const [token, setToken] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    const trimmedToken = token.trim();
    if (!trimmedToken) return setError("Token can't be empty");

    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/api/login", {
        token: trimmedToken
      });

      localStorage.setItem("session_token", res.data.user.session_token);

      onAction('Continue');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        const messages: Record<number, string> = {
          401: 'Invalid token',
          404: 'User not found',
          400: 'Incorrect data',
        };

        setError(messages[status as number] || `Server Error (${status || 'Network'})`);
      } else {
        setError('Unexpected error');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <FrameWrapper>
      {/* HEADER */}
      <div className={styles.header}>
        <ArrowButton onClick={() => onAction('Back')} />
      </div>
      {/* BODY */}
      <div className={styles.body}>
        <Label variant="title">SKAM</Label>
        <div className={styles.rowControllers}>
          <Label color="muted" variant="caption">Token</Label>
          <Input
            placeholder="550e-8400-e29bf-jdksl-f923"
            value={token}
            onChange={setToken}
            type="password"
          />
          <Button disabled={loading} onClick={handleSignIn}>
            {loading ? 'Connecting...' : 'Continue'}
          </Button>
        </div>
        <div className={styles.footer}>
          <Label color="primary" variant="caption">
            Enter your account token to restore your account
          </Label>
          {/* ERROR */}
          <Label color="muted" variant="caption">
            {error && <span>{error}</span>}
          </Label>
        </div>
      </div>
    </FrameWrapper>
  );
}

export default SignInFrame;