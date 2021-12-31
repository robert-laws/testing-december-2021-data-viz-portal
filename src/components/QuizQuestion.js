export const QuizQuestion = ({ question, number }) => {
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
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </label>
    </div>
  );
};
