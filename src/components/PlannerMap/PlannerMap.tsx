import { useEffect, useState } from 'react';
import Map, { Source, useMap, Marker, Layer, } from 'react-map-gl/maplibre';
import { TripPlanner } from '../TripPlanner/TripPlanner';
import { MapCoordinates, actions, selectActiveItinerary, ItineraryItem, Itinerary, selectCursor, newForest, ItineraryItemGroup } from '../../features/itinerary/itinerarySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clusterCountLayer, clusterLayer, tripCaptionLayer, tripRouteLayer, unclusteredPointLayer } from './layers';


export const PlannerMap = () => {
  const dispatch = useAppDispatch()
  const itinerary = useAppSelector(selectActiveItinerary)
  const cursor = useAppSelector(selectCursor)

  const [itineraryFeatures, setItineraryFeatures] = useState<any>(null);

  const { planner } = useMap();
  const canvas = planner?.getCanvas()
  const canvasWidth = canvas?.width || 500
  const canvasHeight = canvas?.height || 250

  const OnMarkerDragEnd = (e: any) => {
    const coordinates: MapCoordinates = {
      latitude: Number(e.lngLat["lat"]),
      longitude: Number(e.lngLat["lng"]),
      zoom: 12
    }

    dispatch(actions.moveSearchCusor(coordinates))
    // dispatch<any>(generateItinerary())
  }

  const itineraryItemToFeature = (x: ItineraryItem) => {
    return {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [x.longitude, x.latitude, 0.0] },
      "properties": {
        "description": x.activity,
      }
    }
  }
  const drawLineFeatures = (item: Itinerary, features: any[]) => {
    const coordinates = features.reduce<any[]>(
      (result, x) => [...result, x.geometry.coordinates], [])

    return {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": coordinates,
        "properties": {}
      }
    }
  }

  const aggregateFeaturesForItineraryItemGroup = (item: Itinerary, group_id: string, cb: Function) => {
    return itinerary?.itemGroups.filter(elem => elem.id === group_id)[0].items.reduce<any[]>(
      (result, x: ItineraryItem) => [...result, cb(x)], []) || []
  }

  const aggregateFeaturesForItinerary = (item: Itinerary, cb: Function) => {
    return itinerary?.itemGroups.reduce<any[]>(
      (result, x: ItineraryItemGroup) => [...result, ...aggregateFeaturesForItineraryItemGroup(item, x.id, cb)], []) || []
  }

  useEffect(() => {
    if (itinerary) {
      const features = aggregateFeaturesForItinerary(itinerary, itineraryItemToFeature)
      const lineFeatures = drawLineFeatures(itinerary, features)

      const featureCollection =
      {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [...features].concat(lineFeatures)
      }

      setItineraryFeatures(featureCollection)
    }

  }, [itinerary, setItineraryFeatures])


  return (
    <>
      <Map
        id="planner"
        initialViewState={{
          longitude: newForest.longitude,
          latitude: newForest.latitude,
          zoom: newForest.zoom
        }}
        style={{
          position: 'relative',
          width: "100%",
          height: 250
        }}
        onMove={evt => { }}
        // mapStyle="https://tiles.stadiamaps.com/styles/osm_bright.json"
        mapStyle="https://tiles.stadiamaps.com/styles/stamen_watercolor.json"
      >
        <Marker
          longitude={cursor.longitude}
          latitude={cursor.latitude}
          anchor="bottom"
          offset={[canvasWidth / 4, -canvasHeight / 2]}
          draggable={true}
          onClick={() => { }}
          onDragEnd={OnMarkerDragEnd}
        />

        <Source
          id="earthquakes"
          type="geojson"
          // data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          data={itineraryFeatures}
          cluster={false}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...tripRouteLayer} />
          <Layer {...tripCaptionLayer} />
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>

      <div className="MuiPaper-root" style={{ marginTop: 0, padding: 0, }}>
        <TripPlanner />
      </div>
    </>)
}
