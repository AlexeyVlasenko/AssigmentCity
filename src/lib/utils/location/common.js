/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
const R = 6371;

function toRad(val) {
  return val * Math.PI / 180;
}

export const getDistance = (from, to) => {
  let [lat1, lon1] = from;
  let [lat2, lon2] = to;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const {
    sin, cos, atan2, sqrt,
  } = Math;
  const a = (sin(dLat / 2) * sin(dLat / 2))
    + (sin(dLon / 2) * sin(dLon / 2) * cos(lat1) * cos(lat2));
  const c = 2 * atan2(sqrt(a), sqrt(1 - a));
  const d = R * c;

  return d;
};
