import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { WKT } from "ol/format";
import Feature from "ol/Feature"; // Import Feature
import { MapComponentProps } from "./interface";

const MapComponent = ({ locationData }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      if (locationData) {
        if (!mapInstance.current) {
          // Create the map only once when locationData is provided
          const map = new Map({
            target: mapRef.current,
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
            view: new View({
              center: [0, 0],
              zoom: 2,
            }),
          });
          mapInstance.current = map;
        }

        

        // Parse the WKT location data
        const format = new WKT();
        const geometry = format.readGeometry(locationData);

        if (mapInstance.current) {
          // Set the view to center on the parsed geometry
        mapInstance.current.getView().fit(geometry.getExtent(), {
          size: mapInstance.current.getSize(),
          padding: [50, 50, 50, 50], // Adjust padding as needed
        });

          // Create a new vector source and layer
          const vectorSource = new VectorSource();
          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });

          // Add the parsed geometry as a feature to the vector source
          const feature = new Feature({
            geometry: geometry,
          });
          vectorSource.addFeature(feature);

          // Add the vector layer to the map
          mapInstance.current.addLayer(vectorLayer);
        }
      } else {
        // If locationData is null, clear the map
        if (mapInstance.current) {
          mapInstance.current.setTarget(null);
          mapInstance.current = null;
        }
      }
    }
  }, [locationData]);

  return <div ref={mapRef} style={{ width: "100%", height: "600px" }}></div>;
};

export default MapComponent;
