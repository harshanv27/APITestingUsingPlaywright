import{test,expect, request} from "@playwright/test";

// get booking details by path parameter

const Base_URL= "https://restful-booker.herokuapp.com";
// https://restful-booker.herokuapp.com/booking?firstname=jim&lastname=brown

test("Get Booking details by query parameter", async({request})=>{

    const firstname="Jim";
    const lastname="Brown";


    const response= await request.get(`${Base_URL}/booking`,
        {
        params:{

            firstname,
            lastname

        }
        
        });
    

    const responseBody= await response.json();
    console.log(responseBody);

    // validate response status 

console.log(response.status());
console.log(response.statusText());

expect(response.status()).toBe(200);
expect(response.statusText()).toBe("OK");


// [
//   { bookingid: 11 },   { bookingid: 57 },   { bookingid: 128 },
//   { bookingid: 151 },  { bookingid: 216 },  { bookingid: 304 },
//   { bookingid: 389 },  { bookingid: 477 },  { bookingid: 564 },
//   { bookingid: 650 },  { bookingid: 743 },  { bookingid: 832 },
//   { bookingid: 918 },  { bookingid: 958 },  { bookingid: 1006 },
// ]
// 200
// OK


// Validation Point 
// Verify booking id is a number and greater than zero 

 for(const item of responseBody){   // { bookingid: 151 }

    expect(item).toHaveProperty("bookingid");
    expect(typeof(item.bookingid)).toBe("number");
    expect(item.bookingid).toBeGreaterThan(0);
 }
})
