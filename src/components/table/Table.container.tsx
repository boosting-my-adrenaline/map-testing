import React, { useEffect, useState } from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { TableCard } from './Table.card'
import { TableSort } from './Table.sort'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useAction'

interface IProps {
  width: number
}

export type Filter = `newest` | `oldest`

export const TableContainer: React.FC<IProps> = ({ width }) => {
  const { currentPair, pairs, locations } = useTypedSelector((state) => state)

  const [filter, setFilter] = useState<Filter>(`newest`)

  const { changeCurrentPair, changePair } = useActions()

  const locationCards = pairs.map((pair, i) => (
    <TableCard
      id={pair.id}
      isSelected={currentPair === pair.id}
      key={pair.id}
      from={locations[pair.fromRank - 1]}
      to={locations[pair.toRank - 1]}
      onClick={() => changeCurrentPair(pair.id)}
      locations={locations.filter(
        (location) => ![pair.toRank, pair.fromRank].includes(location.rank)
      )}
      changePair={changePair}
    />
  ))

  const columns = Math.floor(width / 270)

  return (
    <div
      style={{ width: width }}
      className={`z-[500] flex  shrink-0 flex-col items-center justify-start border-r border-sky-600 bg-custom1  shadow-[0px_0px_14px_7px_rgba(0,0,0,0.5)]`}
    >
      {/* <TableSort filter={filter} setFilter={setFilter} /> */}

      {/* <AnimateSharedLayout> */}
      <div
        // layout
        className={`  grid w-full  gap-[20px]  overflow-y-scroll  p-[20px]`}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        <AnimatePresence>{locationCards}</AnimatePresence>
      </div>
      {/* </AnimateSharedLayout> */}
    </div>
  )
}
