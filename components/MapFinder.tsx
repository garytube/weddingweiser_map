import React, { ReactElement } from 'react';
import MapContext from '../context/MapContext';
import { Map } from './map';
import { Sidebar } from './sidebar';


function MapFinder({ places }: Places): ReactElement {
  return (
    <MapContext>
      <div className="grid md:grid-cols-6 lg:grid-cols-8  max-h-screen">
        <div className="lg:col-span-3 md:col-span-2">
          <Sidebar data={places.features} />
        </div>
        <div className="lg:col-span-5 md:col-span-4 relative">
          <Map data={places.features} />
        </div>
      </div>
    </MapContext>
  );
}

export default MapFinder