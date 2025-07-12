export const routes = [
  // index or home
  {
    path: 'index',
    view: 'src/Views/Home/index.html',
    script: ['./Modules/HomeManagement.js'],
  },

  {
    path: 'home',
    view: 'src/Views/Home/index.html',
    script: ['./Modules/HomeManagement.js'],
  },

  // auth routes students

  {
    path: 'login',
    view: 'src/Views/Home/login.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'signup',
    view: 'src/Views/Students/signup.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  /** *************   ADMIN  *********** */

  {
    path: 'admin/login',
    view: 'src/Views/Admin/login.html',
    script: ['Modules/AdminManagement/Login.js'],
  },
];
