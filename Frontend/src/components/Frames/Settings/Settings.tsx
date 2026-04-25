import { useRef, useState, type SyntheticEvent } from "react";
import { createPortal } from 'react-dom';
import { Cookies } from 'react-cookie';
import Button from "../../UI/Buttons/Button/Button";
import Label from "../../UI/Label/Label";
import NickNameInput from "../../UI/Input/NickNameInput";
import TokenInput from "../../UI/Input/TokenInput";

import styles from "./settings.module.css";

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
}

function Settings({ isOpen, onClose }: SettingsProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const currentFuncRef = useRef<() => void>(() => {});
  const cookies = new Cookies();

  if (!isOpen && !isClosing) return null;

  function selectTheme(event: SyntheticEvent<HTMLSelectElement, Event>): void {
    cookies.set('theme', (event.target as HTMLSelectElement).value, { path: '/'})
  }

  function handleNickChange(value: string): void {
    // FIXME: go rename self
  }

  function handlePrivateTokenReset(): void {
    // FIXME: go reset
  }

  function handleInviteTokenReset(): void {
    // FIXME: go reset
  }

  const handleLogOut = () => {
    // FIXME: go log out
    cookies.remove("session_token", {path: '/'})
  }

  const handleDeleteAccount = () => {
    // FIXME: go delete acc
  }

  return (
    <div>
      {showModal && createPortal(
        <div className={styles.modal}>
          <Label>Are you sure?</Label>
          <div className={styles.modalButtons}>
            <Button onClick={()=>{setShowModal(false), currentFuncRef.current()}}>Yes</Button>
            <Button onClick={()=>{setShowModal(false)}}>No</Button>
          </div>
        </div>,
        document.body
      )}
      <div className={`${styles.dim} ${isClosing ? styles.closingDim : ''}`} onClick={() => {
        setIsClosing(true)
        setShowModal(false)
        setTimeout(() => {
          onClose();
          setIsClosing(false);
          // FIXME: (for future) can't change style of a reactdom inside of component
          // which means dim dissapears instantly instead of gradually
        }, 300)
      }}>
      </div>
      <div className={`${styles.settings} ${isClosing ? styles.closingSettings : ''}`}>
        <div className={styles.settingsButtons}>
          <Label variant="title">Settings</Label>
          <hr className={styles.separator}/>
          <Label>Here you can change your nick</Label>
          <Label>or reset your token</Label>
          <hr className={styles.separator}/>
          <NickNameInput onChange={handleNickChange}/>
          <TokenInput noChange={true} id="token" onChange={()=>{}}></TokenInput>
          <TokenInput noChange={true} id="invite_token" onChange={()=>{}}></TokenInput>
          <hr className={styles.separator}/>
          <Button id="reset_token" onClick={handlePrivateTokenReset}>Reset private token</Button>
          <Button id="reset_token" onClick={handleInviteTokenReset}>Reset invite token</Button>
          <select className={styles.selectTheme} onChange={selectTheme} defaultValue={cookies.get('theme')}>
            <option value="classic">Classic theme</option>
            <option value="aurora">Aurora theme</option>
            <option value="pink">Pink theme</option>
          </select>
          <hr className={styles.separator}/>
          <div className={styles.stickToBottom}>
            <hr className={styles.separator}/>
            <Button id="log_out" theme="dark" onClick={() => {currentFuncRef.current = handleLogOut; setShowModal(true)}}><Label color="danger">Log out</Label></Button>
            <Button id="delete_account" theme="dark" onClick={() => {currentFuncRef.current = handleDeleteAccount; setShowModal(true)}}><Label color="danger">Delete account</Label></Button>
            <hr className={styles.separator}/>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Settings;
