import React, { ReactElement, useContext, useRef, useState } from 'react'
import { Feature, MapFeatures } from '../../types/geojson'
import GoogleMapReact, { Bounds, ChangeEventValue, Maps } from 'google-map-react';
import { Marker } from '.';
import { Store, Types } from '../../context/MapContext';
import useSupercluster from 'use-supercluster';



const loadMapFromLocalStorge = () => {
  if (process.browser) {
    const store = localStorage.getItem('map')
    return store ? JSON.parse(store) as ChangeEventValue : undefined
  }
}

const ClusterMarker = ({ children }) => children;

function Map({ data }: MapFeatures): ReactElement {
  // const [mapPos] = useState<ChangeEventValue | undefined>(() => loadMapFromLocalStorge())
  const { state, dispatch } = useContext(Store)
  const mapRef = useRef();
  const [mapPos] = useState<ChangeEventValue | undefined>(undefined)
  const [infoWindow, setInfoWindow] = useState<Feature>()

  // get map bounds
  const [bounds, setBounds] = useState<number[]>();
  const [zoom, setZoom] = useState(10);

  const { clusters, supercluster } = useSupercluster({
    points: data,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  console.log(clusters, supercluster)

  const mapDefaults = {
    center: {
      lat: mapPos?.center.lat || 52.5458,
      lng: mapPos?.center.lng || 13.365
    },
    zoom: mapPos?.zoom || 15
  }

  const apiIsLoaded = (map: any, maps: Maps, data: Feature[]) => {
    mapRef.current = map;
    console.log("MAP LOADED")
  }



  const saveMapToLocalStorage = (pos: ChangeEventValue) => {
    setZoom(pos.zoom);
    setBounds([
      pos.bounds.nw.lng,
      pos.bounds.se.lat,
      pos.bounds.se.lng,
      pos.bounds.nw.lat
    ]);
    console.log(zoom, bounds)
    localStorage.setItem('map', JSON.stringify(pos))
  }


  const closeInfo = (e: any) => {
    setInfoWindow(undefined)
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
        {clusters && clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <ClusterMarker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                  className="cluster-marker bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white"
                >
                  {pointCount}
                </div>
              </ClusterMarker>
            );
          }

          return (
            <ClusterMarker
              key={`place-${cluster.properties.id}`}
              lat={latitude}
              lng={longitude}
            >
              <button className="crime-marker">
                <img src="/assets/marker.svg" alt="marker" />
              </button>
            </ClusterMarker>
          );
        })}




      </GoogleMapReact>
    </div >
  )
}




export default React.memo(Map)

