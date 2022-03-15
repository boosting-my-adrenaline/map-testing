import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { MapContainer } from './components/map/Map.container'
import { TableContainer } from './components/table/Table.container'
import { useWindowSize } from './hooks/useDimensions'

function App() {
  const { width: windowWidth } = useWindowSize()
  // const width = windowWidth > 2100 ? 2100 : windowWidth
  const width = windowWidth

  const [tableWidth, setTableWidth] = useState(300)

  const mapWidth = windowWidth - tableWidth

  const ref: any = useRef<HTMLDivElement>()

  const filtering = (array: string[]): string[] =>
    array.filter((el) =>
      [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `.`].includes(el)
    )

  return (
    <div className={`flex h-[100vh] w-full flex-col items-center`}>
      <div className={`flex h-full w-full `}>
        <motion.div
          ref={ref}
          className={`absolute top-[50vh] z-[2022] flex h-[20px] w-[20px] cursor-grab items-center justify-center rounded-full border border-sky-600 bg-sky-100`}
          initial={{ left: 289 }}
          animate={{ left: 289 }}
          drag="x"
          dragDirectionLock
          whileTap={{ scale: 0.85, cursor: `grabbing` }}
          whileHover={{ scale: 1.07 }}
          // onDragEnd={(e, info) => console.log(info.point.x)}
          onDrag={() => {
            // console.log(
            //   filtering(
            //     ref.current.style.transform.split(' ')[0].split('')
            //   ).join('')
            //   // .match(/translateX\((\d+)(.+)\)/)
            // )
            setTableWidth(
              300 +
                Number(
                  filtering(
                    ref.current.style.transform.split(' ')[0].split('')
                  ).join('')
                )
            )
          }}
          dragConstraints={{ left: 0, right: width - 800 }}
          dragTransition={{
            power: 0,
          }}
          dragElastic={0}
        >
          <svg
            viewBox="0 0 320 512"
            className={`w-[10px] rotate-[90deg] fill-sky-600`}
          >
            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12L179.6 40.08a27.534 27.534 0 0 0-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zm264.64 64H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
          </svg>
        </motion.div>

        <TableContainer width={tableWidth} />

        <MapContainer width={mapWidth} />
      </div>
    </div>
  )
}

export default App
