// const axios = require("axios");

// const HttpError = require("../models/http-error");

// const API_KEY = "AIzaSyAp_1Zhqmnz9Xz933SjpzVW1Duxh6Byhq0";

// async function getCoordsForAddress(address) {
//   // return {
//   //   lat: 40.7484474,
//   //   lng: -73.9871516
//   // };
//   const response = await axios.get(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       address
//     )}&key=${API_KEY}`
//   );

//   const data = response.data;

//   if (!data || data.status === "ZERO_RESULTS") {
//     const error = new HttpError(
//       "Could not find location for the specified address.",
//       422
//     );
//     throw error;
//   }

//   const coordinates = data.results[0].geometry.location;

//   return coordinates;
// }

// module.exports = getCoordsForAddress;

const axios = require("axios");
const HttpError = require("../models/http-error");

const getCoordsForAddress = async (address) => {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(
      address
    )}&format=json&limit=1`
  );
  const data = response.data;

  if (!data) {
    const error = new HttpError(
      "Could not find location for this address",
      422
    );
    throw error;
  }

  const coordiantes = {
    lat: data[0].lat,
    lng: data[0].lon,
  };

  return coordiantes;
};

module.exports = getCoordsForAddress;
