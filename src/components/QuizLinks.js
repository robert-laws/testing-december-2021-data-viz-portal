import { Link } from 'react-router-dom';

export const QuizLinks = ({ quizStatusList, limitToAvailable = false }) => {
  const cardContent = (quizStatus, weekNumber) => {
    let output = '';
    if (quizStatus === 'completed') {
      output = (
        <div className='completed'>
          <Link className='link-button' to={`/quiz/${weekNumber}`}>
            View Results
          </Link>
        </div>
      );
    } else if (quizStatus === 'available') {
      output = (
        <div className='available'>
          <Link className='link-button' to={`/quiz/${weekNumber}`}>
            Take Quiz
          </Link>
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
        {quizStatusList.map(({ weekNumber, topic, status }) => {
          if (status === 'available' && limitToAvailable) {
            return (
              <div className='quiz-list-card' key={weekNumber}>
                <h3>Week {weekNumber}</h3>
                <p>{topic}</p>
                {cardContent(status, weekNumber)}
              </div>
            );
          } else if (!limitToAvailable) {
            return (
              <div className='quiz-list-card' key={weekNumber}>
                <h3>Week {weekNumber}</h3>
                <p>{topic}</p>
                {cardContent(status, weekNumber)}
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
