import { useEffect, useMemo, useState } from 'react';
import './App.scss';
import Timer from './components/Timer';
import Start from './components/Start';
import Trivia from './components/Trivia';
import moneyPyramidData from './moneyPyramid';

const App = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [amountEarned, setAmountEarned] = useState<string | undefined>('$ 0');
  const [userName, setUserName] = useState<string | null>(null);

  const moneyPyramid = useMemo(() => {
    return moneyPyramidData;
  }, []);

  useEffect(() => {
    questionNumber > 1 && setAmountEarned(moneyPyramid.find((m) => m.id === questionNumber - 1)?.amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="end-text">You earned: {amountEarned}</h1>
            ) : (
              <>
                <div className="top">
                  <Timer questionNumber={questionNumber} setStop={setStop} />
                </div>
                <div className="bottom">
                  <Trivia questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} setStop={setStop} />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="money-list">
              {moneyPyramid.map(({ id, amount }) => (
                <li className={`money-list-item ${questionNumber === id ? 'active' : ''}`} key={id}>
                  <div className="money-list-item-number">{id}</div>
                  <div className="money-list-item-amount">{amount}</div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
};

export default App;
