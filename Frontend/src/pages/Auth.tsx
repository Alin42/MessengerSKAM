import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import WelcomeFrame from "../components/Frames/Auth/Welcome";
import SignInFrame from "../components/Frames/Auth/SignIn";
import RegistrationFrame from "../components/Frames/Auth/Registration";
import RoomFooter from "../components/UI/Footer/RoomFooter";
import RoomHeader from "../components/UI/Header/RoomHeader";
import GridSVG from "../styles/GridSVG";

import styles from "./auth.module.css";
import "../styles/background.css";
import LogoFrame from '../components/Frames/Auth/Logo';

export type AuthStep = 'Welcome' | 'SignIn' | 'Registration';
export type FrameAction = AuthStep | 'Create' | 'Continue' | 'Back';


export default function AuthPage() {
  const [step, setStep] = useState<AuthStep>('Welcome');
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  const handleAction = (action: FrameAction, session_token?: string) => {
    if (action === 'Back') return setStep('Welcome');
    if (action === 'Create' || action === 'Continue') {
      cookies.set('session_token', session_token, { path: '/', maxAge: 5_000_000 });
      navigate("/home/");
      return;
    }
    setStep(action);
  }

  const frames: Record<AuthStep, JSX.Element> = {
    Welcome: <WelcomeFrame onAction={handleAction} />,
    SignIn: <SignInFrame onAction={handleAction} />,
    Registration: <RegistrationFrame onAction={handleAction} />,
  }
  return (
    <div className={styles.authContainer}>
        {/* BACKGROUND */}
        <GridSVG />
        {/* HEADER */}
        <RoomHeader />
        {/* MAIN */}
        <main className={styles.main}>
            <LogoFrame opened={step == 'Welcome'}></LogoFrame>
            {frames[step]}
        </main>
        {/* FOOTER */}
        <RoomFooter />
    </div>
  );
}