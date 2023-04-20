import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadShoesAndHats() {
  const shoeResponse = await fetch('http://localhost:8080/api/shoes/');
  if (shoeResponse.ok) {
    const data = await shoeResponse.json();
    console.log(data);
    root.render(
      <React.StrictMode>
        <App shoes={data.shoes} />
      </React.StrictMode>
    );
  } else {
    console.error(shoeResponse);
  }
}
loadShoesAndHats();
