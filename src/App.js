import './App.scss';
import { Route, Switch } from 'react-router';

import Pokemon from "./modules/pokemon";

function App() {
  const routes = [
    {
      id: "Home",
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
