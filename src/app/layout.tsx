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

  // Handle click to toggle the popup (open if closed, close if open)
  const handleClick = () => {
    setIsPopupOpen((prevState) => !prevState);
  };

  // Validate the input
  const validateInput = (input: string) => {
    if (input.trim() === "") {
      return false;
    }

    // Example of additional validation: Only allow alphanumeric input
    if (!/^[a-zA-Z0-9 ]*$/.test(input)) {
      return false;
    }
    return true;
  };

  // Handle send button click
  const handleSend = () => {
    // Validate the input
    if (!validateInput(inputValue)) {
      return; // Stop if validation fails
    }

    // Create a JSON object with the input value
    const jsonData = {
      userInput: inputValue,
    };

    // Simulate sending the JSON data (e.g., API request)
    console.log("Sending data to backend:", JSON.stringify(jsonData));

    // Clear the input field after sending
    setInputValue("");
    setIsPopupOpen(false); // Close the popup
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log("Input Value:", e.target.value); 
  };

  return (
    <html lang="en">
      <body>
        {children}
        <div className="scroll-icon" onClick={handleClick}>
          <img src="/images/bot.png" alt="Scroll Icon" />
        </div>

        {isPopupOpen && (
          <div className="popup">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="What can I help you with..."
            />
            <button onClick={handleSend}>Send</button>
    
          </div>
        )}
      </body>
    </html>
  );
}
