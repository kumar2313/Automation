import { BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from "./Components/RouterPath/Navbar";
import RouterApp from "./RouterApp";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RouterApp/>
    </BrowserRouter>
  );
}

export default App;
