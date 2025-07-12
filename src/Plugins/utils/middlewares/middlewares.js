export async function globalMiddleware(route, params) {
  // create your middleware
  await Promise.resolve(() => true);
}
