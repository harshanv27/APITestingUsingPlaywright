import {test,expect, request} from "@playwright/test";
import { faker, Faker } from "@faker-js/faker";

const Base_URL = "https://jsonplaceholder.typicode.com";

test("Post request Random data creation", async({request})=>{

    const title= faker.person.jobArea();
    const body= faker.food.dish();
    const userId=faker.number.int({min:1, max:10});

    const requestPayLoad = {
        
    "title": title,
    "body": body,
    "userId": userId
    }

    const postResponse= await request.post(`${Base_URL}/posts`,{
         headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },data:requestPayLoad});

const postResponseBody = await postResponse.json();

  console.log(postResponseBody);
  console.log(postResponse.status());
  console.log(postResponse.statusText())

  expect(postResponse.status()).toBe(201);
  expect(postResponse.statusText()).toBe("Created");

  const bodyText= await postResponseBody.body;
  console.log(bodyText);
  expect(bodyText).toBe(requestPayLoad.body);

})