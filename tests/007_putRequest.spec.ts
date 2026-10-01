import{test,expect} from "@playwright/test";
import fs from "fs";


const Base_URL = "https://jsonplaceholder.typicode.com";

const id=1;

const filePath = "data/put_request.json";
const requestPayLoad= JSON.parse(fs.readFileSync(filePath,"utf-8"));

test("Put request data creation", async({request})=>{


    const postResponse= await request.post(`${Base_URL}/posts`,{
         headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },data:requestPayLoad});

const postResponseBody = await postResponse.json();

  console.log(postResponseBody);
  console.log(postResponse.status());
  console.log(postResponse.statusText())

  const bodyText= await postResponseBody.body;
  console.log(bodyText);
  expect(bodyText).toBe(requestPayLoad.body);

})