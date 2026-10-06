// install the required package 
//npm install Ajv
//AJV is used for json schema verification
//AJV= Another json schema verification
// return the validator function 
// ajv is the class it conatins the method and properties

import{test,expect} from "@playwright/test";
import Ajv from "ajv";

const Base_URL = "https://jsonplaceholder.typicode.com";

test("Schema validation for API", async({request})=>{

    // step 1 - send the request and get the response

    const getResponse= await request.get(`${Base_URL}/posts/1`);

    const getResponseBody= await getResponse.json();

    console.log(getResponseBody);

 // step 2 define the schema

 const schema= {
  "type": "object",
  "properties": {
    "userId": {
      "type": "integer"
    },
    "id": {
      "type": "integer"
    },
    "title": {
      "type": "string"
    },
    "body": {
      "type": "string"
    }
  },
  "required": [
    "userId",
    "id",
    "title",
    "body"
  ]
}
 // step 3 validate the schema

 const ajv = new Ajv();
 const validate = ajv.compile(schema);

 const isValid= validate(getResponseBody);
 console.log(isValid);
 expect(isValid).toBeTruthy();

})