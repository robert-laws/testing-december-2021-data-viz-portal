import { Link } from 'react-router-dom';

export const QuizLinks = ({ quizStatusList, limitToAvailable = false }) => {
  const cardContent = (quizStatus, weekNumber, topic) => {
    let output = '';
    if (quizStatus === 'completed') {
      output = (
        <>
          <p>{topic}</p>
          <div className='completed'>
            <Link className='link-button' to={`/quiz-result/${weekNumber}`}>
              View Results
            </Link>
          </div>
        </>
      );
    } else if (quizStatus === 'available') {
      output = (
        <>
          <p>{topic}</p>
          <div className='available'>
            <Link className='link-button' to={`/quiz/${weekNumber}`}>
              Take Quiz
            </Link>
          </div>
        </>
      );
    } else if (quizStatus === 'upcoming') {
      output = (
        <>
          <p>{topic}</p>
          <p>
            <strong>Upcoming</strong>
          </p>
        </>
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
                {cardContent(status, weekNumber, topic)}
              </div>
            );
          } else if (!limitToAvailable) {
            return (
              <div className='quiz-list-card' key={weekNumber}>
                <h3>Week {weekNumber}</h3>
                {cardContent(status, weekNumber, topic)}
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
