import{test,expect, request} from "@playwright/test";
import fs from "fs";

const Base_URL = "https://jsonplaceholder.typicode.com";
const filePath= "data/patch_request.json";
const patchRequestPayload= JSON.parse(fs.readFileSync(filePath,"utf-8"));
const id=1;

test("Patch Request", async({request})=>{

const patchResponse = await request.patch(`${Base_URL}/posts/${id}`,{data:patchRequestPayload});

const patchResponseBody= await patchResponse.json();

console.log(patchResponseBody);

console.log(patchResponse.status());
console.log(patchResponse.statusText());

expect(patchResponse.status()).toBe(200);
expect(patchResponse.statusText()).toBe("OK");

})
