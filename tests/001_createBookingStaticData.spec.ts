// create Booking
// Post request 
// Request body - static data 

import{test,expect} from "@playwright/test";

const Base_URL= "https://restful-booker.herokuapp.com";

test("Create Booking with static data", async({request})=>{

    // static payload

  const requestPayload = {

    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {    // nested object
        "checkin" : "2026-10-01",
        "checkout" : "2026-10-10"
    },
    "additionalneeds" : "Breakfast"
  }

  // Send the post request
 const response=  await request.post(`${Base_URL}/booking`,{data:requestPayload});
 // /booking is the end point 

 const responseBody= await response.json(); // it will give the reponse in json format.

 console.log(responseBody);

 console.log(response.status()); // status code print 

 expect(response.status()).toBe(200);

console.log(response.statusText()); // status message will print Ok, Created etc
expect(response.statusText()).toBe("OK");

// Validating the response body 

expect(responseBody).toHaveProperty("bookingid");
expect(responseBody).toHaveProperty("booking");
expect(responseBody.bookingid).toEqual(expect.any(Number));

// Validate Booking fields

console.log("==================");

const booking = await responseBody.booking;
console.log(booking);
expect(booking).toMatchObject(requestPayload);

expect(booking.bookingdates).toMatchObject({
        "checkin" : "2026-10-01",
        "checkout" : "2026-10-10"
    })

    expect(booking.bookingdates).toMatchObject(requestPayload.bookingdates);

    const checkInBookingDates= booking.bookingdates.checkin
    console.log(checkInBookingDates);

    const firstname= booking.firstname;
    console.log(firstname);

    const lastname= booking.lastname;
    console.log(lastname);

})