import {
  ChangeCurrentPair,
  ChangePair,
  CurrentPairPath,
  FetchPathFailure,
  FetchPathStart,
  FetchPathSuccess,
  TransportationActionTypes,
} from './transportation.types'

export const changeCurrentPair = (id: number): ChangeCurrentPair => ({
  type: TransportationActionTypes.CHANGE_CURRENT_PAIR,
  payload: id,
})

export const changePair = (
  id: number,
  fromRank: number,
  toRank: number
): ChangePair => ({
  type: TransportationActionTypes.CHANGE_PAIR,
  payload: { id, fromRank, toRank },
})

export const fetchPathStart = (
  from: [number, number],
  to: [number, number]
): FetchPathStart => ({
  type: TransportationActionTypes.FETCH_PATH_START,
  payload: { from, to },
})

export const fetchPathSuccess = (path: CurrentPairPath): FetchPathSuccess => ({
  type: TransportationActionTypes.FETCH_PATH_SUCCESS,
  payload: path,
})

export const fetchPathFailure = (errorMessage: string): FetchPathFailure => ({
  type: TransportationActionTypes.FETCH_PATH_FAILURE,
  payload: errorMessage,
})
