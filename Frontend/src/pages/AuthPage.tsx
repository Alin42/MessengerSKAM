import WelcomeFrame from "../components/UI/AuthFrames/WelcomeFrame"
import RoomFooter from "../components/Footer/RoomFooter"
import RoomHeader from "../components/Header/RoomHeader"
import SignInFrame from '../components/UI/AuthFrames/SignInFrame';
import RegistrationFrame from '../components/UI/AuthFrames/RegistrationFrame';
import { useState } from 'react';

export type AuthStep = 
  | 'Welcome' 
  | 'SignIn' 
  | 'Registration'
  | 'Create'
  | 'Continue'

function AuthPage() {
    const [currentFrame, setCurrentFrame] = useState<AuthStep>('Welcome');

    const handleStep = (step: AuthStep) => {
        if (step === 'Create') {
            console.log('user must be created here');
        } else if (step === 'Continue') {
            console.log('user must be logged in here');
        } else {
            setCurrentFrame(step);
        }
    }

    return (
        <div>
            <RoomHeader/>
            {currentFrame === 'Welcome' && (
                <WelcomeFrame onAction={handleStep} />
            )}

            {currentFrame === 'Registration' && (
                <RegistrationFrame onAction={handleStep} />
            )}

            {currentFrame === 'SignIn' && (
                <SignInFrame onAction={handleStep} />
            )}
            <RoomFooter/>
        </div>
    )
}

export default AuthPage