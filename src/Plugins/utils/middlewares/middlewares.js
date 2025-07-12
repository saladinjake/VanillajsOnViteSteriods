export const globalMiddleware = async (route, params) => {
  console.log('Global check for:', route.path, params);
  // Example: block `contact` at night
  if (route.path === 'contact') {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) {
      alert('Contact page is unavailable at night.');
      return false;
    }
  }
  return true;
};
