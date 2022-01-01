export const QuizLinks = ({ quizStatusList, limitToAvailable = false }) => {
  const cardContent = (quizStatus) => {
    let output = '';
    if (quizStatus === 'completed') {
      output = (
        <div className='completed'>
          <button>View Results</button>
        </div>
      );
    } else if (quizStatus === 'available') {
      output = (
        <div className='available'>
          <button>Take Quiz</button>
        </div>
      );
    } else if (quizStatus === 'upcoming') {
      output = (
        <p>
          <strong>Upcoming</strong>
        </p>
      );
    }
    return output;
  };

  return (
    <>
      <h1>Quiz List</h1>
      <div className='quiz-list'>
        {quizStatusList.map(({ weekNumber, status }) => {
          if (status === 'available' && limitToAvailable) {
            return (
              <div className='quiz-list-card' key={weekNumber}>
                <h3>Week {weekNumber}</h3>
                {cardContent(status)}
              </div>
            );
          } else if (!limitToAvailable) {
            return (
              <div className='quiz-list-card' key={weekNumber}>
                <h3>Week {weekNumber}</h3>
                {cardContent(status)}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};
