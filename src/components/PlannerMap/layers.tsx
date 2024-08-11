
import type {LayerProps} from 'react-map-gl/maplibre';

export const tripRouteLayer: LayerProps ={
    type: 'line',
    source: 'earthquakes',
    id: 'line-background',
    paint: {
        'line-color': '#FF7F3F',
        'line-width': 10,
        'line-opacity': 0.7,
        'line-dasharray': [2]
    }
}
export const clusterLayer: LayerProps = {
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': ['step', ['get', 'point_count'], '#FF7F3F', 100, '#FF7F3F', 750, '#FF7F3F'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
    }
  };
  
  export const clusterCountLayer: LayerProps = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    }
  };
  
  export const unclusteredPointLayer: LayerProps = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#FF7F3F',
      'circle-radius': 10,
      'circle-stroke-width': 3,
      'circle-stroke-color': '#fff',
      'circle-opacity': 0.7
    }
  };

  export const tripCaptionLayer: LayerProps = {
    type: 'symbol',
    source: 'earthquakes',
    id: 'poi-labels',
    layout: {
      'text-field': ['get', 'description'],
      'text-size': 12,
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 2,
      'text-justify': 'auto',
      'icon-image': ['get', 'icon']
    }
  }
