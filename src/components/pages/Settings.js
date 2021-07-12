import React from "react";
import PermanentDrawerLeft from "../material/SideNav";

function Settings() {
  return (
    <div>
      <center>
        <h1>Settings</h1>
      </center>
      <ul>
        <li>
          <h3>
            <button>Night Mode</button>
          </h3>
        </li>
        <li>
          <h3>
            <button>Grey Mode</button>
          </h3>
        </li>
        <li>
          <h3>
            <button>Blue Mode</button>
          </h3>
        </li>
        <li>
          <h3>
            Change Text Size
            <form>
              <input type="text" placeholder="Font Size" name="size" />
              <input type="submit" value="Change Font Size" />
            </form>
          </h3>
        </li>
        <li>
          <h3>
            <button>Export Data</button>
          </h3>
        </li>
      </ul>
      <PermanentDrawerLeft />
    </div>
  );
}

export default Settings;
