import{test,expect} from "@playwright/test";

const Base_URL = "https://jsonplaceholder.typicode.com";

const id=1;


test("Get request filter", async({request})=>{

    const getResponse= await request.get(`${Base_URL}/posts?userid=${id}`);

    const getResponseBody= await getResponse.json();

    console.log(getResponse.status());
    console.log(getResponse.statusText());

    console.log(getResponse);
    console.log(await getResponse.json());

    for(const item of getResponseBody){

        expect(item).toHaveProperty("title");
        console.log(item.title);
    }
})