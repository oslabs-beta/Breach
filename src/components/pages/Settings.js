import React from "react";
import PermanentDrawerLeft from "../material/SideNav";
import ControlledOpenSelect from "../material/OpenSelect";

function Settings() {
  const modes = [
    "Regular Hacker Mode",
    "Dark XSS Mode",
    "Blue DOS Mode",
    "Purple SQL Injection Mode",
  ];
  const fontSizes = ["12px", "16px", "20px", "24px"];
  return (
    <div className="settingsDiv">
      <center>
        <h1>Settings</h1>
      </center>
      <h3>Color Themes</h3>
      <ControlledOpenSelect options={modes} />
      <br></br>
      <h3>Change Text Size</h3>
      <br></br>
      <ControlledOpenSelect options={fontSizes} />
      {/* <form>
        <input type="text" placeholder="Font Size" name="size" />
        <input type="submit" value="Change Font Size" />
      </form> */}
      <br></br>
      <button>Export Data</button>
      <PermanentDrawerLeft />
    </div>
  );
}

export default Settings;
