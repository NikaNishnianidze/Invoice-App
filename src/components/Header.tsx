import { useState } from "react";
import logo from "../../public/assets/logo.svg";
import moonIcon from "../../public/assets/icon-moon.svg";
import sunIcon from "../../public/assets/icon-sun.svg";
import avatar from "../../public/assets/image-avatar.jpg";

export default function Heeader() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);

    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };
  return (
    <div className="flex justify-center">
      <header className="w-[375px] flex items-center justify-between">
        <div className="logo">
          <img src={logo} alt="logo icon" />
        </div>
        <div className="dark-avatar flex items-center gap-[24px] mr-[24px]">
          <img
            src={darkMode ? sunIcon : moonIcon}
            alt="dark mode icons"
            onClick={handleDarkMode}
          />
          <div className="divider w-[1px] h-[72px] bg-divider"></div>
          <img
            src={avatar}
            alt="avatar image"
            className="w-[32px] h-[32px] rounded-[50%]"
          />
        </div>
      </header>
    </div>
  );
}
