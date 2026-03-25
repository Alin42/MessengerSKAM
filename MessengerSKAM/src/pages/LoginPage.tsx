import WelcomeFrame from "../components/UI/AuthFrames/WelcomeFrame"
import RoomFooter from "../components/Footer/RoomFooter"
import RoomHeader from "../components/Header/RoomHeader"

function LoginPage() {
   return (
    <div>
        <RoomHeader/>
        <WelcomeFrame/>
        <RoomFooter/>
    </div>
  )
}

export default LoginPage