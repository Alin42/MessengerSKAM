import { useState } from 'react'
import axios, { AxiosError } from 'axios'

import { FrameWrapper } from './FrameWrapper'
import Label from '../Label/Label'
import Input from '../Input/Input'
import Button from '../Buttons/Button/Button'

import styles from './Frame.module.css'
import { API_URL } from '../../../api/config'
import ArrowButton from '../Buttons/Button/ArrowButton'

type RegistrationFrameProps = {
  onAction: (step: 'Create' | 'Back') => void
}

function RegistrationFrame({ onAction }: RegistrationFrameProps) {
  const [login, setLogin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setError(null)
    if (!login.trim()) return setError("Login can't be empty")

    try {
      setLoading(true)
      await axios.post(`${API_URL}/api/register`, { login: login.trim() })
      onAction('Create')
    } catch (e: unknown) {
      const err = e as AxiosError
      if (!err.response) return setError('No connection to server')

      switch (err.response.status) {
        case 409: setError('User already exists'); break
        case 400: setError('Incorrect data'); break
        default: setError('Server Error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <FrameWrapper variant='registration'>
      <div className={styles.arrowButtonWrapper}>
        <ArrowButton onClick={() => onAction("Back")} />
      </div>

      <div className={styles.FrameCenter}>
        <Label variant="title">SKAM</Label>
        <div className={styles.rowControllers}>
          <Label color="muted" variant="caption">Nick Name</Label>
          <Input placeholder="ivanIvanov4" value={login} onChange={setLogin} />
          <Button disabled={loading} onClick={handleRegister}>Create account</Button>
        </div>
      </div>

      <div className={styles.errorWrapper}>
      {error && <div className={styles.errorText}>{error}</div>}
      </div>
    </FrameWrapper>
  )
}
export default RegistrationFrame