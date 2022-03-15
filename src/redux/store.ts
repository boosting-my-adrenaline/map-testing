import { transportationReducer } from './transportation/transportation.reducer'
import { rootReducer } from './reducer'

import { createStore, applyMiddleware, Store } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './transportation/transportation.sagas'
import {
  Action,
  DispatchType,
  TransportationState,
} from './transportation/transportation.types'

const persistConfig = {
  key: 'root',
  storage,
}

// const persistedReducer = persistReducer(persistConfig, rootReducer)
const persistedReducer = persistReducer(persistConfig, transportationReducer)

const sagaMiddleware = createSagaMiddleware()

// const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
const store: Store<TransportationState, Action> & {
  dispatch: DispatchType
} = createStore(persistedReducer, applyMiddleware(sagaMiddleware))

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }
