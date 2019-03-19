import './App.scss';
import {abortPendingNavigation, continuePendingNavigation, HOMEPAGE_URL} from '../actions/navigation.actions';
import AvailableMethods from './methods-pages/AvailableMethods';
import ChainEnrollment from '../components/enrollment/ChainEnrollment';
import {connect} from 'react-redux';
import {ToastContainer} from '../ux/ux';
import EnrolledMethods from './methods-pages/EnrolledMethods';
import Footer from './secondary-layout/Footer';
import Header from './secondary-layout/Header';
import history from '../history';
import Languages from '../components/languages/Languages';
import Login from './login/Login';
import MethodEnrollment from '../components/enrollment/MethodEnrollment';
import PrivateRoute from './PrivateRoute';
import React from 'react';
import {Redirect, Router, Route, Switch} from 'react-router-dom';
import NavigationDialog from './NavigationDialog';

class App extends React.PureComponent {
    render() {
        return (
            <Router history={history}>
                <React.Fragment>
                    <Header />

                    <main>
                        <Switch>
                            <PrivateRoute path="/" exact component={EnrolledMethods} />
                            <PrivateRoute path="/available/:type" exact component={AvailableMethods} />
                            <PrivateRoute
                                path="/chains/:chainUri/:methodUri/:templateUri"
                                component={ChainEnrollment}
                            />
                            <PrivateRoute path="/chains/:chainUri/:methodUri" component={ChainEnrollment} />
                            <PrivateRoute path="/chains/:chainUri" component={ChainEnrollment} />
                            <Route path="/languages" exact component={Languages} />
                            <Route path="/login" exact component={Login} />
                            <PrivateRoute path="/:methodUri/:templateType" exact component={MethodEnrollment} />
                            <PrivateRoute path="/:methodUri" exact component={MethodEnrollment} />

                            <Redirect to={HOMEPAGE_URL} />
                        </Switch>
                    </main>

                    <Route path="/login" component={Footer} />

                    <ToastContainer />
                    <NavigationDialog />
                </React.Fragment>
            </Router>
        );
    }
}

// const mapStateToProps = ({ loading }) => ({ loading });
const mapDispatchToProps = { abortPendingNavigation, continuePendingNavigation };
export default connect(null, mapDispatchToProps)(App);