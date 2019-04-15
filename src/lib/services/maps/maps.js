const GOOGLE_MAPS_URL = 'https://www.google.com/maps/dir/';
const APPLE_MAPS_URL = 'http://maps.apple.com/';

export const composeGoogleMapsURL = (coords) => {
  const [lat, lon] = coords;

  return `${GOOGLE_MAPS_URL}?api=1&destination=${lat},${lon}`;
};

export const composeAppleMapsURL = (coords) => {
  const [lat, lon] = coords;

  return `${APPLE_MAPS_URL}?daddr=${lat},${lon}&dirflg=d&t=h`;
};
