import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import { Sidebar } from './modules/sidebar/Sidebar';
import { Chat } from './modules/chat/Chat';
import { Login } from './modules/login/Login';
import { useStateValue } from './StateProvider';


function App() {

  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {
        !user ?
          (
            <Login />
          ) :
          (
            <div className="app-body">

              <BrowserRouter>
                <Sidebar />
                <Switch>
                  <Route path="/rooms/:roomId">
                    <Chat />
                  </Route>
                  <Route path="/">
                  </Route>
                </Switch>
              </BrowserRouter>

            </div>
          )
      }
    </div>
  );
}

export default App;
