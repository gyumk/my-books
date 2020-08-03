import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//pages
import Signin from './pages/Signin';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FatalError from './pages/FatalError';
import { ErrorBoundary } from 'react-error-boundary';
import Hooks from './pages/Hooks';
import PersonContext from './context/PersonContext';

const persons = [
  { id: 0, name: 'Mark', age: 38 },
  { id: 1, name: 'Hanna', age: 27 },
];

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <PersonContext.Provider value={persons}>
        <BrowserRouter>
          <Switch>
            <Route path="/hooks" component={Hooks} />
            <Route path="/signin" component={Signin} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </PersonContext.Provider>
    </ErrorBoundary>
  );
}
