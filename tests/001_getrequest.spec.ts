import{test,expect, request} from "@playwright/test";

const Base_URL = "https://jsonplaceholder.typicode.com";

const id=1;

test("get request", async({request})=>{

 const getResponse=   await request.get(`${Base_URL}/posts/${id}`);

 const getResponseBody= await getResponse.json();

 console.log(getResponseBody);

 console.log(getResponse.status());
 console.log(getResponse.statusText());

 expect(getResponse.status()).toBe(200);
 expect(getResponse.statusText()).toBe("OK");

 console.log("=====");

 expect(getResponseBody).toHaveProperty("userId");

 console.log("=====");

 const title = await getResponseBody.title;
 console.log(title);

})