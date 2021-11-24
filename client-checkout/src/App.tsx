import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Checkout from "./components/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/checkout/:paymentId"} element={<Checkout />} />
        <Route path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const navigate = useNavigate();
  function handleCheckout() {
    fetch("http://localhost:5000/createPayment")
      .then((response) => response.json())
      .then((data) => {
        navigate("/checkout/" + data.paymentId);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleCheckout}>Checkout</button>
      </header>
    </div>
  );
}

export default App;
