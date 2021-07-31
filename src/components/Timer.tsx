import { useEffect, useState } from 'react';

type IProps = {
  questionNumber: number;
  setStop: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Timer({ setStop, questionNumber }: IProps) {
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    if (timer === 0) return setStop(true);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setStop]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return <div className="timer">{timer}</div>;
}
