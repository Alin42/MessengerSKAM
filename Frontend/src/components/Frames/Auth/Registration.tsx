import { useState } from 'react';
import axios from 'axios';

import { FrameWrapper } from './FrameWrapper';
import Label from '../../UI/Label/Label';
import NickNameInput from '../../UI/Input/NickNameInput';
import Button from '../../UI/Buttons/Button/Button';
import ArrowButton from '../../UI/Buttons/Button/ArrowButton';

import { API_URL } from '../../../api/config';
import styles from './frame.module.css';

type RegistrationFrameProps = {
  onAction: (step: 'Create' | 'Back', token?: string) => void;
};

function RegistrationFrame({ onAction }: RegistrationFrameProps) {
  const [login, setLogin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const trimmedLogin = login.trim();
    if (!trimmedLogin) return setError("Login can't be empty");

    setError(null);
    setLoading(true);

    try {
      const posted = await axios.post(`${API_URL}/api/register`, { login: trimmedLogin })
      onAction('Create', posted.data.user.session_token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const messages: Record<number, string> = {
          409: 'User already exists',
          400: 'Incorrect data',
        };
        setError(messages[status as number] || `Error: ${status || 'Network'}`);
      } else {
        setError('Unexpected error');
      }
    } finally {
      setLoading(false);
    }
  };

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
          <Label color="muted" variant="caption">Nick Name</Label>
          <NickNameInput 
            placeholder="ivanIvanov4" 
            value={login} 
            onChange={setLogin} 
          />
          <Button disabled={loading} onClick={handleRegister}>
            {loading ? 'Processing...' : 'Create account'}
          </Button>
        </div>
        <div className={styles.footer}>
          {/* ERROR */}
          <Label color="muted" variant="caption">
            {error && <span>{error}</span>}
          </Label>
        </div>
      </div>
    </FrameWrapper>
  );
}

export default RegistrationFrame;