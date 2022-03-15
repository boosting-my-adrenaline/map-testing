import { locations } from '../../data/locations'
import { getMockedPairs } from './../../data/mockedPairs'
import {
  Action,
  TransportationActionTypes,
  TransportationState,
} from './transportation.types'

const initialState: TransportationState = {
  currentPair: 2,
  pairs: getMockedPairs(),
  locations: locations,
  currentPairPath: null,
  loading: false,
  errorMessage: null,
}

export const transportationReducer = (
  state: TransportationState = initialState,
  action: Action
): TransportationState => {
  switch (action.type) {
    case TransportationActionTypes.CHANGE_CURRENT_PAIR:
      return { ...state, currentPair: action.payload }
    case TransportationActionTypes.CHANGE_PAIR:
      return {
        ...state,
        pairs: state.pairs
          .map((pair) =>
            pair.id !== action.payload.id ? pair : action.payload
          )
          .sort((a, b) => a.id - b.id),
      }
    case TransportationActionTypes.FETCH_PATH_START:
      return { ...state, loading: true, errorMessage: null }
    case TransportationActionTypes.FETCH_PATH_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null,
        currentPairPath: action.payload,
      }
    case TransportationActionTypes.FETCH_PATH_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload }
    default:
      return state
  }
}

export type TSState = ReturnType<typeof transportationReducer>
