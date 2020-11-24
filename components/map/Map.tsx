import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { Feature, MapFeatures } from '../../types/geojson'
import GoogleMapReact, { ChangeEventValue, MapOptions } from 'google-map-react';
import { Marker, ClusterMarker } from '.';
import { Store } from '../../context/MapContext';
import useSupercluster from 'use-supercluster';




function Map({ data }: MapFeatures): ReactElement {
  const mapRef = useRef<google.maps.Map>();
  const { state, dispatch } = useContext(Store)
  const [infoWindow, setInfoWindow] = useState<Feature>()

  // get map bounds
  const [bounds, setBounds] = useState<any>();
  const [zoom, setZoom] = useState(10);

  const { clusters, supercluster } = useSupercluster({
    points: data,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 18 },
  });



  useEffect(() => {
    const selectedPlace = data.find(p => p.properties.id == state.id)
    if (selectedPlace && mapRef.current) {
      const [lng, lat] = selectedPlace?.geometry.coordinates!
      mapRef.current.setZoom(18)
      mapRef.current.panTo({ lat, lng })
    }
  }, [state.id]);


  const mapDefaults: google.maps.MapOptions = {
    center: {
      lat: 52.5458,
      lng: 13.365
    },
    zoom: 13
  }




  const handleMapChange = (pos: ChangeEventValue) => {
    setZoom(pos.zoom);
    setBounds([pos.bounds.nw.lng, pos.bounds.se.lat, pos.bounds.se.lng, pos.bounds.nw.lat]);
  }


  const closeInfo = () => setInfoWindow(undefined)


  const onChildClickCallback = (id: number, props: any) => {
    console.log(id, props)
    if (props.children == false) {
      const selectedPlace = data.find(p => p.properties.id == id)
      if (selectedPlace) {
        // dispatch({ type: Types.Set, payload: { id } })
        setInfoWindow(selectedPlace)
        // return selectedPlace
      }
    }
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
        {clusters.map((cluster, i) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const { cluster: isCluster } = cluster.properties;

          if (isCluster) {
            return (
              <ClusterMarker
                key={`cluster-${cluster.id}`}
                lng={lng}
                lat={lat}
                count={cluster.properties.point_count}
                onClick={() => {
                  const expansionZoom = Math.min(supercluster!.getClusterExpansionZoom(cluster.properties.cluster_id), 20)
                  mapRef.current!.setZoom(expansionZoom);
                  mapRef.current!.panTo({ lat, lng });
                }}
              />
            );
          } else {
            return (
              <Marker
                key={cluster.properties.id}
                lng={lng}
                lat={lat}
              >
                {(infoWindow?.properties.id == cluster.properties.id) &&
                  <div
                    id={`info-${cluster.properties.id}`}
                    onMouseLeave={closeInfo}
                    className="block px-4 py-3 w-56 text-sm bg-white shadow-xl  rounded-lg z-50 absolute -left-16 -top-16"
                  >
                    <h4 className="py-2 text-center mx-auto font-bold text-sm leading-tight tracking-wide uppercase  text-gray-800 ">{cluster.properties.title}</h4>
                    <a href={cluster.properties.post_url} target="_blank" rel="noopener noreferrer"
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


