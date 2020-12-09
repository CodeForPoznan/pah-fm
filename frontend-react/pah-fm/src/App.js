import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { login } from './store/slices/auth';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login({
      username: 'driver@codeforpoznan.pl',
      password: 'pass123',
    }));
  }, [dispatch]);

  return (
      <div className="App">
        <header className="App-header">
          PAH!!!!!
        </header>
      </div>
  );
}

export default App;
