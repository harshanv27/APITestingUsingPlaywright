import{test, expect} from "@playwright/test";

const Base_URL = "https://jsonplaceholder.typicode.com";
const id=1;


test('has titile get post put patch delete', async({request})=>{


    const response= await request.get(`${Base_URL}/posts/${id}`);

    console.log(response.status());
    console.log(response.statusText());

    const responseBody = await response.json();

    console.log(responseBody);

    const title=  responseBody.title;
    console.log(title);

    expect(responseBody).toHaveProperty("userId");




})