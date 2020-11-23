import React, { DetailedHTMLProps, HTMLAttributes, ReactElement, useContext, useState } from 'react'
import { Feature, MapFeatures, PostStatus, WeddingWeiserGeoJSON } from '../../types/geojson'
import GoogleMapReact, { ChangeEventValue, Maps } from 'google-map-react';
import { Marker } from '.';
import { Store, Types } from '../../context/MapContext';
import { type } from 'os';

const loadMapFromLocalStorge = () => {
  if (process.browser) {
    const store = localStorage.getItem('map')
    return store ? JSON.parse(store) as ChangeEventValue : undefined
  }
}

function Map({ data }: MapFeatures): ReactElement {
  // const [mapPos] = useState<ChangeEventValue | undefined>(() => loadMapFromLocalStorge())
  const { state, dispatch } = useContext(Store)
  const [mapPos] = useState<ChangeEventValue | undefined>(undefined)
  const [infoWindow, setInfoWindow] = useState<Feature>()


  const mapDefaults = {
    center: {
      lat: mapPos?.center.lat || 52.5458,
      lng: mapPos?.center.lng || 13.365
    },
    zoom: mapPos?.zoom || 15
  }

  const apiIsLoaded = (map: any, maps: Maps, data: Feature[]) => {
    console.log("api is loaded")
  }

  const saveMapToLocalStorage = (pos: ChangeEventValue) => {
    localStorage.setItem('map', JSON.stringify(pos))
  }


  const closeInfo = (e: any) => {
    setInfoWindow(undefined)
    // dispatch({ type: Types.Set, payload: { id: 0 } })
  }


  const onChildClickCallback = (id: number) => {
    const selectedPlace = data.find(p => p.properties.id == id)
    dispatch({ type: Types.Set, payload: { id } })
    return selectedPlace ? setInfoWindow(selectedPlace) : undefined
  }


  return (
    <div className="bg-gray-100 h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAYuWsxkT5dUw3CPn8c9Kl0l98L2Xu60q0', language: 'de', region: 'DE' }}
        defaultCenter={mapDefaults.center}
        defaultZoom={mapDefaults.zoom}
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, data)}
        onChange={saveMapToLocalStorage}
        onChildMouseEnter={onChildClickCallback}
        yesIWantToUseGoogleMapApiInternals
      >

        {data && data.map(place => (
          <Marker
            key={place.properties.id}
            lng={place.geometry.coordinates[0]}
            lat={place.geometry.coordinates[1]}
            text={place.properties.id}
          >
            {(infoWindow?.properties.id == place.properties.id) ?
              <div
                id={`info-${place.properties.id}`}
                onMouseLeave={closeInfo}
                className="block px-4 py-3 w-56 text-sm bg-white shadow-xl  rounded-lg z-50 absolute -left-16 -top-16"
              >
                <h4 className="py-2 text-center mx-auto font-bold text-sm leading-tight tracking-wide uppercase  text-gray-800 ">{place.properties.title}</h4>
                <a href={place.properties.post_url} target="_blank" rel="noopener noreferrer"
                  className=" cursor-pointer w-100 whitespace-nowrap transition-all flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-wedding md:py-1  md:px-2 uppercase tracking-wide">
                  Beitrag lesen
          </a>
              </div>
              : <></>
            }
          </Marker>
        ))}


      </GoogleMapReact>
    </div >
  )
}




export default React.memo(Map)

