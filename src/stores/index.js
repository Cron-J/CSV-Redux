import { compose, createStore, applyMiddleware } from 'redux';
import asyncMiddleware from 'redux-async';
import { devTools } from 'redux-devtools';
import rootReducer from 'reducers';

let createStoreWithMiddleware;

if (__DEBUG__) {
  createStoreWithMiddleware = compose(applyMiddleware(asyncMiddleware),
                              devTools())(createStore);
  // createStoreWithMiddleware = applyMiddleware(asyncMiddleware
  // )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(asyncMiddleware
  )(createStore);
}

export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
