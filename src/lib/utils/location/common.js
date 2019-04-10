const R = 6371;

export const getDistance = (from, to) => {
  let [lat1, lon1] = from;
  let [lat2, lon2] = to;

  let dLat = toRad(lat2 - lat1);
  let dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const { sin, cos, atan2, sqrt } = Math;
  let a = (sin(dLat / 2) * sin(dLat / 2)) + (sin(dLon / 2) * sin(dLon / 2) * cos(lat1) * cos(lat2));
  let c = 2 * atan2(sqrt(a), sqrt(1 - a));
  let d = R * c;
  return d;
}

function toRad(val) {
  return val * Math.PI / 180;
}