import Label from "../components/UI/Label/Label"
import './error.css'

function NotFound() {
   return (
    <div className="error">
        <Label variant="title">404</Label>
        <Label variant="subtitle">Page not found</Label>
        <div></div>
        <Label color="blue">Return home</Label>
    </div>
  )
}

export default NotFound