import React, { ReactElement } from 'react';

interface MarkerProps {
  lat: number
  lng: number
  onClick?: any
  children?: false | ReactElement
}

interface ClusterMarkerProps extends MarkerProps {
  count: number
}

const Marker = ({ children }: MarkerProps) => {

  const markerStyle = { height: '9px', width: '24px', borderRadius: '50%', marginTop: '-3px' }

  return (
    <div className="rounded-full relative">
      {children}
      <img src="/assets/marker.svg" alt="" />
      <div style={markerStyle} className="block bg-black opacity-25"></div>
    </div>
  );
};

const ClusterMarker = ({ count, onClick }: ClusterMarkerProps) => (
  <div onClick={onClick} className="rounded-full relative w-14 h-14 bg-blue-600 opacity-95 font-bold text-sm flex items-center flex-col leading-tight justify-center text-white text-center">
    {count}
    <span className="block font-light">Posts</span>
  </div>
);


export { Marker, ClusterMarker }