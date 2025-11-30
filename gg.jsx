import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === 'aladio' && password === 'olapolop') {
      history.push('/main');
    } else {
      alert('Invalid credentials');
    }
  };

  // ...
}




import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/main" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;




import React, { useState } from 'react';

function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === 'aladio' && password === 'olapolop') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
  };

  if (!loggedIn) {
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  } else if (!acknowledged) {
    return (
      <div>
        <h1>Acknowledgement</h1>
        <p>Please acknowledge that you are logged in.</p>
        <button onClick={handleAcknowledge}>Acknowledge</button>
      </div>
    );
  } else {
    return <MainPage />;
  }
}

function MainPage() {
  return (
    <div>
      <h1>Welcome to the main page!</h1>
      <!-- Add your page content here -->
    </div>
  );
}

export default LoginPage;
