export interface WeddingWeiserGeoJSON {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: FeatureType;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: GeometryType;
  coordinates: number[];
}

export enum GeometryType {
  Point = "Point",
}

export interface Properties {
  id: number;
  date: Date;
  title: string;
  post_status: PostStatus;
  post_url: string;
  thumbnail: string;
}

export enum PostStatus {
  Publish = "publish",
  Unpublished = "unpublished",
}

export enum FeatureType {
  Feature = "Feature",
}

export interface MapFeatures {
  data: Feature[]
}
