import { Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />

      </Switch>
    </div>
  );
}

export default App;
