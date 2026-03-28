import WelcomeFrame from "../components/UI/Frames/WelcomeFrame"
import "../styles/background.css"
import RoomFooter from "../components/Footer/RoomFooter"
import RoomHeader from "../components/Header/RoomHeader"
import SignInFrame from '../components/UI/Frames/SignInFrame';
import RegistrationFrame from '../components/UI/Frames/RegistrationFrame';
import { useState } from 'react';
import GridSVG from "../styles/GridSVG";

export type AuthStep = 'Welcome' | 'SignIn' | 'Registration';

function AuthPage() {
    const [currentFrame, setCurrentFrame] = useState<AuthStep>('Welcome');
    const navigateTo = (step: AuthStep) => setCurrentFrame(step);

    return (
        <div>
            <GridSVG />
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