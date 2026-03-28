import { useState } from 'react'
import axios, { AxiosError } from 'axios'

import { FrameWrapper } from './FrameWrapper'
import Label from '../Label/Label'
import Input from '../Input/Input'
import Button from '../Buttons/Button/Button'

import styles from './Frame.module.css'
import { API_URL } from '../../../api/config'
import ArrowButton from '../Buttons/Button/ArrowButton'

type SignInProps = {
  onAction: (step: 'Continue' | 'Back') => void
}

function SignInFrame({ onAction }: SignInProps) {
  const [token, setToken] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setError(null)
    if (!token.trim()) return setError("Token can't be empty")

    try {
      setLoading(true)
      await axios.post(`${API_URL}/api/login`, { token: token.trim() })
      onAction('Continue')
    } catch (e: unknown) {
      const err = e as AxiosError
      if (!err.response) return setError('No connection to server')

      switch (err.response.status) {
        case 409: setError('User not exist yet'); break
        case 400: setError('Incorrect data'); break
        default: setError('Server Error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <FrameWrapper variant='signIn'>
       <div className={styles.arrowButtonWrapper}>
        <ArrowButton onClick={() => onAction("Back")} />
      </div>
      <div className={styles.FrameCenter}>
        <Label variant="title">SKAM</Label>
        <div className={styles.rowControllers}>
          <Label color="muted" variant="caption">Token</Label>
          <Input
            placeholder="550e-8400-e29bf-jdksl-f923"
            value={token}
            onChange={setToken}
            type="password"
          />
          <Button disabled={loading} onClick={handleSignIn}>Continue</Button>
        </div>
        <Label color="primary" variant="caption">
          Enter your account token to restore your account
        </Label>
      </div>
      <div className={styles.errorWrapper}>
      {error && <div className={styles.errorText}>{error}</div>}
      </div>
    </FrameWrapper>
  )
}
export default SignInFrame