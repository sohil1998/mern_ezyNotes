import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/home" element={<Home />} />
          {/*      <Route path="/create" element={<CreatePage />} />

                    <Route path="/deletetask/:id" element={<DeletePage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
