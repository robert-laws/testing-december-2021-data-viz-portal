import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDYM6nYw7QFe122v3EwrnLRg9YktWSTgzM',
  authDomain: 'test-dec-2021-datavizportal.firebaseapp.com',
  projectId: 'test-dec-2021-datavizportal',
  storageBucket: 'test-dec-2021-datavizportal.appspot.com',
  messagingSenderId: '839785409003',
  appId: '1:839785409003:web:7b45ceab036519722ed1ae',
};

// initialize firebase app
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
