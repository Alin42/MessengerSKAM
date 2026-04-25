import Label from "../Label/Label";
import Input from "./Input";
import type { InputProps } from './Input';

import styles from "./input.module.css"

function TokenInput(props: InputProps) {
  return (
  <div className={styles.inputWithCaption}>
    <Label color="muted" variant="caption">Token</Label>
    <Input {...props}/>
  </div>
  )
}
export default TokenInput
