import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadShoesAndHats() {
  const shoeResponse = await fetch("http://localhost:8080/api/shoes/");
  const hatResponse = await fetch("http://localhost:8090/api/hats");

  if (shoeResponse.ok && hatResponse.ok) {
    const data = await shoeResponse.json();
    const hatData = await hatResponse.json();
    console.log("Shoe Data", data)
    console.log("Hat data", hatData)
    root.render(
      <React.StrictMode>
        <App shoes={data.shoes} hats={hatData.hats} />
      </React.StrictMode>
    );
  } else {
    console.error(shoeResponse);
    console.error(hatResponse);
  }
}

loadShoesAndHats();
