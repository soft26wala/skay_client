import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

// 1 CAD = 0.74 USD approximately
const CAD_TO_USD_RATE = 0.74;

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("skay_currency") || "CAD";
    }
    return "CAD";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("skay_currency", currency);
    }
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "CAD" ? "USD" : "CAD"));
  };

  const getConvertedAmount = (cadAmount) => {
    const num = Number(cadAmount) || 0;
    if (currency === "USD") {
      return num * CAD_TO_USD_RATE;
    }
    return num;
  };

  const formatPrice = (cadAmount) => {
    const num = Number(cadAmount) || 0;
    if (currency === "USD") {
      const converted = num * CAD_TO_USD_RATE;
      return `$${converted.toFixed(2)} USD`;
    }
    return `$${num.toFixed(2)} CAD`;
  };

  const currencySymbol = currency === "USD" ? "US$" : "CA$";

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        getConvertedAmount,
        currencySymbol,
        rate: CAD_TO_USD_RATE,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
