import dynamic from "next/dynamic";

// Create a dynamic import for the Map component with ssr disabled
const Map = dynamic(() => import("./map-component"), {
  ssr: false, // This will disable server-side rendering for this component
});

// Move all the Leaflet-related code to MapComponent.tsx
export default Map;
