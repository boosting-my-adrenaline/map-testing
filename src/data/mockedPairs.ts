import { LocationPair } from './../redux/transportation/transportation.types'
import { locations } from './locations'

const getPair = (id: number): LocationPair => {
  let from = locations[Math.floor(Math.random() * (locations.length - 1))].rank
  let to = locations.filter((el) => el.rank !== from)[
    Math.floor(Math.random() * (locations.length - 2))
  ].rank

  return { id: id, fromRank: from, toRank: to }
}

export const getMockedPairs = (): LocationPair[] => {
  let i = 0
  const res = []
  while (i < 30) {
    res.push(getPair(i))
    i++
  }
  return res
}
