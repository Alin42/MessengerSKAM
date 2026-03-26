/*import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';*/
import WelcomeFrame from "../components/UI/AuthFrames/WelcomeFrame"
import RoomFooter from "../components/Footer/RoomFooter"
import RoomHeader from "../components/Header/RoomHeader"
import SignInFrame from '../components/UI/AuthFrames/SignInFrame';
import RegistrationFrame from '../components/UI/AuthFrames/RegistrationFrame';
import { useState } from 'react';

function AuthPage() {
    const [currentFrame, setCurrentFrame] = useState<'Welcome' | 'SignIn' | 'Registration'>('Welcome');

    const handleSwitchToSignIn = () => {
        setCurrentFrame('SignIn');
    };

    const handleSwitchToRegistration = () => {
        setCurrentFrame('Registration');
    };

   return (
    <div>
        <RoomHeader/>
        {currentFrame === 'Welcome' && <WelcomeFrame handleSwitchToRegistration={handleSwitchToRegistration} handleSwitchToSignIn={handleSwitchToSignIn}/>}
        {currentFrame === 'Registration' && <RegistrationFrame/>}
        {currentFrame === 'SignIn' && <SignInFrame />}
        
        {/* Другой способ это сделать. Но тогда нужно как-то подругому handleSwitchToSignIn писать. Сложно.
        <Routes>
            <Route path="welcome" element={<WelcomeFrame handleSwitchToRegistration={handleSwitchToRegistration} handleSwitchToSignIn={handleSwitchToSignIn}/>} />
            <Route path="registration" element={<RegistrationFrame />} />
            <Route path="signin" element={<SignInFrame />} />
        </Routes>
        */}
        <RoomFooter/>
    </div>
  )
}

export default AuthPage