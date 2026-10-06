// Create Booking
// Post request 
// Request body -Json Data

import{test,expect} from "@playwright/test";
import fs from "fs";



const Base_URL= "https://restful-booker.herokuapp.com";

test("Create Booking with Json data", async({request})=>{

    // json  payload

    const jsonFile= "data/post_request_body.json";
    const requestPayload= JSON.parse(fs.readFileSync(jsonFile,"utf-8"));
    
   // need to read the json data 

  // Send the post request
  
 const response=  await request.post(`${Base_URL}/booking`,{data:requestPayload});
 // /booking is the end point 

 const responseBody= await response.json(); // it will give the reponse in json format.

 console.log(responseBody);

 console.log("|||||||||||||||||||||||||")

 console.log(response.status()); // status code print // 200 

 expect(response.status()).toBe(200); // validation 

console.log(response.statusText()); // status message will print Ok, Created etc /// output OK;
expect(response.statusText()).toBe("OK"); // validation

// Validating the response body 

expect(responseBody).toHaveProperty("bookingid");
expect(responseBody).toHaveProperty("booking");
expect(responseBody.bookingid).toEqual(expect.any(Number));
//expect(responseBody).toHaveProperty("depositpaid");
//expect(responseBody).toHaveProperty("bookingdates");

// Validate Booking fields

console.log("==================");

const booking = await responseBody.booking;
console.log(booking);

console.log("==================");
expect(booking).toMatchObject({

    firstname :requestPayload.firstname,
    lastname : requestPayload.lastname,
    totalprice : requestPayload.totalprice,
    depositpaid : requestPayload.depositpaid ,
    bookingdates : requestPayload.bookingdates,
    additionalneeds : requestPayload.additionalneeds
  });

 
expect(booking.bookingdates).toMatchObject({
        "checkin" : requestPayload.bookingdates.checkin,
        "checkout" : requestPayload.bookingdates.checkout
    })

    expect(booking.bookingdates).toMatchObject(requestPayload.bookingdates);

    const checkInBookingDates= booking.bookingdates.checkin
    console.log(checkInBookingDates);

    console.log("==================");

    const firstname= booking.firstname;
    console.log(firstname);

    console.log("==================");

    const lastname= booking.lastname;
    console.log(lastname);

})