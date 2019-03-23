function formatLocation(longitude, latitude) {
  longitude = Number(longitude).toFixed(6)
  latitude = Number(latitude).toFixed(6)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

export default formatLocation
