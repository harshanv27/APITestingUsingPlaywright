import{test, expect} from "@playwright/test"
import dotenv from "dotenv";
dotenv.config();
import { Buffer } from "node:buffer";
import { request } from "node:https";

test.describe('Authentication Tests', () => {

    test('No Auth Authentication', async({request})=> {

        const response= await request.get('https://jsonplaceholder.typicode.com/posts/1');
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");

        const responseBody= await response.json();
        console.log(responseBody);

        expect(responseBody).toHaveProperty("userId");
        expect(responseBody).toHaveProperty("title");
        expect(responseBody.id).toBe(1);
      
    });

     test('Basic Authentication', async({request})=> {
        // https://postman-echo.com/basic-auth
        //userName= postman
        // password= password

        const userName= process.env.Basic_Auth_Username;
        const password= process.env.Basic_Auth_Password;

        // it will convert the data to encoded format
        const base64Credentials= Buffer.from(`${userName}:${password}`).toString('base64');

        console.log(base64Credentials);
        const response= await request.get('https://postman-echo.com/basic-auth',{

            headers:{

                Authorization: `Basic ${base64Credentials}`
            }
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");

        const responseBody= await response.json();

        console.log(responseBody);

        console.log(responseBody.authenticated);
        expect(responseBody.authenticated).toBe(true);
      
    });

    test('API- KEY', async({request})=>{
// API KEY
// A unique key is sent with each request to identify the client. 
//  Tip: API keys are usually sent in headers (X-API-Key) or as query params
//  (?api_key=xxx) 

const apiKey = process.env.OPEN_WEATHER_API_KEY;

const response = await request.get('https://api.openweathermap.org/data/2.5/weather',{

    params:{

        q:'Delhi',
        appid:apiKey,
    }
})
console.log(response.status());
console.log(response.statusText());
expect(response.status()).toBe(401);
expect(response.statusText()).toBe('Unauthorized');

})

test('Bearer token -Authentication', async({request})=>{
// A token (usually JWT) is sent in the Authorization header as Bearer token. 

        const token = process.env.GitHub_Token;

        const response= await request.get('https://api.github.com/user/repos',
            {
            headers:{

                Authorization: `Bearer ${token}`
            }
        });

        // expect(response.statusText()).toBe("OK");
        const repositories= await response.json();
        console.log(repositories);
        console.log(response.status());
        expect(response.status()).toBe(401);
        console.log(response.statusText());
        expect(response.statusText()).toBe("Unauthorized");
        expect(repositories).toHaveProperty("message");

    })

})