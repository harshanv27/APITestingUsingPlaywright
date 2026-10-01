import{test,expect, request} from "@playwright/test";

// get booking details by path parameter

const Base_URL= "https://restful-booker.herokuapp.com";

test("Get Booking details by path parameter", async({request})=>{

    const bookingId=2012;

    const response= await request.get(`${Base_URL}/booking/${bookingId}`);

    const responseBody= await response.json();
    console.log(responseBody);

    // validate response status 

console.log(response.status());
console.log(response.statusText());

// validation status 

expect(response.status()).toBe(200);
expect(response.statusText()).toBe("OK");


// Validation property 
expect(responseBody).toHaveProperty("firstname");
expect(responseBody).toHaveProperty("lastname");
expect(responseBody).toHaveProperty("totalprice");

const firstName= responseBody.firstname;
console.log(firstName);
console.log(responseBody.totalprice);


})
