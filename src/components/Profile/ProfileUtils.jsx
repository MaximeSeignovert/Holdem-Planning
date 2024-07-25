import defaultProfilPicture from '@/assets/default_profil_picture.jpg';

export const getProfilePicture = (user) => {
  if (user && user.identities[0].identity_data.avatar_url) {
    return user.identities[0].identity_data.avatar_url;
  }
  return defaultProfilPicture;
};

export const getProfileName = (user) => {
  if (user && user.identities[0].identity_data.full_name) {
    return user.identities[0].identity_data.full_name;
  }
  return 'Anonymous';
};
