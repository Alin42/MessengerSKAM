import { useState } from 'react'
import axios from 'axios'

import { FrameWrapper } from './FrameWrapper'
import Label from '../../UI/Label/Label'
import TokenInput from '../../UI/Input/TokenInput'
import Button from '../../UI/Buttons/Button/Button'
import ArrowButton from '../../UI/Buttons/Button/ArrowButton'

import { API_URL } from '../../../api/config'
import styles from './frame.module.css'

type SignInProps = {
  onAction: (step: 'Continue' | 'Back', token?: string) => void
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
      await axios.post(`${API_URL}/api/login`, { token: trimmedToken })
      onAction('Continue', token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const messages: Record<number, string> = {
          409: 'User does not exist yet',
          400: 'Incorrect data',
        };
        setError(messages[status as number] || `Server Error (${status || 'Network'})`)
      } else {
        setError('Unexpected error')
      }
    } finally {
      setLoading(false)
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
          <TokenInput
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