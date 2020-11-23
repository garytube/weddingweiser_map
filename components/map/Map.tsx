import React, { ReactElement, useContext, useRef, useState } from 'react'
import { Feature, MapFeatures } from '../../types/geojson'
import GoogleMapReact, { Bounds, ChangeEventValue, Maps } from 'google-map-react';
import { Marker, ClusterMarker } from '.';
import { Store, Types } from '../../context/MapContext';
import useSupercluster, { UseSuperclusterArgument } from 'use-supercluster';

interface ClusterFeature extends Feature {
  id: number
}


function Map({ data }: MapFeatures): ReactElement {
  const mapRef = useRef() as React.MutableRefObject<any>;;
  const { state, dispatch } = useContext(Store)
  const [infoWindow, setInfoWindow] = useState<Feature>()

  // get map bounds
  const [bounds, setBounds] = useState<any>();
  const [zoom, setZoom] = useState(10);

  const { clusters, supercluster } = useSupercluster({
    points: data,
    bounds,
    zoom,
    options: { radius: 100, maxZoom: 20 },
  });


  const mapDefaults = {
    center: {
      lat: 52.5458,
      lng: 13.365
    },
    zoom: 13
  }

  console.log(mapRef.current)


  const handleMapChange = (pos: ChangeEventValue) => {
    setZoom(pos.zoom);
    setBounds([pos.bounds.nw.lng, pos.bounds.se.lat, pos.bounds.se.lng, pos.bounds.nw.lat]);
  }


  const closeInfo = () => setInfoWindow(undefined)



  const onChildClickCallback = (id: number) => {
    console.log(id)
    const selectedPlace = data.find(p => p.properties.id == id)
    dispatch({ type: Types.Set, payload: { id } })
    return selectedPlace ? setInfoWindow(selectedPlace) : undefined
  }


  return (
    <div className="bg-gray-100 h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_KEY || '', language: 'de', region: 'DE' }}
        defaultCenter={mapDefaults.center}
        defaultZoom={mapDefaults.zoom}
        onGoogleApiLoaded={({ map }) => { mapRef.current = map; }}
        onChange={handleMapChange}
        onChildMouseEnter={onChildClickCallback}
        yesIWantToUseGoogleMapApiInternals
      >
        {clusters.map(place => {
          const { id } = place
          const [lng, lat] = place.geometry.coordinates;
          const { cluster: isCluster } = place.properties;

          if (isCluster) {
            return (
              <ClusterMarker
                key={`cluster-${place.id}`}
                lng={lng}
                lat={lat}
                count={place.properties.point_count}
                onClick={() => {
                  const expansionZoom = Math.min(supercluster?.getClusterExpansionZoom ? (Number(place.id) || 0) : 20)
                  mapRef.current.setZoom(expansionZoom);
                  mapRef.current.panTo({ lat, lng });
                }}
              />
            );
          } else {
            return (
              <Marker
                key={place.properties.id}
                lng={lng}
                lat={lat}
              >
                {(infoWindow?.properties.id == place.properties.id) &&
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
                }
              </Marker>
            );
          }

        })}




      </GoogleMapReact>
    </div >
  )
}




export default React.memo(Map)


