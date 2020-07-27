export const TOKEN = 'TOKEN';

export default {
  // LEGACY SUPPORT
  // After merge to new version remove localStorage
  [TOKEN]: localStorage.getItem('jwt') || null,
};
