import { QuizQuestion } from './QuizQuestion';

export const QuizList = ({ weekNumber, questions }) => {
  return (
    <div>
      <h2>Quiz for Week {weekNumber}</h2>
      <section>
        {questions.map((question, index) => (
          <div key={question.id}>
            <QuizQuestion question={question} number={index} />
          </div>
        ))}
      </section>
    </div>
  );
};
