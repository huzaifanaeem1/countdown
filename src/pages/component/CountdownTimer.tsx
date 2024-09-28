import React, { useState, useEffect } from "react";

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state for pause
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const handleStart = () => {
    if (time > 0 && !isPaused) {
      setRemainingTime(time);
      setIsRunning(true);
    } else if (isPaused) {
      setIsRunning(true);
      setIsPaused(false); // Resuming the timer
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true); // Setting pause to true
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setRemainingTime(0);
    setTime(0);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-blue-800 to-gray-900 p-4">
      <img
        src="https://avatars.githubusercontent.com/u/159990985?v=4"
        alt="Huzaifapic"
        className="absolute top-4 right-4 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full"
      />

      <h1 className="text-2xl sm:text-4xl font-extrabold uppercase mb-6 text-white">
        Countdown Timer
      </h1>

      <input
        type="number"
        className="border-2 border-black bg-transparent p-2 sm:p-3 mb-6 text-white text-lg sm:text-xl rounded w-full sm:w-1/2 lg:w-1/4"
        placeholder="Enter Time in Seconds"
        value={time > 0 ? time : ""}
        onChange={(e) => setTime(Number(e.target.value))}
      />

      <div className="text-xl sm:text-3xl font-semibold uppercase mb-6 text-white">
        {remainingTime} seconds remaining
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto justify-center">
        {!isRunning && !isPaused && (
          <button
            onClick={handleStart}
            className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-normal bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 w-full sm:w-auto"
          >
            Start
          </button>
        )}

        {isPaused && (
          <button
            onClick={handleStart}
            className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-normal bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 w-full sm:w-auto"
          >
            Resume
          </button>
        )}

        {isRunning && (
          <button
            onClick={handlePause}
            className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-normal bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 w-full sm:w-auto"
          >
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-normal bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 w-full sm:w-auto"
        >
          Reset
        </button>
      </div>

      <footer className="mt-auto mb-4 text-white text-lg">
        Developed By | Huzaifa Naeem
      </footer>
    </div>
  );
};

export default CountdownTimer;
