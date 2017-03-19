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
    }} >
    <IndexRoute getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/index').default); 
            }, 'home');
          }} />
          <Route path="/back/editTop" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/resume/editTop').default);
            });
          }} />
    </Route>
    <Route path="/login" getComponent={(location, callback) => {
      require.ensure([], (require) => {
        callback(null, require('../view/back/login').default);
      });
    }} />
    <Route path="/register" getComponent={(location, callback) => {
      require.ensure([], (require) => {
        callback(null, require('../view/back/register').default);
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