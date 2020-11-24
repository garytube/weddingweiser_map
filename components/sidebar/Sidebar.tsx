import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { Store, Types } from '../../context/MapContext';
import { Card } from '../map/Card';



function Sidebar({ data }: MapFeatures): ReactElement {
  const [post, setPost] = useState<Properties | undefined>()

  const { state, dispatch } = useContext(Store)

  const handleSelectSidebarPost = (id: number) => {
    dispatch({ type: Types.Set, payload: { id } })
  }


  useEffect(() => {
    if (state.id) {
      const selectedPost = data.find(d => d.properties.id == state.id)
      setPost(selectedPost?.properties || undefined)
    }
  }, [state.id])



  return (
    <div style={{ height: 'calc(100vh - 75px)' }} className="overflow-y-scroll">
      {data.map((place, i) => (
        <div key={place.properties.id}>
          <Card
            onClick={() => handleSelectSidebarPost(place.properties.id)}
            {...place.properties}
          />
        </div>
      ))}
    </ div >
  )
}

export default Sidebar
