import React, { DetailedHTMLProps, HTMLAttributes, ReactElement, useState } from 'react'
import { Feature, MapFeatures, PostStatus, WeddingWeiserGeoJSON } from '../../types/geojson'
import GoogleMapReact, { ChangeEventValue, Maps } from 'google-map-react';
import { Marker } from '.';

const loadMapFromLocalStorge = () => {
  if (process.browser) {
    const store = localStorage.getItem('map')
    return store ? JSON.parse(store) as ChangeEventValue : undefined
  }
}

function Map({ data }: MapFeatures): ReactElement {
  // const [mapPos] = useState<ChangeEventValue | undefined>(() => loadMapFromLocalStorge())
  const [mapPos] = useState<ChangeEventValue | undefined>(undefined)
  const [marker, setMarker] = useState<Feature[]>(data)

  const mapDefaults = {
    center: {
      lat: mapPos?.center.lat || 52.5458,
      lng: mapPos?.center.lng || 13.365
    },
    zoom: mapPos?.zoom || 13
  }

  const apiIsLoaded = (map: any, maps: Maps, data: Feature[]) => {
    console.log("api is loaded")
  }

  const saveMapToLocalStorage = (pos: ChangeEventValue) => {
    localStorage.setItem('map', JSON.stringify(pos))
  }




  const onChildClickCallback = (key: number) => {
    const selectedIndex = data.findIndex(p => p.properties.id == key)
    const newState = [...marker]
    newState[selectedIndex]['properties'] = { ...marker[selectedIndex]['properties'], post_status: PostStatus.Unpublished }
    setMarker(newState)
    console.log("set state", newState[selectedIndex]['properties'])
  }

  return (
    <div className="bg-gray-100 h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBvdZvoXL-99AQX95VrT8QXpgcXvxGgF2c', language: 'de', region: 'DE' }}
        defaultCenter={mapDefaults.center}
        defaultZoom={mapDefaults.zoom}
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, data)}
        onChange={saveMapToLocalStorage}
        onChildClick={onChildClickCallback}
        yesIWantToUseGoogleMapApiInternals
      >

        {marker && marker.map(place => (
          <Marker key={place.properties.id} status={place.properties.post_status} lng={place.geometry.coordinates[0]} lat={place.geometry.coordinates[1]}>
            {place.properties.id}
          </Marker>
        ))}


      </GoogleMapReact>
    </div >
  )
}




export default React.memo(Map)

