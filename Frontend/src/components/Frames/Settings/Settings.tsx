import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Cookies } from "react-cookie";

import Button from "../../UI/Buttons/Button/Button";
import Label from "../../UI/Label/Label";
import NickNameInput from "../../UI/Input/NickNameInput";
import TokenInput from "../../UI/Input/TokenInput";

import styles from "./settings.module.css";
import ThemeSelector from "./ThemeSelector";

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

const cookies = new Cookies();

function Settings({ isOpen, onClose }: SettingsProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const actionRef = useRef<() => void>(() => {});

  if (!isOpen && !isClosing) return null;

  // ---------- ACTIONS ----------
  function handleNickChange(value: string) {
    console.log("nick:", value);
  }

  function handlePrivateTokenReset() {
    console.log("reset private token");
  }

  function handleInviteTokenReset() {
    console.log("reset invite token");
  }

  function handleLogOut() {
    cookies.remove("session_token", { path: "/" });
    onClose();
  }

  function handleDeleteAccount() {
    console.log("delete account");
  }

  // ---------- MODAL ----------
  function ask(action: () => void) {
    actionRef.current = action;
    setShowModal(true);
  }

  function confirm() {
    actionRef.current();
    setShowModal(false);
    actionRef.current = () => {};
  }

  function closeModal() {
    setShowModal(false);
    actionRef.current = () => {};
  }

  // ---------- CLOSE PANEL ----------
  function closeSettings() {
    setIsClosing(true);
    setShowModal(false);

    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }

  return (
    <div>
      {/* MODAL */}
      {showModal &&
        createPortal(
          <div className={styles.modal}>
            <Label>Are you sure?</Label>

            <div className={styles.modalButtons}>
              <Button onClick={confirm}>Yes</Button>
              <Button onClick={closeModal}>No</Button>
            </div>
          </div>,
          document.body
        )}

      {/* BACKDROP */}
      <div
        className={`${styles.dim} ${isClosing ? styles.closingDim : ""}`}
        onClick={closeSettings}
      />

      {/* PANEL */}
      <div className={`${styles.settings} ${isClosing ? styles.closingSettings : ""}`}>
        <div className={styles.settingsButtons}>
          <Label variant="title">Settings</Label>

          <hr className={styles.separator} />

          <Label>Here you can change your nick</Label>
          <Label>or reset your token</Label>

          <hr className={styles.separator} />

          <NickNameInput onChange={handleNickChange} />

          <TokenInput noChange id="token" onChange={() => {}} />
          <TokenInput noChange id="invite_token" onChange={() => {}} />

          <hr className={styles.separator} />

          <Button onClick={handlePrivateTokenReset}>
            Reset private token
          </Button>

          <Button onClick={handleInviteTokenReset}>
            Reset invite token
          </Button>

          {/* THEME */}
          <ThemeSelector/>

          <hr className={styles.separator} />

          {/* ACTIONS */}
          <div className={styles.stickToBottom}>
            <hr className={styles.separator} />

            <Button theme="dark" onClick={() => ask(handleLogOut)}>
              <Label color="danger">Log out</Label>
            </Button>

            <Button theme="dark" onClick={() => ask(handleDeleteAccount)}>
              <Label color="danger">Delete account</Label>
            </Button>

            <hr className={styles.separator} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;