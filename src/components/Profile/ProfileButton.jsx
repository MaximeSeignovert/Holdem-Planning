import { useAuth } from '@/contexts/AuthProvider';
import { getProfilePicture } from '@/components/Profile/ProfileUtils';

const ProfileButton = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const profilePictureLink = getProfilePicture(user);

  return (
    <button className='mx-[20px]'>
      <img src={profilePictureLink} alt="Profile picture" width="32" height="32" className='rounded-full outline outline-offset-2 outline-2 outline-ring' />
    </button>
  );
};

export default ProfileButton;
