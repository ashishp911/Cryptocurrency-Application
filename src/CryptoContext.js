import React, {
  Children,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";


const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  // The user state will contain all the user data when he logs in.
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      console.log(user);
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchList
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

const Crypto = createContext();
export const CryptoState = () => {
  return useContext(Crypto);
};
