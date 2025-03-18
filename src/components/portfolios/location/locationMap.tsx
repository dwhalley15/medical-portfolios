/**
 * @file LocationMap component
 * @description A component that displays a Google Map with a marker at a specific location.
 */

"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type LocationMapProps = {
  title: string;
  address: string;
};

/**
 * This function returns a Google Map with a marker at a specific location.
 * @param {LocationMapProps} props - The component props.
 * @returns {JSX.Element} The location map component.
 */
export default function LocationMap({ title, address }: LocationMapProps) {
  const mapRef = useRef(null);

  /**
   * This effect initializes the Google Map with a marker at the specified address.
   */
  useEffect(() => {
    let mapInstance: google.maps.Map | null = null;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
    });

    /**
     * This function initializes the Google Map with a marker at the specified address.
     * @returns {Promise<void>} A promise that resolves when the map is initialized.
     */
    async function initMap() {
      const { Map } = (await loader.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      const { Geocoder } = (await loader.importLibrary(
        "geocoding"
      )) as google.maps.GeocodingLibrary;
      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      if (!address || address.trim() === "") {
        console.warn("Address is empty or invalid. Cannot load map.");
        return;
      }

      const geocoder = new Geocoder();

      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results && results[0] && mapRef.current) {
          mapInstance = new Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 15,
            mapId: "MEDICAL_PORTFOLIOS_MAP_ID",
          });
          const marker = new AdvancedMarkerElement({
            position: results[0].geometry.location,
            map: mapInstance,
            title: title || "Location",
            gmpClickable: true,
          });

          const infoWindow = new google.maps.InfoWindow();

          marker.addListener(
            "click",
            ({
              domEvent,
              latLng,
            }: {
              domEvent: google.maps.MapMouseEvent;
              latLng: google.maps.LatLng;
            }) => {
              infoWindow.close();
              infoWindow.setContent(`
                <div style="color: #333; font-size: 14px; font-weight: bold; padding: 8px;">
                ${title || "Location"}
                </div>
            `);
              infoWindow.open(marker.map, marker);
            }
          );
        } else {
          console.error("Geocoding failed: " + status);
        }
      });
    }

    initMap();

    return () => {
      if (mapInstance) {
        google.maps.event.clearInstanceListeners(mapInstance);
      }
    };
  }, [address]);

  return <div className="map-container" ref={mapRef}></div>;
}
