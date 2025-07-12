import { seedMockDatabase } from '../Plugins/db/init';

export function init(params) {
  seedMockDatabase();
  requestAnimationFrame(() => {
    // code reactive elements and rerender here for minimalistic update on dom
  });

  //  action in html string will work like this
  return {
    hello() {
      console.log('hello');
    },
  };
}
