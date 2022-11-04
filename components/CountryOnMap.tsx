import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const markerIcon = icon({
  iconUrl: "/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

interface CountryMapProps {
  latitude: number;
  longitude: number;
  countryName?: string;
}

const CountryOnMap: React.FunctionComponent<CountryMapProps> = ({
  latitude,
  longitude,
  countryName,
}) => {
  return latitude != undefined && longitude != undefined ? (
    <Paper sx={{ p: { md: 1 } }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={5}
        style={{ height: 500 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={markerIcon} position={[latitude, longitude]}>
          {countryName && (
            <Popup>
              <Typography align="center">{countryName}</Typography>
            </Popup>
          )}
        </Marker>
      </MapContainer>
    </Paper>
  ) : null;
};

export default CountryOnMap;
