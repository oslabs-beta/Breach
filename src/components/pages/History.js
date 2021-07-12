import React from "react";
import PermanentDrawerLeft from "../material/SideNav";

function History() {
  const pastURLs = ["url1", "url2", "url3", "url4"];
  const pastStats = pastURLs.map((el, i) => {
    return (
      <div>
        <h3>{el}</h3>
        <p>Lots of Stats</p>
      </div>
    );
  });
  return (
    <div className="historyDiv">
      <center>
        <h1>History</h1>
      </center>
      {pastStats}
      <PermanentDrawerLeft />
    </div>
  );
}

export default History;
