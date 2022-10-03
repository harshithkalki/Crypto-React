import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
// import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div >
    </Router>
  );
}

export default App;
