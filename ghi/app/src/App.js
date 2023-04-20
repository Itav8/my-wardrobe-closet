import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ShoeList from "./ShoeList";
import HatList from "./HatsList";

function App(props) {
  if (props.shoes === undefined && props.hats === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/shoes" element={<ShoeList shoes={props.shoes} />} />
          <Route path="/hats" element={<HatList hats={props.hats} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
