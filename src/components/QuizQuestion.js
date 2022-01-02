import { useState, useEffect } from 'react';

export const QuizQuestion = ({ question, number, updateAnswers }) => {
  const [answer, setAnswer] = useState({
    questionNumber: '',
    weekNumber: '',
    answer: '',
    correct: false,
  });

  useEffect(() => {
    if (answer.answer !== '') {
      updateAnswers(answer);
    }
  }, [answer, updateAnswers]);

  const handleChange = (weekNumber, questionNumber, choice, correctAnswer) => {
    const checkAnswer = choice === correctAnswer;

    setAnswer((prevState) => ({
      ...prevState,
      weekNumber,
      questionNumber,
      answer: choice,
      correct: checkAnswer,
    }));
  };

  const qNumber = number + 1;
  return (
    <div className='app-form'>
      <p>
        <strong>Question #{qNumber}</strong>
      </p>
      <label className='radio-group'>
        <span>{question.questionText}</span>
        <div className='radio-buttons'>
          {question.questionAnswers.map((choice) => (
            <label key={choice} className='radio'>
              <input
                type='radio'
                name={`question${qNumber}`}
                value={choice}
                className='form-check-input'
                onChange={() =>
                  handleChange(
                    question.weekNumber,
                    question.questionNumber,
                    choice,
                    question.correctAnswer
                  )
                }
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </label>
    </div>
  );
};
