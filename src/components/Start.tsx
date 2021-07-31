import { useState } from 'react';

type IProps = {
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function Start({ setUserName }: IProps) {
  const [val, setVal] = useState<string | null>(null);

  const onClick = () => {
    val !== null && setUserName(val);
  };

  return (
    <div className="start">
      <input className="start-input" onChange={(e) => setVal(e.target.value)} placeholder="enter your name" />
      <button className="start-button" onClick={onClick}>
        Start
      </button>
    </div>
  );
}
