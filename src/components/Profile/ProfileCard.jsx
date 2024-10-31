import { useAuth } from '@/contexts/AuthProvider';
import { getProfilePicture, getProfileName } from '@/components/Profile/ProfileUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = () => {
  const { user, signOut } = useAuth();


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 h-min w-96 text-foreground bg-card rounded shadow-md border">
      <img src={getProfilePicture(user)} alt="Profile" className="w-[50px] h-[50px] rounded-full border" />
      <h2 className="text-2xl font-bold mb-4">{getProfileName(user)}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.id}</p>
      <button
        onClick={signOut}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Sign Out
        <FontAwesomeIcon className='pl-2' icon={faSignOutAlt} />
      </button>
    </div>
  );
};

export default ProfileCard;
