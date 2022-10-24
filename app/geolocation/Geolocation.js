import fetch from 'node-fetch';

export default class Geolocation {
    constructor() {}

    // runs a weather report based on device lattitude and longitude.
    async runGeoLocation() {
        const url = 'http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=CA&locality=LosAngeles&postalCode=93550&addressLine=37349%2026th%20St E.&key=AvNceYqSn4VbixrSYBcnANtmOg48NeAlyy_rG7cSXWwkjxX5KuhEgaYT0baonAY4';

        let coordinates = await fetch(url)
            .then(response => response.json())
            .then((json) =>  json)
            .catch(error => console.error('error:' + error));

        const coordinatesData = coordinates.resourceSets[0].resources[0];

        console.log('\n--- CHECKING GPS GEOCOORDINATES ---');
        const myAddress = {
            address: coordinatesData.address.formattedAddress,
            locality: coordinatesData.address.locality,
            postalCode: coordinatesData.address.postalCode
        }
        console.table(myAddress);


        return coordinatesData.geocodePoints[0].coordinates;
    }
}