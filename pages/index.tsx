import { GetServerSideProps } from 'next'
import React from 'react'
import fs from 'fs'
import Layout from '../components/Layout'
import { Places, WeddingWeiserGeoJSON } from '../types/types'
import path from 'path'
import MapFinder from '../components/MapFinder'





export default function index({ places }: Places) {
  return (
    <Layout title="Postkarte">
      <MapFinder places={places}></MapFinder>
    </Layout >
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const filepath = path.join(process.cwd(), '/mapping.geojson')
  let rawdata = fs.readFileSync(filepath, 'utf-8');
  let places: WeddingWeiserGeoJSON = JSON.parse(rawdata);
  return {
    props: {
      places
    }
  }
}

