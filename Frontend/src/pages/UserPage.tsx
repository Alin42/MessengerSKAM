import { useState } from 'react';
import MinimalFooter from "../components/Footer/MinimalFooter";
import MinimalHeader from "../components/Header/MinimalHeader";
import './userpage.css'

function UserPage(){
    return(
        <>
        <MinimalHeader/>
        <div className='user page wrapper'>
            <h1>UserPage</h1>
        </div>
        <MinimalFooter/>
        </>
    )
}
export default UserPage