"use client";
import React, { useState } from "react";
import "../../styles/global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track the visibility of the popup
  const [inputValue, setInputValue] = useState(""); // Track the value of the input

  // Handle click to open the popup
  const handleClick = () => {
    setIsPopupOpen(true);
  };

  // Handle send button click
  const handleSend = () => {
    console.log(inputValue); // You can handle the input value here (e.g., send it to a server)
    setInputValue(""); // Clear the input field after sending
    setIsPopupOpen(false); // Close the popup
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <html lang="en">
      <body>
        {children}
        <div className="scroll-icon" onClick={handleClick}></div>

        {isPopupOpen && (
          <div className="popup">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type something..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        )}
      </body>
    </html>
  );
}
