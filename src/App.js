import './App.scss';
import { Route, Switch } from 'react-router';

import Pokemon from "./modules/pokemon";

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
    </div>
  );
}

export default App;
