import WelcomeFrame from "../components/UI/AuthFrames/WelcomeFrame"
import RoomFooter from "../components/Footer/RoomFooter"
import RoomHeader from "../components/Header/RoomHeader"
import SignInFrame from '../components/UI/AuthFrames/SignInFrame';
import RegistrationFrame from '../components/UI/AuthFrames/RegistrationFrame';
import { useState } from 'react';

export type AuthStep = 'Welcome' | 'SignIn' | 'Registration';

function AuthPage() {
    const [currentFrame, setCurrentFrame] = useState<AuthStep>('Welcome');

    const navigateTo = (step: AuthStep) => setCurrentFrame(step);

    return (
        <div>
            <RoomHeader/>
            {currentFrame === 'Welcome' && (
                <WelcomeFrame onAction={navigateTo} />
            )}

            {currentFrame === 'Registration' && (
                <RegistrationFrame onAction={() => navigateTo('Welcome')} />
            )}

            {currentFrame === 'SignIn' && (
                <SignInFrame onAction={() => navigateTo('Welcome')} />
            )}
            <RoomFooter/>
        </div>
    )
}

export default AuthPage