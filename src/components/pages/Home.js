import React from "react";
import PermanentDrawerLeft from "../material/SideNav";

function Home() {
  return (
    <div>
      <center>
        <h1>Home</h1>
      </center>
      <form>
        <h3>URL</h3>
        <input type="text" placeholder="URL link to be tested" name="url" />
        <input type="submit" value="Hack 'Em Up" />
      </form>
      <br></br>
      <h3>Ports in Use</h3>
      <br></br>
      <h3>Stats</h3>
      <PermanentDrawerLeft />
    </div>
  );
}

export default Home;
