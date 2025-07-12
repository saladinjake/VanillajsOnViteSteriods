import {
  seedMockDatabase,
} from '../Plugins/db/init';


// MEGA MENU
// HOME PAGE COMPONENT
export function init(params) {
  // load default db for demo from local storage

  seedMockDatabase();

  requestAnimationFrame(() => {
    // code reactive elements and rerender here for minimalistic update on dom
  })
    
  //  action in html string will work like this
  return {
    hello:function(){
      console.log("hello")
    }
    };
}
