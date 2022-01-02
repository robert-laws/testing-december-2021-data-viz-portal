import { QuizQuestion } from './QuizQuestion';

export const QuizList = ({ questions }) => {
  return (
    <div>
      <section>
        {questions.length > 0 &&
          questions.map((question, index) => (
            <div key={question.id}>
              <QuizQuestion question={question} number={index} />
            </div>
          ))}
      </section>
    </div>
  );
};
