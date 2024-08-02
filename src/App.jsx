import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [savedQuotes, setSavedQuotes] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    );
    setData(response.data[0]);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    setSavedQuotes(saved);
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
  }, [savedQuotes]);

  const handleSave = () => {
    if (data) {
      setSavedQuotes((prev) => [...prev, data]);
      fetchData();
    } else {
      console.log("No data to save");
    }
  };

  const handleDelete = (index) => {
    setSavedQuotes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen flex justify-between items-center gap-10">
      <div className="flex justify-center h-full items-center w-full">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <p className="mb-3 font-normal text-gray-200">{data}</p>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            Save
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-4 self-start h-full px-4 w-[50%] shadow-2xl">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 p-3">
          Saved Quotes
        </h2>
        <ul className="list-disc pl-5 flex flex-col gap-2 mt-4">
          {savedQuotes.map((quote, index) => (
            <li
              key={index}
              className="text-gray-900 flex justify-between items-center shadow-lg p-3 rounded-lg"
            >
              <p className="w-[60%]">
                <span>{quote}</span>
              </p>
              <button
                onClick={() => handleDelete(index)}
                className=" transition-all delay-100 text-white bg-red-400 hover:bg-red-500 px-2 py-1 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
