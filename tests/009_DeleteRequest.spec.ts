import{test,expect, request} from "@playwright/test";

const Base_URL = "https://jsonplaceholder.typicode.com";

const id=1;

test("Delete request", async({request})=>{

    const deleteResponse= await request.delete(`${Base_URL}/posts/${id}`);

    console.log(deleteResponse.status());
    console.log(deleteResponse.statusText());

    expect(deleteResponse.status()).toBe(200);
    expect(deleteResponse.statusText()).toBe("OK");

    console.log(deleteResponse);
    console.log(await deleteResponse.json());
})