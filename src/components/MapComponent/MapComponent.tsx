import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import { fromLonLat } from "ol/proj";
import { WKT } from "ol/format";
import { MapComponentProps } from "./interface";

const MapComponent = ({
  initialCenter,
  initialZoom,
  wkt,
}:MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const vectorSource = useRef<VectorSource | null>(null);
  const format = useRef<WKT | null>(null);
  const feature = useRef<Feature | null>(null);
  const view = useRef<View | null>(null);

  useEffect(() => {
    if (!map && mapContainer.current) {
      vectorSource.current = new VectorSource();
      format.current = new WKT();
      feature.current = new Feature();

      view.current = new View({
        center: fromLonLat(initialCenter),
        zoom: initialZoom,
      });

      const newMap = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: vectorSource.current,
          }),
        ],
        target: mapContainer.current,
        view: view.current,
      });

      setMap(newMap);
    }
  }, []);

  useEffect(() => {
    if (map) {
      renderWktAndFly(wkt);
    }
  }, [wkt, map]); 

  const renderWktAndFly = (wkt: string) => {
    if (wkt !== "") {
      format.current = new WKT();

      feature.current = format.current.readFeature(wkt, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });

      vectorSource.current.clear();
      vectorSource.current.addFeature(feature.current);

      flyTo();
    }
  };

  const flyTo = () => {
    const zoom = view.current?.getZoom() || 12;
    const duration = 2000;
    const extent = feature.current?.getGeometry().getExtent();

    if (extent) {
      view.current?.animate(
        {
          zoom: zoom - 4,
          duration: duration,
        },
        () => {
          view.current?.fit(extent, {
            padding: [30, 30, 30, 30],
            duration: duration * 2,
          });
        }
      );
    }
  };

  return (
    <div ref={mapContainer} style={{ width: "100%", height: "582px" }}></div>
  );
};

export default MapComponent;
