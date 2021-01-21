import './App.css';
import Context, { StateContext } from './context/Context';
import { Home } from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';
import { AuthProvider } from './context/Auth';
import routes from './routes/routes';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <AuthProvider>
        <Context>
      <BrowserRouter>
          <ToastContainer />
          <Switch>
            {
              routes.map(route => (
                 <AppRoutes
                 key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
                 />
              ))
            }
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} exact />
          </Switch>
      </BrowserRouter>
        </Context>
    </AuthProvider>
  )
}

export default App;
