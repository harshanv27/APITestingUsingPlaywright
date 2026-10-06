// install the required package 
//npm install Ajv
//AJV is used for json schema verification
//AJV= Another json schema verification
// return the validator function 
// ajv is the class it conatins the method and properties
// if you need to access the class and method then 
// we need to create the object for ajv.

import{test,expect} from "@playwright/test";
import Ajv from "ajv";

const Base_URL = "https://mocktarget.apigee.net/json";

test("Schema validation for API", async({request})=>{

    // step 1 - Send the request and get the response

 const getResponse=   await request.get(`${Base_URL}`);
 const getResponseBody= await getResponse.json();
 console.log(getResponseBody);

 // step 2 define the schema

 const schema= {
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    }
  },
  "required": [
    "firstName",
    "lastName",
    "city",
    "state"
  ]
}
// step 3 validate the response against schema

 const ajv= new Ajv();
 const validate =ajv.compile(schema); // return a validator function.
 const isValidate = validate(getResponseBody);
 console.log(isValidate);
 expect(isValidate).toBeTruthy();
})
