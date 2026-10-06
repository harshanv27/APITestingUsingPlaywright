import{test,expect} from "@playwright/test";
import fs from "fs";


const Base_URL = "https://jsonplaceholder.typicode.com";

const id=1;

const filePath = "data/put_request.json";
const requestPayLoad= JSON.parse(fs.readFileSync(filePath,"utf-8"));

test("Put request data creation", async({request})=>{


    const putResponse= await request.post(`${Base_URL}/posts`,{
         headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },data:requestPayLoad});

const putResponseBody = await putResponse.json();

  console.log(putResponseBody);
  console.log(putResponse.status());
  console.log(putResponse.statusText())

  const bodyText= await putResponseBody.body;
  console.log(bodyText);
  expect(bodyText).toBe(requestPayLoad.body);

})