import "./App.css";
import WalletButton from "./assets/walletButton";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Balance from "./pages/Balance";
import Tokens from "./pages/Tokens";
import Collections from "./pages/Collections";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WalletButton />}>
            <Route path="balance" element={<Balance />} />
            <Route path="erc20" element={<Tokens />} />
            <Route path="nft/collections" element={<Collections />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
