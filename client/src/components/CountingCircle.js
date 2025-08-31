import { useEffect, useState } from "react";

const CountingCircle = ({ target, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const duration = 2000; // in ms
    const increment = Math.ceil(end / (duration / 50));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col items-center justify-center w-40 h-40 rounded-full bg-blue-100 text-blue-800 shadow-md">
      <span className="text-2xl font-bold">
        {count.toLocaleString()}+
      </span>
      <span className="text-sm text-center">{label}</span>
    </div>
  );
};

export default CountingCircle;
