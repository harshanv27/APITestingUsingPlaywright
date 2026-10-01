import{test,expect, request} from "@playwright/test";

const Base_URL = "https://jsonplaceholder.typicode.com";



test("All data should fetch by get request", async({request})=>{

 const getResponse=   await request.get(`${Base_URL}/posts`);

 const getResponseBody= await getResponse.json();

 console.log(getResponseBody);

 console.log(getResponse.status());
 console.log(getResponse.statusText());

 expect(getResponse.status()).toBe(200);
 expect(getResponse.statusText()).toBe("OK");

 console.log("=====");

 for(const item of getResponseBody){

    expect(item).toHaveProperty("userId");
    expect(typeof item.body).toBe("string");
 }

  console.log("=====");


})