import React, { useEffect, useState } from 'react'
import {
  MapContainer as MapContainerLeafLet,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet'
import L from 'leaflet'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Location } from '../../redux/transportation/transportation.types'
import { polyline } from '../../data/polyline'
import { useActions } from '../../hooks/useAction'

import polygon from '@mapbox/polyline'

const image1 = require('../../static/image1.png')
const image2 = require('../../static/image2.png')

interface IProps {
  width: number
  lg?: boolean
}

export const MapContainer: React.FC<IProps> = ({ width, lg }) => {
  const {
    currentPair,
    pairs,
    currentPairPath: path,
    locations,
    loading,
  } = useTypedSelector((state) => state)

  let currentFromRank = pairs[currentPair].fromRank
  let currentToRank = pairs[currentPair].toRank

  let currentFrom: Location = locations.filter(
    (el) => el.rank === currentFromRank
  )[0]
  let currentTo: Location = locations.filter(
    (el) => el.rank === currentToRank
  )[0]

  function getIcon(iconSize: number, start: boolean) {
    return L.icon({
      iconUrl: start ? image1 : image2,
      iconSize: [iconSize, iconSize],
      iconAnchor: [25, 46],
    })
  }

  const [currentPath, setCurrentPath] = useState<[number, number][]>([
    [0, 0],
    [0, 0],
  ])

  const { fetchPathStart } = useActions()

  useEffect(() => {
    setTimeout(
      () =>
        fetchPathStart(
          [currentFrom.latitude, currentFrom.longitude],
          [currentTo.latitude, currentTo.longitude]
        ),
      2000
    )
  }, [])

  useEffect(() => {
    if (path && path.length > 0) {
      setCurrentPath(path)
      console.log(currentPath)
    }
  }, [path])

  const marker = (location: Location, from: boolean) => (
    <Marker
      key={location.rank}
      position={[location.latitude, location.longitude]}
      icon={getIcon(50, from)}
    >
      <Popup position={[location.latitude, location.longitude]}>
        <div className={``}>
          <h1 className={`text-[14px] font-[700]`}>
            {' '}
            {location.state}, {location.city}
          </h1>
          <p></p>
        </div>
      </Popup>
    </Marker>
  )

  const limeOptions = { color: 'lime' }

  return (
    <div
      style={{ width: lg ? width : `100%` }}
      className={`flex h-full shrink-0 flex-grow-0 items-center justify-center bg-sky-50 `}
    >
      {/* {loading && (
        <div
          className={`fixed inset-0 z-[450] flex items-center justify-center bg-sky-100/20`}
        >
          {' '}
          LOADING
        </div>
      )} */}
      <MapContainerLeafLet
        center={[35.58544, -93.2578]}
        zoom={5}
        className={`h-screen ${lg ? `w-[90vw]` : `w-screen`}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {marker(currentFrom, true)}
        {marker(currentTo, false)}
        {/* <Polyline positions={currentPath} pathOptions={limeOptions} /> */}
      </MapContainerLeafLet>
    </div>
  )
}
