import { type SyntheticEvent } from "react";
import { Cookies } from "react-cookie";

import styles from "./settings.module.css";

const cookies = new Cookies();

function ThemeSelector() {
  function selectTheme(event: SyntheticEvent<HTMLSelectElement>) {
    const value = (event.target as HTMLSelectElement).value;
    cookies.set("theme", value, { path: "/", sameSite: "strict" });
    document.documentElement.setAttribute("data-theme", value);
  }

  return (
    <select
      className={styles.selectTheme}
      onChange={selectTheme}
      defaultValue={cookies.get("theme") || "classic"}
    >
      <option value="classic">Classic theme</option>
      <option value="aurora">Aurora theme</option>
      <option value="pink">Pink theme</option>
      <option value="contrast">Contrast theme</option>
    </select>
  );
}

export default ThemeSelector;