import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../../helpers/authHelper';

const AuthenticationBasedRoute = ({ children, authData, anonymous, fallbackPath, ...rest}) => {
    let needsRedirect = !isAuthenticated(authData);

    if (anonymous) {
      needsRedirect = !needsRedirect;
    }

    return (
        <Route
          {...rest}
          render={({ location }) =>
            !needsRedirect ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: fallbackPath,
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}

export default AuthenticationBasedRoute;