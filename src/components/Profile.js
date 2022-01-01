export const Profile = ({ email, profile }) => {
  return (
    <div>
      <h2>Your Profile</h2>
      {profile ? (
        <>
          <p>
            <strong>
              {profile.firstName} {profile.lastName}
            </strong>
          </p>
          {email && <p>Email: {email}</p>}
          <p>Class: {profile.studentClass}</p>
          <p>Major: {profile.major}</p>
          <p>Class Meeting Day: {profile.meetingDay}</p>
        </>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </div>
  );
};
