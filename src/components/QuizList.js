import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizQuestion } from './QuizQuestion';
import { useQuizContext } from '../hooks/useQuizContext';

export const QuizList = ({ questions, user }) => {
  const [quizAnswers, setQuizAnswers] = useState([]);
  const { error, isSaving, saveQuizResults } = useQuizContext();
  const navigate = useNavigate();
  let currentUserId = '';

  if (user) {
    currentUserId = user.uid;
  }

  useEffect(() => {
    if (!isSaving) {
      navigate('/new-profile');
    }
  }, [isSaving, navigate]);

  const handleAnswer = useCallback(
    (answer) => {
      setQuizAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        const answerIndex = updatedAnswers.findIndex(
          (a) => a.questionNumber === answer.questionNumber
        );
        if (answerIndex === -1) {
          updatedAnswers.push({ ...answer, userId: currentUserId });
        } else {
          updatedAnswers[answerIndex] = { ...answer, userId: currentUserId };
        }
        return updatedAnswers;
      });
    },
    [currentUserId]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    saveQuizResults(quizAnswers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        {questions.length > 0 &&
          questions.map((question, index) => (
            <div key={question.id}>
              <QuizQuestion
                question={question}
                number={index}
                updateAnswers={handleAnswer}
              />
            </div>
          ))}

        <div className='quiz-form'>
          {isSaving && <button type='submit'>Submit Quiz</button>}
          {!isSaving && (
            <button type='submit' disabled>
              Saving...
            </button>
          )}
          {error && <span className='error-text'>{error}</span>}
        </div>
      </section>
    </form>
  );
};
