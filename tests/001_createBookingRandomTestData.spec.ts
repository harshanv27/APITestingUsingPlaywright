import { faker } from '@faker-js/faker';
import{test,expect} from "@playwright/test";
import {DateTime} from 'luxon';
// create Booking
// Post request 
// Request body -Faker library

const Base_URL= "https://restful-booker.herokuapp.com";

test("Create Booking with Random data", async({request})=>{

    const firstname= faker.person.firstName();
    const lastname= faker.person.lastName();
    const totalprice= faker.number.int({min:100, max:500});
    const depositpaid= faker.datatype.boolean();
    const checkin= DateTime.now().toFormat("yyyy-MM-dd");
    const checkout=DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");
    const additionalneeds='super bowls';

    const requestPayload=
    {

    "firstname" : firstname,
    "lastname" : lastname,
    "totalprice" : totalprice,
    "depositpaid" : depositpaid,
    "bookingdates" : {    
        "checkin" : checkin,
        "checkout" : checkout,
    },
    "additionalneeds" : additionalneeds
  }

    // json  payload

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

    const firstName= booking.firstname;
    console.log(firstname);

    console.log("==================");

    const lastName= booking.lastname;
    console.log(lastname);

})
