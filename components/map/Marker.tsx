import React, { ReactElement } from 'react';
import { Properties } from '../../types/geojson';

interface MarkerProps {
  text: string | number
  lat: number
  lng: number
  children?: ReactElement
}

const Marker = ({ children, text }: MarkerProps) => {

  const markerStyle = { height: '9px', width: '24px', borderRadius: '50%', marginTop: '-3px' }

  return (
    <div className="rounded-full relative">
      {children}
      <img src="/assets/marker.svg" alt="" />
      <div style={markerStyle} className="block bg-black opacity-25"></div>
    </div>
  );
};


export default Marker