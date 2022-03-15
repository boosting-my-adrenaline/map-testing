import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useActions } from '../../hooks/useAction'
import useElementSize from '../../hooks/useElementSize'
import useEventListener from '../../hooks/useEventListener'
import { Location } from '../../redux/transportation/transportation.types'

interface IProps {
  id: number
  from: Location
  to: Location
  onClick: () => void
  isSelected: boolean
  locations: Location[]
  changePair: (id: number, toRank: number, fromRank: number) => void
}

export const TableCard: React.FC<IProps> = ({
  id,
  onClick,
  isSelected,
  from,
  to,
  locations,
}) => {
  const { changePair } = useActions()
  const [isFromOpen, setIsFromOpen] = useState(false)
  const [isToOpen, setIsToOpen] = useState(false)

  const handleSetFromOpen = () => {
    setTimeout(() => setIsFromOpen(false))

    let prev = isFromOpen
    setTimeout(() => {
      prev ? setIsFromOpen(!prev) : setIsFromOpen(!prev)
    })
  }

  const handleSetToOpen = () => {
    setTimeout(() => setIsToOpen(false))

    let prev = isToOpen
    setTimeout(() => {
      prev ? setIsToOpen(!prev) : setIsToOpen(!prev)
    })
  }

  const ref: any = useRef()

  const handleClickOutside = () => {
    setIsFromOpen(false)
    setIsToOpen(false)
  }

  const handleChangeFrom = (from: number) => {
    changePair(id, from, to.rank)
  }

  const handleChangeTo = (to: number) => {
    changePair(id, from.rank, to)
  }

  const swap = () => {
    changePair(id, to.rank, from.rank)
  }

  useEventListener(`click`, handleClickOutside)

  return (
    <motion.div
      onClick={onClick}
      layout
      className={`flex  h-min w-full flex-grow justify-center rounded-[4px] ${
        isSelected ? `bg-white/80 text-black` : `bg-white/[.2] text-white`
      } p-[5px]`}
      ref={ref}
    >
      <div className={`flex flex-grow flex-col items-start justify-center`}>
        <div
          className={`flex h-[28px] w-full flex-col border-[0.5px] border-sky-100/20 bg-sky-900/20`}
        >
          <div className={`flex h-[28px] w-full p-[1px_5px]`}>
            <motion.div
              initial={{ width: isSelected ? 30 : 0 }}
              animate={{ width: isSelected ? 30 : 0 }}
              className={`relative flex h-[22px] w-[22px]  shrink-0 flex-grow-0 translate-y-[14px] translate-x-[-5px] cursor-pointer items-center justify-center overflow-hidden rounded-sm `}
              onMouseDown={swap}
            >
              <svg
                viewBox="0 0 32 32"
                width={22}
                height={22}
                xmlSpace="preserve"
                className={`rounded-full border border-black bg-sky-100 p-[2px] hover:border-sky-700 hover:fill-sky-700 active:bg-sky-400`}
              >
                <title />
                <path d="M27.6 20.6 24 24.2V4h-2v20.2l-3.6-3.6L17 22l6 6 6-6zM9 4l-6 6 1.4 1.4L8 7.8V28h2V7.8l3.6 3.6L15 10z" />
                <path
                  style={{
                    fill: 'none',
                  }}
                  d="M0 0h32v32H0z"
                />
              </svg>
            </motion.div>

            <motion.div
              animate={{
                marginLeft: isSelected ? -5 : 0,
              }}
              className={` w-full`}
            >
              {' '}
              {from.city}
            </motion.div>
            <motion.div
              animate={{
                scale: !isSelected ? 0 : 1,
                width: !isSelected ? 0 : ``,
              }}
              className={`flex cursor-pointer items-center justify-center`}
              onMouseUp={handleSetFromOpen}
            >
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                className={`hover:fill-sky-700`}
              >
                <path d="M16.5 7.5h-13C2.7 7.5 2 6.8 2 6s.7-1.5 1.5-1.5h13c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5zM20.5 13.5h-17c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h17c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5zM16.5 19.5h-13c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h13c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" />
              </svg>
            </motion.div>
          </div>
          {isFromOpen && (
            <TableList
              locations={locations.filter(
                (loc, i) =>
                  loc.rank !== to.rank && loc.rank !== from.rank && i !== 0
              )}
              onClick={handleChangeFrom}
            />
          )}
        </div>
        <div
          className={`flex h-[28px]  w-full flex-col  border-[0.5px] border-emerald-100/20 bg-emerald-900/20 `}
        >
          <div className={`flex  h-[28px] w-full p-[1px_5px]`}>
            <motion.div animate={{ width: isSelected ? 30 : 0 }} />

            <span className={`w-full`}> {to.city}</span>
            <motion.div
              animate={{
                scale: !isSelected ? 0 : 1,
                width: !isSelected ? 0 : ``,
              }}
              className={`flex cursor-pointer items-center justify-center`}
              onClick={handleSetToOpen}
            >
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                className={`rotate-180 hover:fill-sky-700`}
              >
                <path d="M20.5 7.5h-17C2.7 7.5 2 6.8 2 6s.7-1.5 1.5-1.5h17c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5zM20.5 19.5h-17c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h17c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5zM20.5 13.5h-13c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h13c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" />
              </svg>
            </motion.div>
          </div>
          {isToOpen && (
            <TableList
              locations={locations.filter(
                (loc, i) =>
                  loc.rank !== to.rank && loc.rank !== from.rank && i !== 0
              )}
              onClick={handleChangeTo}
            />
          )}
        </div>
      </div>

      <motion.div
        className={`cursor-pointer`}
        initial={{
          scale: isSelected ? 0 : 1,
          width: isSelected ? 0 : ``,
          marginLeft: isSelected ? 0 : 8,
        }}
        animate={{
          scale: isSelected ? 0 : 1,
          width: isSelected ? 0 : ``,
          marginLeft: isSelected ? 0 : 8,
        }}
      >
        <svg
          viewBox="0 0 64 64"
          width="44px"
          className={`${0 ? `fill-white` : ``}`}
        >
          <path
            className={`fill-black `}
            d="M63.5 16c-.3-.2-.7-.3-1-.1l-20.4 7.3L27.8 18c.8-2 1.2-3.8 1.2-5.3 0-2.7-1-5.1-2.9-7-1.9-1.9-4.4-2.9-7-2.9-5.5 0-9.9 4.4-9.9 9.9 0 1.9.7 4.2 1.9 7L.7 23.2c-.4.2-.7.6-.7 1v36c0 .4.2.7.5.9.2.1.4.2.6.2.1 0 .3 0 .4-.1L21.9 54l19.8 7.3c.2.1.5.1.7 0l20.8-7.4c.4-.2.7-.6.7-1v-36c.1-.4-.1-.7-.4-.9zM19.1 4.8c2.1 0 4 .8 5.4 2.3 1.5 1.4 2.3 3.4 2.3 5.4 0 1.4-.5 3.3-1.5 5.5-1.8 4-4.8 8.2-6.2 10.1-.2-.2-.3-.4-.5-.7-1.3-1.8-3.4-4.8-4.9-7.9-1.5-2.9-2.2-5.3-2.2-7.1-.1-4.1 3.4-7.6 7.6-7.6zm42.7 47.3-19.7 7-19.8-7.3c-.1 0-.3-.1-.4-.1-.1 0-.3 0-.4.1L2.2 58.7V25l10-3.5v.1c.1.1.1.2.2.3l.3.6c.1.1.1.2.2.3l.3.6c.1.1.1.2.2.3.1.2.2.4.3.5.1.1.1.2.2.3.1.2.2.3.3.5.1.1.1.2.2.3.1.2.2.3.3.5.1.1.1.2.2.3.1.2.2.3.3.5.1.1.1.2.2.3.1.2.2.3.3.5.1.1.1.2.2.2.1.2.2.3.3.4 0 .1.1.1.1.2.1.2.2.3.3.4l.1.1c.1.1.2.3.3.4l.1.1c.1.1.2.3.3.4l.3.3c.2.3.4.5.4.6.2.3.5.4.9.4.3 0 .6-.2.9-.4l.3-.3.1-.1.2-.2.1-.1c.1-.1.1-.2.2-.3 0-.1.1-.1.1-.2.1-.1.2-.2.2-.3.1-.1.1-.2.2-.3.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3.1-.1.2-.2.3-.4.1-.1.2-.2.2-.3.1-.1.2-.3.3-.4.1-.1.2-.3.3-.4.1-.1.2-.3.3-.4.1-.1.2-.3.3-.4.1-.2.2-.3.3-.5.1-.1.2-.3.3-.4.1-.2.2-.3.3-.5.1-.2.2-.3.3-.5.1-.2.2-.3.3-.5.1-.2.2-.3.3-.5.1-.2.2-.3.3-.5.1-.2.2-.3.3-.5.1-.2.2-.3.3-.5.1-.2.2-.3.3-.5.1-.2.2-.4.3-.5.1-.2.2-.3.2-.5v-.1l14.8 5.4c.2.1.5.1.7 0l19.3-6.9v33.9z"
          />
          <path d="M52.5 42.4c.2.1.5.1.7.1.6 0 1.2-.2 1.7-.5.7-.5 1.2-1.2 1.4-2 .2-.8 0-1.7-.4-2.4-.5-.7-1.2-1.2-2-1.4-1.7-.4-3.5.7-3.9 2.4-.2.8 0 1.7.4 2.4.6.7 1.3 1.2 2.1 1.4zm-.3-3.4c.1-.6.7-.9 1.2-.8.3.1.5.2.6.5.1.2.2.5.1.8-.1.3-.2.5-.5.6-.2.1-.5.2-.8.1-.3-.1-.5-.2-.6-.5V39zM11 39.1l-.7.4-.4-.7c-.3-.5-1-.7-1.5-.3-.5.3-.7 1-.3 1.5l.4.7-.7.4c-.5.3-.7 1-.3 1.5.1.4.5.5.8.5.2 0 .4-.1.6-.2l.7-.4.4.7c.2.3.6.5.9.5.2 0 .4-.1.6-.2.5-.3.7-1 .3-1.5l-.4-.7.7-.4c.5-.3.7-1 .3-1.5-.2-.5-.9-.6-1.4-.3zM21.3 42.1c-1.3 0-3-.2-4.1-.5-.6-.1-1.2.3-1.3.9-.1.6.3 1.2.9 1.3 1.1.2 2.9.5 4.5.5.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1zM29.5 38.3c-.7 1-1.5 1.8-2.5 2.4-.3.2-.7.4-1.1.6-.6.2-.8.9-.6 1.5.2.4.6.7 1 .7.1 0 .3 0 .4-.1.5-.2.9-.4 1.3-.7 1.2-.8 2.2-1.7 3.1-2.9.4-.5.3-1.2-.2-1.5-.3-.6-1-.5-1.4 0zM37.5 31.1c-1.1 0-1.7.3-2.3.5-1.4.6-2.6 1.9-2.9 2.3-.4.5-.3 1.2.1 1.6.2.2.5.3.7.3.3 0 .6-.1.8-.4.5-.6 1.3-1.3 2.1-1.7.6-.2.8-.3 1.5-.4.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1zM41.6 32.8c-.2.6 0 1.2.6 1.5 1.1.5 2.7 1.3 3.9 2.2.2.1.4.2.6.2.4 0 .7-.2.9-.5.3-.5.2-1.2-.3-1.5-1.4-.9-3-1.8-4.3-2.3-.5-.4-1.1-.1-1.4.4zM19.1 15.2c1.9 0 3.4-1.5 3.4-3.4S21 8.4 19.1 8.4s-3.4 1.5-3.4 3.4 1.6 3.4 3.4 3.4zm0-4.6c.6 0 1.2.5 1.2 1.2 0 .6-.5 1.2-1.2 1.2-.6 0-1.2-.5-1.2-1.2.1-.6.6-1.2 1.2-1.2z" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

interface IProps2 {
  locations: Location[]
  onClick: (rank: number) => void
}
const TableList: React.FC<IProps2> = ({ locations, onClick }) => {
  return (
    <div className={` relative z-10  max-h-[196] w-full  flex-grow-0 bg-white`}>
      <ul className={`relative h-full max-h-[196px] w-full overflow-scroll`}>
        {locations
          .filter((el) => el)
          .map((location) => (
            <li key={location.rank} onClick={() => onClick(location.rank)}>
              <div
                className={`flex h-[28px] w-full cursor-pointer border-[0.5px] border-gray-300 hover:bg-gray-300`}
              >
                <div
                  className={`text-gray-700! w-[37px] text-center font-[700] text-transparent`}
                >
                  {location.rank}
                </div>{' '}
                <span className={`w-full`}>{location.city}</span>
                <div
                  className={`min-w-[27px] bg-gray-200 text-center text-gray-700`}
                >
                  {location.state}
                </div>{' '}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
