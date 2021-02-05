import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import { AuthProvider } from './state/auth/AuthState';
import { EntriesProvider } from './state/entries/EntriesState';
import PrivateComp from './components/PrivateComp';
import PublicComp from './components/PublicComp';

function App() {
  return (
    <AuthProvider>
      <EntriesProvider>
        <div className="container">
          <Switch>
            <Route path="/" exact component={PrivateComp(Home)} />
            <Route path="/auth" exact component={PublicComp(Auth)} />
            <Route
              path="*"
              component={() => (
                <code style={{ textAlign: 'center', fontSize: '2rem' }}>
                  404
                  <br />
                  <br />
                    The page you requested for was not found.
                </code>
              )}
            />
          </Switch>
        </div>
      </EntriesProvider>
    </AuthProvider>

  );
}

export default App;
