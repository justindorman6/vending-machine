import React, { useState, useEffect } from "react";
import axios from "axios";
import { calculateChange } from "./api/changeApi";
import { getDenominations } from "./api/denominationsApi";

interface Denominations {
  [key: string]: number[];
}

const App: React.FC = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<string>("");
  const [tenderAmount, setTenderAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [denominations, setDenominations] = useState<Denominations>({});
  const [change, setChange] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getDenominations()
      .then((response) => {
        setDenominations(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the denominations!", error);
      });
  }, []);

  const handleCalculateChange = async () => {
    if (!currency) {
      setError("Please select a currency.");
      return;
    }

    const purchaseValue = parseFloat(purchaseAmount);
    const tenderValue = parseFloat(tenderAmount);

    if (isNaN(purchaseValue) || purchaseValue <= 0) {
      setError("Purchase amount must be greater than 0.");
      return;
    }

    if (isNaN(tenderValue) || tenderValue <= 0) {
      setError("Tender amount must be greater than 0.");
      return;
    }

    if (tenderValue < purchaseValue) {
      setError(
        "Tender amount must be greater than or equal to purchase amount."
      );
      return;
    }

    const response = await calculateChange(
      currency,
      purchaseValue,
      tenderValue
    );

    setChange(response.data.change);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Vending Machine Change Calculator
        </h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Currency</option>
            {Object.keys(denominations).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Purchase Amount
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Purchase Amount"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tender Amount
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Tender Amount"
            value={tenderAmount}
            onChange={(e) => setTenderAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleCalculateChange}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Calculate Change
        </button>
        {change.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mt-4">Coin Denominations</h3>
            <p>{denominations[currency]?.join(", ")}</p>
            <h2 className="text-xl font-bold mt-2">Change</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {change.map((coin, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 rounded-md text-sm font-medium"
                >
                  {coin}¢
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
