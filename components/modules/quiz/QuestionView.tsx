/*
Author: chankruze (chankruze@gmail.com)
Created: Sat May 14 2022 18:57:26 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/
import { useEffect, useState } from "react";
import { config } from "../../../config";
import { Question } from "../../../types";
import { Answer } from "../../../types/submission";

interface QuestionViewProps {
  questions: Question[];
  submit: (answer: Answer) => void;
}

const QuestionView: React.FC<QuestionViewProps> = ({ questions, submit }) => {
  // active question
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [activeQuestionAnswer, setActiveQuestionAnswer] = useState("");
  const [answer, setAnswer] = useState<Answer>({});
  // timer
  const [timer, setTimer] = useState(config.DEFAULT_TIMER);

  const nextQuestion = () => {
    if (activeQuestionIndex < questions.length - 1) {
      // save the answer (mutate the submission object)
      setAnswer({
        ...answer,
        [activeQuestion.id]: activeQuestionAnswer,
      });
      // reset the answer
      setActiveQuestionAnswer("");
      // increment active question index
      setActiveQuestionIndex((prev) => prev + 1);
      // set the active question
      setActiveQuestion(questions[activeQuestionIndex + 1]);
      // reset timer
      setTimer(config.DEFAULT_TIMER);
    }
  };

  useEffect(() => {
    // set timer
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    // on last question:
    // 1.  clear interval
    // 2.  move to result view
    if (timer === 0 && activeQuestionIndex === questions.length - 1) {
      clearInterval(interval);
      submit(answer);
      return;
    }

    // next question
    if (timer === 0) {
      clearInterval(interval);
      nextQuestion();
    }

    // clear timer
    return () => clearInterval(interval);
  }, [timer, questions, activeQuestionIndex]);

  return (
    <div className="h-full flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between py-2 px-3 border-b">
        {/* question position */}
        <p className="text-gray-500 font-nunito font-semibold">
          Question {activeQuestionIndex + 1} of {questions.length}
        </p>
        {/* show timer */}
        <div className="flex items-center justify-center gap-1">
          <p
            className={`font-mono font-bold text-xl
            ${timer < 10 ? "text-red-500 animate-ping" : "text-green-500"}`}
          >
            {timer}
          </p>
          <p className="font-nunito text-sm">seconds</p>
        </div>
      </div>
      {/* render active question */}
      <div className="flex-1 flex flex-col py-2 px-3 ">
        {/* question */}
        <p className="text-xl font-roboto font-bold sm:p-3">
          {activeQuestion.title}
        </p>
        {/* answer */}
        <div className="pt-3 sm:pt-0 flex flex-col justify-evenly">
          {activeQuestion.options.map((option) => (
            <div key={option.id} className="flex items-center py-3 sm:p-3">
              <input
                key={option.id}
                type="radio"
                name={activeQuestion.id}
                value={option.id}
                onChange={(e) => setActiveQuestionAnswer(e.target.value)}
                className="h-6 w-6"
              />
              <p className="pl-2 font-roboto">{option.value}</p>
            </div>
          ))}
        </div>
      </div>
      {/* render the next button only the next question is available */}
      {activeQuestionIndex < questions.length - 1 ? (
        <div
          className="h-16 bg-blue-600 text-white border-t 
          flex items-center justify-center cursor-pointer text-xl hover:bg-blue-600/80 duration-150"
          onClick={nextQuestion}
        >
          <p className="uppercase text-sm">next</p>
        </div>
      ) : (
        <div
          className="h-16 bg-blue-600 text-white border-t tracking-wider
            flex items-center justify-center cursor-pointer text-xl hover:bg-blue-600/80 duration-150"
          onClick={() => submit(answer)}
        >
          <p className="uppercase text-sm">submit</p>
        </div>
      )}
    </div>
  );
};

export default QuestionView;
