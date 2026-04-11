import { useState, type JSX } from 'react';
import WelcomeFrame from "../components/Frames/Auth/Welcome";
import SignInFrame from "../components/Frames/Auth/SignIn";
import RegistrationFrame from "../components/Frames/Auth/Registration";
import RoomFooter from "../components/UI/Footer/RoomFooter";
import RoomHeader from "../components/UI/Header/RoomHeader";
import GridSVG from "../styles/GridSVG";

import styles from "./auth.module.css";
import "../styles/background.css";

export type AuthStep = 'Welcome' | 'SignIn' | 'Registration';
export type FrameAction = AuthStep | 'Create' | 'Continue' | 'Back';

export default function AuthPage() {
  const [step, setStep] = useState<AuthStep>('Welcome');

  const handleAction = (action: FrameAction) => {
    if (action === 'Back') return setStep('Welcome');
    if (action === 'Create') {
      return console.log('Redirecting after registration...');
    }
    if (action === 'Continue') {
      return console.log('Redirecting after sign in...');
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
            {frames[step]}
        </main>
        {/* FOOTER */}
        <RoomFooter />
    </div>
  );
}