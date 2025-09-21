import { useEffect, useState } from "react";
import { formatTime } from "../utils/formatDate";
import { RxPause, RxResume } from "react-icons/rx";
import { GrPowerReset } from "react-icons/gr";

type Props = {
  maxTime: number;
};

const Timer = ({ maxTime }: Props) => {
  const [time, setTime] = useState(maxTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      alert("⏰ Se acabó el tiempo de estudio!");
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);
  return (
    <div className="flex gap-3 justify-center pb-2">
      <div className="text-lg font-mono text-gray-700">
        Time left:{" "}
        <span
          className={`font-mono ${time <= 60 ? "text-red-500 font-bold" : ""}`}
        >
          {formatTime(time)}
        </span>
      </div>
      <div className="flex gap-2 my-auto">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="px-3 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-100"
        >
          {isRunning ? <RxPause /> : <RxResume />}
        </button>
        <button
          onClick={() => {
            setTime(maxTime);
            setIsRunning(false);
          }}
          className="px-3 py-1 border-red-500 border-2 text-red-500 rounded hover:bg-red-50"
        >
          <GrPowerReset />
        </button>
      </div>
    </div>
  );
};

export default Timer;
