import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { questionData } from '../question-data';
import play from '../assets/sounds/play.mp3';
import correct from '../assets/sounds/correct.mp3';
import wrong from '../assets/sounds/wrong.mp3';

type IProps = {
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  setStop: React.Dispatch<React.SetStateAction<boolean>>;
};

type Answer = {
  text: string;
  correct: boolean;
};

type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

const Trivia = ({ questionNumber, setQuestionNumber, setStop }: IProps) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [className, setClassName] = useState('answer');
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(questionData[questionNumber - 1]);
  }, [questionNumber]);

  const delay = (duration: number, cb: Function) => {
    setTimeout(() => {
      cb();
    }, duration);
  };

  const handleClick = (a: Answer) => {
    setSelectedAnswer(a);
    setClassName('answer active');
    setSelectedAnswer(a);
    setClassName('answer active');

    delay(3000, () => {
      setClassName(a.correct ? 'answer correct' : 'answer wrong');
    });

    delay(5000, () => {
      if (a.correct) {
        correctAnswer();

        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  if (question === null) return <div>No Question Selected</div>;

  return (
    <div className="trivia">
      <div className="question">{question.question}</div>
      <div className="answers">
        {question.answers.map((answer: Answer, idx: number) => (
          <div key={idx} className={selectedAnswer === answer ? className : 'answer'} onClick={() => handleClick(answer)}>
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
