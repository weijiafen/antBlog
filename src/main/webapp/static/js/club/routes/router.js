import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';
import Application from '../application';
import ErrorPage from '../errorPage';

const router = (
<Router history={hashHistory}>
  <Route path="/" component={Application}>
    <IndexRoute getComponent={(location, callback) => {
          require.ensure([], (require) => {
            callback(null, require('../view/square/app').default); 
          }, 'home');
        }} />
    <Route path="/back" getComponent={(location, callback) => {
      require.ensure([], (require) => {
        callback(null, require('../view/back/app').default);
      });
    }} />
    <Route path="/home/:userId" getComponent={(location, callback) => {
      require.ensure([], (require) => {
        callback(null, require('../view/home/app').default);
      });
    }} />
    <Route path="/blog/:userId/:typeId" getComponent={(location, callback) => {
      require.ensure([], (require) => {
        callback(null, require('../view/blog/app').default);
      });
    }} >
      <IndexRoute getComponent={(location, callback) => {
          require.ensure([], (require) => {
            callback(null, require('../view/blog/content').default); 
          });
        }} />
      <Route path="/blog/:userId/:typeId/:articleId" getComponent={(location, callback) => {
      require.ensure([], (require) => {
        callback(null, require('../view/blog/article').default);
      });
    }} />
    </Route>
  </Route>
  	<Route path="*" component={ ErrorPage } />
</Router>);
export default router;