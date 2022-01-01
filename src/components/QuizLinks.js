export const QuizLinks = ({ userResults }) => {
  const groupResults = (arrayOfObjects, property) => {
    return arrayOfObjects.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  const weeks = 5;
  const quizResults = groupResults(userResults, 'weekNumber');
  const quizLinks = [];

  for (let i = 1; i <= weeks; i++) {
    if (Object.keys(quizResults).includes(i.toString())) {
      quizLinks.push({ week: i, complete: true });
    } else {
      quizLinks.push({ week: i, complete: false });
    }
  }

  return (
    <div className='quiz-list'>
      {quizLinks.map(({ week, complete }) => {
        return (
          <div className='quiz-list-card' key={week}>
            <h3>Week {week}</h3>
            {complete ? <p>View Results</p> : <button>Take Quiz</button>}
          </div>
        );
      })}
    </div>
  );
};
