import { useState } from "react";
import Button from "../../UI/Buttons/Button/Button";
import styles from "./settings.module.css";
import Label from "../../UI/Label/Label";
import NickNameInput from "../../UI/Input/NickNameInput";
import TokenInput from "../../UI/Input/TokenInput";

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
}

function Settings({ isOpen, onClose }: SettingsProps) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen && !isClosing) return null;

  return (
    <div>
      <div className={`${styles.dim} ${isClosing ? styles.closingDim : ''}`} onClick={() => {
        setIsClosing(true)
        setTimeout(() => {
          onClose();
          setIsClosing(false);
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
          <NickNameInput onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          } }/>
          <TokenInput id="token" onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          } }></TokenInput>
          <TokenInput id="invite_token" onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          } }></TokenInput>
          <hr className={styles.separator}/>
          <Button id="reset_token" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }>Reset private token</Button>
          <Button id="reset_token" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }>Reset invite token</Button>
          <select className={styles.selectTheme}>
            <option value="classic">Classic theme</option>
            <option value="aurora">Aurora theme</option>
            <option value="pink">Pink theme</option>
          </select>
          <hr className={styles.separator}/>
          <Button id="log_out" theme="dark" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }><Label color="danger">Log out</Label></Button>
          <Button id="delete_account" theme="dark" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }><Label color="danger">Delete account</Label></Button>
          <hr className={styles.separator}/>
        </div>
      </div>
    </div>
  )
}


export default Settings;
