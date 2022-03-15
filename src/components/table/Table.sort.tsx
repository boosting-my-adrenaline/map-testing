import React from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { Filter } from './Table.container'

interface IProps {
  filter: Filter
  setFilter: (filter: Filter) => void
}

export const TableSort: React.FC<IProps> = ({ filter, setFilter }) => {
  const buttons: Filter[] = [`newest`, `oldest`]

  return (
    <AnimateSharedLayout>
      <ul
        className={`  z-10 flex w-full gap-[20px] border-gray-400 p-[12px_20px] shadow-sm shadow-gray-400`}
      >
        {buttons.map((element, i) => (
          <Item
            key={element}
            title={element}
            isSelected={filter === element}
            onClick={() => {
              setFilter(element)
              setTimeout(() => setFilter(element), 10)
            }}
          />
        ))}
      </ul>
    </AnimateSharedLayout>
  )
}

interface IProps2 {
  isSelected: boolean
  onClick: () => void
  title: string
}

const Item: React.FC<IProps2> = ({ isSelected, onClick, title }) => {
  return (
    <li
      className={` relative  block shrink-0 cursor-pointer rounded-[6px] bg-black/[.2] p-[4px_10px] text-[14px] text-black/60`}
      onClick={onClick}
      // style={{ backgroundColor: color }}
    >
      {title}
      {isSelected && (
        <motion.div
          layoutId="outline"
          className={`absolute inset-[-4px] rounded-[10px] border-[2px] border-black/90 `}
          initial={false}
          // animate={{ borderColor: color }}
          transition={{
            default: { type: 'just', stiffness: 500, damping: 30 },
          }}
        />
      )}
    </li>
  )
}
