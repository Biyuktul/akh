import { useState } from "react";
import { Switch, Select, Slider } from "antd";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const { Option } = Select;

const Preference = () => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("light");

  const handleNotificationsChange = (checked) => {
    setNotifications(checked);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className=" mt-10 grid ml-10 justify-start w-1/3">
      <div className="mb-6 " >
        <Switch checked={notifications} onChange={handleNotificationsChange} />
        <span className="ml-2">Notifications</span>
      </div>
      <div className="mb-6 mt-10">
        <label htmlFor="language-select" className="block mb-2 font-medium">
          Language
        </label>
        <Select id="language-select" value={language} className="w-full" onChange={handleLanguageChange}>
          <Option value="en">English</Option>
          <Option value="fr">Amharic</Option>
        </Select>
      </div>
      
      <div className="mb-6 mt-10">
        <div className="flex items-center">
          {theme === "light" ? <MoonIcon className="h-5 w-5 mr-2" /> : <SunIcon className="h-5 w-5 mr-2" />}
          <span className="text-sm cursor-pointer" onClick={handleThemeChange}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preference;
