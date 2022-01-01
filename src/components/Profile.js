export const Profile = ({ user, profile }) => {
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
          {user && <p>Email: {user.email}</p>}
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
