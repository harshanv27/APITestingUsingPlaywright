import{test, expect} from "@playwright/test";
import fs from "fs";
const Base_URL = "https://jsonplaceholder.typicode.com";

const pathFile= "data/post_request.json";
const requestPayload= JSON.parse(fs.readFileSync(pathFile, "utf-8"));

test("Post Request", async({request})=>{

    const postResponse = await request.post(`${Base_URL}/posts`,{
         headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },data:requestPayload});
    const postResponseBody = await postResponse.json();
    console.log(postResponseBody);
    console.log(postResponse.status());
    console.log(postResponse.statusText());

    expect(postResponse.status()).toBe(201);
    expect(postResponse.statusText()).toBe("Created");

    const title = await postResponseBody.title;
    console.log(title);

    console.log(await postResponseBody.body);
    
});
