import { useEffect, useState } from "react";
import logo from "../../public/assets/logo.svg";
import moonIcon from "../../public/assets/icon-moon.svg";
import sunIcon from "../../public/assets/icon-sun.svg";
import avatar from "../../public/assets/image-avatar.jpg";
import { useNavigate } from "react-router-dom";

export default function Heeader() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/invoices");
  }, []);

  const handleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);

    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };
  return (
    <div className="flex justify-center dk:flex dk:flex-col dk:fixed dk:top-0 dk:left-0 dk:h-full dk:w-[103px] dk:bg-[#373B53] dk:rounded-tr-[20px] dk:rounded-br-[20px]">
      <header className="w-[375px] flex items-center justify-between  w-full dk:w-[103px] dk:flex-col dk:items-center dk:justify-between dk:h-full">
        <div className="logo">
          <img
            src={logo}
            alt="logo icon"
            className="w-[80px] h-[80px] dk:w-[103px] dk:h-[103px]"
          />
        </div>
        <div className="dark-avatar flex items-center gap-[24px] mr-[24px] dk:flex-col dk:gap-[32px] dk:mb-[32px] dk:mr-0 dk:gap-0 dk:mb-0">
          <img
            src={darkMode ? sunIcon : moonIcon}
            alt="dark mode icons"
            onClick={handleDarkMode}
          />
          <div className="divider w-[1px] h-[72px] bg-divider dk:w-[72px] dk:h-[1px] "></div>
          <img
            src={avatar}
            alt="avatar image"
            className="w-[32px] h-[32px] rounded-[50%] dk:w-[40px] dk:h-[40px]"
          />
        </div>
      </header>
    </div>
  );
}
