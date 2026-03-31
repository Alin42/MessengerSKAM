import ChatMenu from "../components/UI/ChatMenu/ChatMenu"
import styles from "./user.module.css"

function UserPage(){
    return(
        <div className={styles.UserPage}>
            <div className={styles.background}>
                <header></header>
                <main>
                    <ChatMenu></ChatMenu>
                    <h1>UserPage</h1>
                </main>
                <footer></footer>
            </div>
        </div>
    )
}
export default UserPage