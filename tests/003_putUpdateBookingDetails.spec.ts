import{test,expect} from "@playwright/test";
import fs from "fs";
// create booking post
// booking id -->> get request the booking id 
// token creation by sending post request
// update booking id -- put  full update the booking
// update booking id -- patch request payload required=== Partial update the booking  
// delete booking id

// Utility function to read data json data from file.

function readJson(filePath:string){

     return JSON.parse(fs.readFileSync(filePath, "utf-8")) ;
}

const Base_URL= "https://restful-booker.herokuapp.com";

test("Create,get,Update,delete Booking details", async({request})=>{

  //Step1  Create a new booking  by post request 

  const requestPayLoadCreateBooking = readJson("data/post_request_body.json");

  const responseforCreateBooking= await request.post(`${Base_URL}/booking`,{data:requestPayLoadCreateBooking});

  console.log("=======createBookingResponseBody===========");
  const createBookingResponseBody = await responseforCreateBooking.json();
  console.log(createBookingResponseBody);


  console.log("=====bookingID========")
  const bookingID= createBookingResponseBody.bookingid; // extracting booking id from step 1
  console.log("Booking ID is:",bookingID);

  // step2 -- get request we need to send

  console.log("========getResponse==========");

  const getResponse= await request.get(`${Base_URL}/booking/${bookingID}`);
  const bookingDetails= await getResponse.json();
  console.log("Booking Details befor Update", bookingDetails);

  console.log("=========token=========");

  // step 3 - for update request we have to create the token for put, patch and delete request
  // Create token 

  const tokenData=     readJson("data/token_request_body.json");
   const tokenResponse = await request.post(`${Base_URL}/auth`, {data:tokenData});

   const tokenBody = await tokenResponse.json();
   const token = tokenBody.token; // Token generated 
   console.log("Token Generated:", token);

   // Step4 - Partial update Patch request 

   const partialDataRequestPayload= readJson("data/patch_request_body.json");

   const patchResponse = await request.patch(`${Base_URL}/booking/${bookingID}`,{

     headers:{

          "Content-Type": "application/json",
          "Cookie": `token=${token}`,
     }, data:partialDataRequestPayload
   })

   console.log("=====Patch Response Body======");

   const patchResponseBody = await patchResponse.json();
   console.log("Patch Response Body:", patchResponseBody);

      console.log("=====Patch Response Status======");

   console.log("Status for Patch:",patchResponse.status());
   console.log("Status text for Patch:",patchResponse.statusText())

   console.log("===== Validation for Patch request ========")

   expect(patchResponse.status()).toBe(200);
   expect(patchResponse.statusText()).toBe("OK");

   // step5 - Put request - Full update the resorce
const putDataRequestPayload= readJson("data/put_request_body.json");
const putResponse = await request.put(`${Base_URL}/booking/${bookingID}`, {

     headers:{
          "Content-Type": "application/json",
          "Cookie": `token=${token}`,
     }, data:putDataRequestPayload

     });

        console.log("=====PUT Response Body======");

        const putRequestBody = await putResponse.json();
        console.log("Full update Booking:",putRequestBody);

       console.log("=====PUT Response Status======");

       console.log(putResponse.status());
       console.log(putResponse.statusText());

       console.log("===== Validation for PUT request ========")

       expect(putResponse.status()).toBe(200);
       expect(putResponse.statusText()).toBe("OK");


// step6 Delete the Booking id created 
console.log("===== Delete Request====");

const deleteResponse= await request.delete(`${Base_URL}/booking/${bookingID}`,{

     headers:{
          "Content-Type": "application/json",
          "Cookie": `token=${token}`,
     }
})

// const deleteResponseBody= await deleteResponse.json();
// console.log(deleteResponseBody);

console.log(deleteResponse.status());
console.log(deleteResponse.statusText());

// Validations on Delete request

expect(deleteResponse.status()).toBe(201);
expect(deleteResponse.statusText()).toBe("Created");


})



