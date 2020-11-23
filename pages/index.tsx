import { GetServerSideProps } from 'next'
import React from 'react'
import fs from 'fs'
import Layout from '../components/Layout'
import { Map } from '../components/map'
import { WeddingWeiserGeoJSON } from '../types/geojson'
import { Sidebar } from '../components/sidebar/'


interface IndexProps {
  places: WeddingWeiserGeoJSON
}


export default function index({ places }: IndexProps) {

  return (
    <Layout title="Postkarte">
      <div className="grid md:grid-cols-6 lg:grid-cols-8  max-h-screen">
        <div className="lg:col-span-3 md:col-span-2">
          <Sidebar data={places.features} />
        </div>
        <div className="lg:col-span-5 md:col-span-4 relative">
          <Map data={places.features} />
        </div>
      </div>
    </Layout >
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let rawdata = fs.readFileSync('mapping.geojson', 'utf-8');
  let places: WeddingWeiserGeoJSON = JSON.parse(rawdata);
  return {
    props: {
      places
    }
  }
}

