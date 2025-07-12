import { seedMockDatabase } from '../Plugins/db/init';

export function init(params) {
  seedMockDatabase();
  requestAnimationFrame(() => {
    // code reactive elements and rerender here for minimalistic update on dom
  });

  //  action in html string will work like this
  return {
    // define methods used in our template string or html pages both ways works
    // if you follow the bind by data attributes. Home/index.html
    hello({ event, element, dataset }) {
      event.preventDefault();

      const message = dataset.message;
      // do something with event eg event.target.value if its an input binding
    },
  };
}
