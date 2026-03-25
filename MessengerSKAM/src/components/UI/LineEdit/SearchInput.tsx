import "./lineEdit.css"

type SearchInputProps = {
  hidden?: boolean
  size?: "small" | "medium" | "large"
  theme?: "blue"
}

function SearchInput({ hidden = true, size = "medium", theme = "blue" }: SearchInputProps) {
  return (
    <input className={`line edit ${hidden} ${size} ${theme}`}/>
  )
}

export default SearchInput