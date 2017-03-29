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
          <Route path="/back/editPersonalInfo" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/resume/editInfo').default);
            });
          }} />
          <Route path="/back/editSkillsLevel" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/resume/editSkills').default);
            });
          }} />
          <Route path="/back/editProjectExp" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/resume/editProjectExp').default);
            });
          }} />
          <Route path="/back/editWorkExp" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/resume/editWorkExp').default);
            });
          }} />
          <Route path="/back/editCompetition" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/resume/editCompetition').default);
            });
          }} />
          <Route path="/back/editLibrary" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/resume/editLibrary').default);
            });
          }} />
          <Route path="/back/category" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/blog/category').default);
            });
          }} />
          <Route path="/back/ArticalList" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/blog/ArticalList').default);
            });
          }} />
          <Route path="/back/editArtical" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/blog/editArtical').default);
            });
          }} />
          <Route path="/back/editArtical/:id" getComponent={(location, callback) => {
            require.ensure([], (require) => {
              callback(null, require('../view/back/blog/editArtical').default);
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
      <Route path="/blog/:userId/:typeId/:articalId" getComponent={(location, callback) => {
      require.ensure([], (require) => {
        callback(null, require('../view/blog/article').default);
      });
    }} />
    </Route>
  </Route>
  	<Route path="*" component={ ErrorPage } />
</Router>);
export default router;