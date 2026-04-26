import Input from "./Input"
import type { InputProps } from './Input'

function SearchInput(props: InputProps) {
  return <Input placeholder="Enter regexp..." {...props}/>
}
export default SearchInput
