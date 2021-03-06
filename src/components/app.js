import { createBrowserHistory } from 'history'
import { useEffect } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
//style
import 'bootstrap/dist/css/bootstrap.min.css'

//firebase
import { AuthProvider, useAuth } from 'components/user/auth'
import { firebase } from 'firebase/client'
//components
import Login from 'components/user/login'
import Logout from 'components/user/logout'
import ErrorBoundary from 'components/error-boundary'
import Dashboard from './admin-ui/dashboard/Dashboard'
import ThankYou from './Customer/thank-you/ThankYou'
import Home from './Customer/Home'
import StripePayment from './Customer/modal-components/stripe/StripePayment'

//redux
import { Provider, useDispatch } from 'react-redux'
import store from 'redux/store'
import { getData, getDataSuccess } from 'redux/user'

// DO NOT import BrowserRouter (as per tutorial). that caused router to not actually do anything.
// see here: https://stackoverflow.com/questions/63554233/react-router-v5-history-push-changes-the-address-bar-but-does-not-change-the
// https://github.com/ReactTraining/react-router/issues/4059#issuecomment-254437084
// this is incredibly common but not our problem: https://stackoverflow.com/questions/62449663/react-router-with-custom-history-not-working
export const history = createBrowserHistory()

function withReduxProvider(Component) {
  return function withReduxProvider(props) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    )
  }
}

function App() {
  const props = {}

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData())
  }, [])

  const storeUserData = (user) => {
    const providerData = user.providerData[0]

    const userData = { ...providerData, uid: user.uid }

    dispatch(getDataSuccess(userData))
  }

  const appElement = (
    <ErrorBoundary>
      <AuthProvider onLogin={storeUserData}>
        <Router history={history}>
          <Switch>
            <Route
              path="/login"
              render={(routeProps) => (
                <Login {...routeProps} {...props} firebase={firebase} />
              )}
            />
            <Route
              path="/admin/logout"
              render={(routeProps) => (
                <Logout {...routeProps} {...props} firebase={firebase} />
              )}
            />

            {/* //route for thank you page just to be able to see it */}
            <Route
              path="/thankyou"
              render={(routeProps) => (
                <ThankYou {...routeProps} {...props} firebase={firebase} />
              )}
            />

            {/* //route for stripe checkout page just to be able to see it */}
            <Route
              path="/payment"
              render={(routeProps) => (
                <StripePayment {...routeProps} {...props} firebase={firebase} />
              )}
            />

            <Route
              exact
              path="/"
              render={(routeProps) => (
                <Home {...routeProps} {...props} firebase={firebase} />
              )}
            />

            {/* this must be on the bottom */}
            <ProtectedRoute path="/admin" component={Dashboard} {...props} />
          </Switch>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )

  return appElement
}

const AppWithRedux = withReduxProvider(App)
export default AppWithRedux

// https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#1-protecting-a-route-in-a-react-router-dom-app
const ProtectedRoute = ({ component, ...args }) => {
  const WrappedComponent = withAuthenticationRequired(component, {
    onRedirecting: () => 'Resuming session???',
  })

  const retVal = (
    <Route
      render={(routeProps) => <WrappedComponent {...routeProps} {...args} />}
    />
  )

  return retVal
}

// much of this was copied from auth0 lib
// node_modules/@auth0/auth0-react/src/with-authentication-required.tsx
function withAuthenticationRequired(Component, options) {
  return function WithAuthenticationRequired(props) {
    const { isAuthenticated, isLoaded } = useAuth()

    const {
      returnTo = defaultReturnTo,
      onRedirecting = defaultOnRedirecting,
      loginOptions = {},
    } = options

    useEffect(async () => {
      let isAuthorized = false

      if (isLoaded) {
        isAuthorized = isAuthenticated

        // so far the only registered users are admins, they are always authorized because they are always authenticated
        if (!isAuthorized) {
          const opts = {
            ...loginOptions,
            appState: {
              ...loginOptions.appState,
              returnTo: typeof returnTo === 'function' ? returnTo() : returnTo,
            },
          }

          history.push('/login', opts)
        }
      }
    }, [history, isAuthenticated, loginOptions, returnTo])

    return isAuthenticated ? <Component {...props} /> : onRedirecting()
  }
}

const defaultReturnTo = () =>
  `${window.location.pathname}${window.location.search}`

const defaultOnRedirecting = () => <></>
