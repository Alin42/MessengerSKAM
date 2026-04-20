import { useState } from "react";
import Button from "../../UI/Buttons/Button/Button";
import styles from "./settings.module.css";

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
}

function Settings({ isOpen, onClose }: SettingsProps) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen && !isClosing) return null;

  return (
    <div>
      <div className={styles.dim} onClick={() => {
        setIsClosing(true)
        setTimeout(() => {
          onClose();
          setIsClosing(false);
        }, 299) // 300 - eps
      }}>
      </div>
      <div className={`${styles.settings} ${isClosing ? styles.closingSettings : ''}`}>
        <div className={`${styles.settingsButtons} ${isClosing ? styles.closingDim : ''}`}>
          <Button onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }>a</Button>
          <hr className={styles.separator}/>
          <Button onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }>b</Button>
          <Button onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }>c</Button>
        </div>
      </div>
    </div>
  )
}


export default Settings;
