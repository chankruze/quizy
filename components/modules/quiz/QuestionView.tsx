/*
Author: chankruze (chankruze@gmail.com)
Created: Sat May 14 2022 18:57:26 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/
import { useEffect, useState } from "react";
import Option from "./Option";
import NextButton from "./NextButton";
import { config } from "../../../config";
import { MinifiedQuestion } from "../../../types";
import { Answer } from "../../../types/submission";

interface QuestionViewProps {
  questions: MinifiedQuestion[];
  submit: (answer: Answer) => void;
}

const QuestionView: React.FC<QuestionViewProps> = ({ questions, submit }) => {
  // active question
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [activeQuestionAnswer, setActiveQuestionAnswer] = useState("");
  const [answer, setAnswer] = useState<Answer>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setIsSubmitting(true);
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
          <p className="font-nunito text-sm ml-1">seconds</p>
        </div>
      </div>
      {/* render active question */}
      <div className="flex-1 flex flex-col py-2 px-3">
        {/* question */}
        <p className="text-xl font-roboto font-bold sm:p-3">
          {activeQuestion.title}
        </p>
        {/* answer */}
        <div className="pt-3 md:px-3 flex flex-col md:grid md:grid-cols-2 justify-evenly gap-2">
          {activeQuestion.options.map((option) => (
            <Option
              key={option.id}
              option={option}
              onClick={setActiveQuestionAnswer}
              isSelected={activeQuestionAnswer === option.id}
            />
          ))}
        </div>
      </div>
      {/* render the next button only the next question is available */}
      {activeQuestionIndex < questions.length - 1 && (
        <NextButton text="next" onClick={nextQuestion} />
      )}
      {/* render the submit button only when the last question is available */}
      {activeQuestionIndex === questions.length - 1 && (
        <NextButton
          text="submit"
          isSubmitting={isSubmitting}
          style="text-white bg-green-600 hover:bg-green-500"
          onClick={() => {
            setIsSubmitting(true);
            submit(answer);
          }}
        />
      )}
    </div>
  );
};

export default QuestionView;
