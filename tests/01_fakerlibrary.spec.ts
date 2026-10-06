// install faker library 
// npm install @faker-js/faker install this 

import { faker, Faker } from "@faker-js/faker";
import{test,expect} from "@playwright/test";

test("Faker Library", async({page})=>{
 
console.log(faker.person.firstName());
console.log(faker.person.lastName());
console.log(faker.internet.email())
console.log(faker.internet.password());

})

  