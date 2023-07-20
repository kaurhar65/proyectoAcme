// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'http://localhost:44406',
  apiUrl: 'https://localhost:7270/api/'
};

export const apiControllers = {
  authentication : "Authentication/",
  country: "Country/",
  city: "City/",
  office: "Office/",
  room: "Room/",
  reservation: "Reservation/",
  user: "User/"
}

export const apiUrls = {
  authentication: {
    login: "Login",
    register: "Register",
    registerAdmin: "RegisterAdmin"
  },
  country: {
    getAllCountries: "GetAllCountries",
    getCountryById: "GetCountryById",
    createCountry: "CreateCountry",
    updateCountry: "UpdateCountry",
    deleteCountry: "DeleteCountry"
  },
  city: {
    getAllCities: "GetAllCities",
    getCityById: "GetCityById",
    getCitiesByCountryId: "GetCitiesByCountryId",
    createCity: "CreateCity",
    updateCity: "UpdateCity",
    deleteCity: "DeleteCity"
  },
  office: {
    getAllOffices: "GetAllOffices",
    getOfficeById: "GetOfficeById",
    getOfficesByCountryId: "GetOfficesByCountryId",
    getOfficesByCityId: "GetOfficesByCityId",
    createOffice: "CreateOffice",
    updateOffice: "UpdateOffice",
    deleteOffice: "DeleteOffice"
  },
  room: {
    getAllRooms: "GetAllRooms",
    getRoomById: "GetRoomById",
    getRoomsByCountryId: "GetRoomsByCountryId",
    getRoomsByCityId: "GetRoomsByCityId",
    getRoomsByOfficeId: "GetRoomsByOfficeId",
    createRoom: "CreateRoom",
    updateRoom: "UpdateRoom",
    deleteRoom: "DeleteRoom"
  },
  reservation: {
    getAllReservations: "GetAllReservations",
    getReservationById: "GetReservationById",
    getReservationsByCountryId: "GetReservationsByCountryId",
    getReservationsByCityId: "GetReservationsByCityId",
    getReservationsByOfficeId: "GetReservationsByOfficeId",
    getReservationsByRoomId: "GetReservationsByRoomId",
    createReservation: "CreateReservation",
    updateReservation: "UpdateReservation",
    deleteReservation: "DeleteReservation"
  },
  user: {
    getAllUsers: "GetAllUsers",
    getUserById: "GetUserById",
    getUserByEmail: "GetUserByEmail",
    updateUser: "UpdateUser",
    updatePassword: "UpdatePassword"
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
