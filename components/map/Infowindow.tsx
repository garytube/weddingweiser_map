import React, { ReactElement } from 'react'
import { Feature } from '../../types/geojson'

interface Props {
  place: Feature
}

const closeInfo = () => null

export default function Infowindow({ place }: Props): ReactElement {
  return (
    <div
      id={`info-${place.properties.id}`}
      onMouseLeave={closeInfo}
      className="block px-4 py-3 w-56 text-sm bg-white shadow-xl  rounded-lg z-50 absolute -left-16 -top-16"
    >
      <h4 className="py-2 text-center mx-auto font-bold text-sm leading-tight tracking-wide uppercase  text-gray-800 ">{place.properties.title}</h4>
      <a href={place.properties.post_url} target="_blank" rel="noopener noreferrer"
        className=" cursor-pointer w-100 whitespace-nowrap transition-all flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-wedding md:py-1  md:px-2 uppercase tracking-wide">
        Beitrag lesen</a>
    </div>
  )
}
