import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import TollList from "./Pages/TollList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tolllist" element={<TollList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
