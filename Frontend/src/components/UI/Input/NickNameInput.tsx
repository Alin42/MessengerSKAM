import Label from "../Label/Label";
import Input from "./Input";
import type { InputProps } from './Input';

import styles from "./input.module.css"

function NickNameInput(props: InputProps) {
  return (
  <div className={styles.inputWithCaption}>
    <Label color="muted" variant="caption">Nick Name</Label>
    <Input {...props}/>
  </div>
  )
}
export default NickNameInput
