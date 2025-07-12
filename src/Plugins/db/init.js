export const mockUpMongoDatabase = {
  // mocks user db table in real life
  users: [
    {
      email: 'user123@example.com',
      password:
        'e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446', // user123
      name: 'John Doe',
      resetToken: 'abc123', // optional
      token: 'uuid-session-token',
      role: 'student',
    },

    {
      email: 'victor@kuda.com',
      password: 'hashedpassword', // We'll just store raw for now
      name: 'John Doe',
      resetToken: 'abc123', // optional
      token: 'uuid-session-token',
      role: 'employee',
    },

    // hr admin or any company using our saas
    {
      email: 'company123@kuda.com',
      password:
        '54e48cbd75ad8c2d3237b35a151ca891de8ebd4ec6d2a958a51121e074c1ba51', // We'll just store raw for now
      name: 'John Doe',
      resetToken: 'abc123', // optional
      token: 'uuid-session-token',
      role: 'employee',
    },

    // the saas admin
    {
      email: 'admin123@lms.com',
      password:
        '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // We'll just store raw for now
      name: 'John Doe',
      resetToken: 'abc123', // optional
      token: 'uuid-session-token',
      role: 'admin',
    },

    {
      email: 'instructor123@example.com',
      password:
        'auth.js:12 c1437a55f6e93b7049c4064af1b0920974e383a435283f5d0b0496ee4a8a47b5', // instructor123
      name: 'John Doe',
      resetToken: 'abc123', // optional
      token: 'uuid-session-token',
      role: 'instructor',
    },
  ],
  currentUser: {
    // get user info from user db table
    email: 'Guest 1001',
    token: 'uuid-session-token',
    role: 'student',
    companyId: 'Free Individual',
    // mocks get user prefrences from prefrence table or profile table
    preference: {
      cardPreference: { paymentMethod: 'Master Card' },
      onboardingCategories: [
        'React',
        'Frontend Development',
        'Data Structures',
      ],
      displayName: '***',
      displayEmail: 'Guest 1001',
      screenReaderEnabled: true,
    },
    // progress
    // users not assigneed by companies are called students while those assigned courses by employess are  employee by role
    // mocks  get courses and analytics from enrolled course api
    enrolledCourses: [],
    progress: {
      courseId1: ['mod-1.1', 'mod-1.2'],
      courseId2: [],
    },
  },

  profile: {
    role: 'student',
    companyId: 'Free Individual',
    // mocks get user prefrences from prefrence table or profile table
    preference: {
      cardPreference: { paymentMethod: 'Master Card' },
      onboardingCategories: [
        'React',
        'Frontend Development',
        'Data Structures',
      ],
      displayName: '***',
      displayEmail: 'Guest 1001',
      screenReaderEnabled: true,
    },
    // progress
    // users not assigneed by companies are called students while those assigned courses by employess are  employee by role
    // mocks  get courses and analytics from enrolled course api
    enrolledCourses: [],
    progress: {
      courseId1: ['mod-1.1', 'mod-1.2'],
      courseId2: [],
    },
  },


};

export function seedMockDatabase() {
  // users
  if (!localStorage.getItem('users')) {
    localStorage.setItem('üsers', JSON.stringify(mockUpMongoDatabase.users));
  }
  // current sessions

  
}
