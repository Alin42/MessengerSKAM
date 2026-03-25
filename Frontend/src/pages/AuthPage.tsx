import WelcomeFrame from "../components/UI/AuthFrames/WelcomeFrame"
import RoomFooter from "../components/Footer/RoomFooter"
import RoomHeader from "../components/Header/RoomHeader"

function AuthPage() {
   return (
    <div>
        <RoomHeader/>
        <WelcomeFrame/>
        <RoomFooter/>
    </div>
  )
}

export default AuthPage