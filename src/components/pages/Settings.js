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
  return (
    <div className="settingsDiv">
      <center>
        <h1>Settings</h1>
      </center>
      <ControlledOpenSelect />
      <br></br>
      Change Text Size
      <br></br>
      <form>
        <input type="text" placeholder="Font Size" name="size" />
        <input type="submit" value="Change Font Size" />
      </form>
      <br></br>
      <button>Export Data</button>
      <PermanentDrawerLeft />
    </div>
  );
}

export default Settings;
