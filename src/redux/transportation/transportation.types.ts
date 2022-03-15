export interface Location {
  city: string
  latitude: number
  longitude: number
  population: string
  rank: number
  state: string
  growth_from_2000_to_2013?: string
}

export type CurrentPairPath = [number, number][]

export interface LocationPair {
  id: number
  fromRank: number
  toRank: number
}

export interface TransportationState {
  locations: Location[]
  pairs: LocationPair[]
  currentPair: number
  currentPairPath: null | CurrentPairPath
  loading: boolean
  errorMessage: null | string
}

export type Action =
  | ChangeCurrentPair
  | ChangePair
  | FetchPathStart
  | FetchPathSuccess
  | FetchPathFailure

export type DispatchType = (args: Action) => Action

export interface ChangeCurrentPair {
  type: TransportationActionTypes.CHANGE_CURRENT_PAIR
  payload: number
}

export interface ChangePair {
  type: TransportationActionTypes.CHANGE_PAIR
  payload: LocationPair
}

export interface FetchPathStart {
  type: TransportationActionTypes.FETCH_PATH_START
}

export interface FetchPathStart {
  payload: { to: [number, number]; from: [number, number] }
  type: TransportationActionTypes.FETCH_PATH_START
}

export interface FetchPathSuccess {
  type: TransportationActionTypes.FETCH_PATH_SUCCESS
  payload: CurrentPairPath
}

export interface FetchPathFailure {
  type: TransportationActionTypes.FETCH_PATH_FAILURE
  payload: string
}

export enum TransportationActionTypes {
  CHANGE_CURRENT_PAIR = `CHANGE_CURRENT_PAIR`,
  CHANGE_PAIR = `CHANGE_PAIR`,
  FETCH_PATH_START = `FETCH_PATH_START`,
  FETCH_PATH_SUCCESS = `FETCH_PATH_SUCCESS`,
  FETCH_PATH_FAILURE = `FETCH_PATH_FAILURE`,
}
