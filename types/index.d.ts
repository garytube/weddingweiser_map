
interface WeddingWeiserGeoJSON {
  type: string;
  features: Feature[];
}

interface Feature {
  type: FeatureType;
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  type: GeometryType;
  coordinates: number[];
}

enum GeometryType {
  Point = "Point",
}

interface CardProps extends Properties {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

interface Properties {
  id: number;
  date: Date;
  title: string;
  post_status: PostStatus;
  post_url: string;
  thumbnail: string;
}

enum PostStatus {
  Publish = "publish",
  Unpublished = "unpublished",
}

enum FeatureType {
  Feature = "Feature",
}

interface MapFeatures {
  data: Feature[]
}

interface Places {
  places: WeddingWeiserGeoJSON
}

interface GoogleAPIProps {
  maps: {
    map: any,
    maps: any,
    ref: Element | null
  }
}
