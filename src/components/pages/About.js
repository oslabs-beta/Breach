import React from "react";
import PermanentDrawerLeft from "../material/SideNav";

function About() {
  return (
    <div>
      <center>
        <h1>About</h1>
      </center>

      <ul>
        <li>
          <h3>Version</h3>

          <p>1.0</p>
        </li>
        <li>
          <h3>How it Works?</h3>

          <p>
            Place a URL on the home page and watch the security readings once
            the load finishes
          </p>
        </li>
        <li>
          <h3>Who it's for?</h3>

          <p>
            This app is for any developer looking to test their front end
            application for Cross-Site-Scripting vulnerabilities
          </p>
        </li>
        <li>
          <h3>Disclaimer</h3>

          <p>Only for use on URLs that you have permission to test XSS</p>
        </li>
      </ul>
      <PermanentDrawerLeft />
    </div>
  );
}

export default About;
