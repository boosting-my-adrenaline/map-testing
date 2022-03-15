import {
  FetchPathStart,
  TransportationActionTypes,
  TransportationState,
} from './transportation.types'
import {
  takeLatest,
  put,
  StrictEffect,
  call,
  all,
  select,
} from 'redux-saga/effects'
import axios from 'axios'
import { fetchPathFailure, fetchPathSuccess } from './transportation.actions'

const axiosBasic = axios.create({
  baseURL: ``,
})

interface IResponse {
  data: any
}

interface IManeuvers {
  startPoint: {
    lat: number
    lng: number
  }
}

function isCorrect(response: any): response is IResponse {
  return `data` in response
}

function maneuversTest(maneuver: any): maneuver is IManeuvers {
  return `startPoint` in maneuver
}

function* workerSaga(action: FetchPathStart): Generator<StrictEffect> {
  try {
    const { to, from } = action.payload
    const response = yield call(
      axiosBasic,
      `http://www.mapquestapi.com/directions/v2/route?key=sAbbGOjBllWC4wGfcUMApRMzXB9uX1z5&from=[${from}]&to=[${to}]`
    )
    console.log(to, from)
    if (response && isCorrect(response)) {
      let maneuvers: IManeuvers[] = response.data.route.legs[0].maneuvers
      // if (maneuvers && maneuversTest(maneuvers[0])) {
      const points: [number, number][] = maneuvers.map((el) => [
        el.startPoint.lat,
        el.startPoint.lng,
      ])
      console.log(points)
      yield put(fetchPathSuccess(points))
      // } else {
      //   console.log(`something gone wrong`)
      // }
    } else {
      console.log(`something gone wrong`)
    }
  } catch (error) {
    console.log(error)
    yield put(fetchPathFailure(`something gone wrong`))
  }
}

export function* watcherSaga(): Generator<StrictEffect> {
  yield takeLatest(TransportationActionTypes.FETCH_PATH_START, workerSaga)
  // yield takeLatest(TransportationActionTypes.CHANGE_CURRENT_PAIR, workerSaga)
  // yield takeLatest(TransportationActionTypes.CHANGE_PAIR, workerSaga)
}

export default function* rootSaga() {
  yield all([call(watcherSaga)])
}
