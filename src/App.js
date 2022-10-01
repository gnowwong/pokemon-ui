import './App.scss';
import { Route, Switch } from 'react-router';

import Pokemon from "./modules/pokemon";
import { ApiSnackBar } from './modules/snack-bar/snack-bar';
import { ErrorBoundary } from './error-boundary';

function App() {
  const routes = [
    {
      key: "Home",
      path: "/",
      component: Pokemon
    },
  ]
  return (
    <div className="App">
      <ErrorBoundary>
        <Switch>
          {
            routes.map(route => {
              return <Route
                key={route.key}
                path={`${route.path}`}
                component={route.component}
              />
            })
          }
        </Switch>
        <ApiSnackBar />
      </ErrorBoundary>
    </div>
  );
}

export default App;
