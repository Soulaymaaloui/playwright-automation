import { test, expect } from "@playwright/test";

const baseUrl = "https://api.restful-api.dev/objects";

// TEST 1: GET API
test("GET - Verify API response", async ({ request }) => {
  // 1. Record start time
  const startingTime = Date.now();

  // 2. Send GET request
  const response = await request.get(baseUrl);

  // 3. Calculate response time
  const responseTime = Date.now() - startingTime;

  // 4. Get response body and headers
  const responseBody = await response.json();
  const responseHeaders = response.headers();

  // 5. Display response information
  console.log("Status:", response.status());
  console.log("Body:", responseBody);
  console.log("Headers:", responseHeaders);
  console.log("Response time:", responseTime, "ms");

  // 6. Verify status code
  expect(response.status()).toBe(200);

  // 7. Verify response body
  expect(responseBody.length).toBeGreaterThan(0);
  expect(responseBody[0].id).toBe("1");

  // 8. Verify response headers
  expect(responseHeaders["content-type"]).toContain("application/json");

  // 9. Verify response time
  expect(responseTime).toBeLessThan(2000);
});

// TEST 2: POST API
test("POST - Create a new object", async ({ request }) => {
  const payload = {
    name: "Apple MacBook Pro 13",
    data: {
      year: 2021,
      price: 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
    },
  };

  // Send POST request
  const response = await request.post(baseUrl, {
    data: payload,
  });

  // Read response body
  const responseBody = await response.json();
    // Display results
  console.log("POST Status:", response.status());
  console.log("POST Body:", responseBody);

  // Verify response
  expect(response.status()).toBe(200);
  expect(responseBody.name).toBe(payload.name);
  expect(responseBody.data.price).toBe(payload.data.price);
  expect(responseBody.id).toBeTruthy();
});

// TEST 3 : Put API
test("PUT - Update an existing object", async ({ request }) => {
  const payload = {
    name: "Apple MacBook Pro20",
    data: {
      year: 2021,
      price: 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
    },
  };

  // ID of the object to update
  const objectId = "ff808181a09d98f701a1747d670a0a75";

  // Send PUT request
  const response = await request.put(`${baseUrl}/${objectId}`, {
    data: payload,
  });

  // Read response body
  const responseBody = await response.json();

  // Display results
  console.log("PUT Status:", response.status());
  console.log("PUT Body:", responseBody);

  // Verify response
  expect(response.status()).toBe(200);
  expect(responseBody.name).toBe(payload.name);
  expect(responseBody.data.price).toBe(payload.data.price);
  expect(responseBody.id).toBe(objectId);
});

// TEST 4 : Patch API
test("PATCH - Update an object", async ({ request }) => {
  const payload = {
    name: "Apple MacBook new Pro20",
  };

  // ID of the object to update
  const objectId = "ff808181a09d98f701a1748141900a7b";

  // Send PUT request
  const response = await request.patch(`${baseUrl}/${objectId}`, {
    data: payload,
  });

  // Read response body
  const responseBody = await response.json();

  // Display results
  console.log("PUT Status:", response.status());
  console.log("PUT Body:", responseBody);

  // Verify response
  expect(response.status()).toBe(200);
  expect(responseBody.name).toBe(payload.name);
  expect(responseBody.id).toBe(objectId);
});

 // TEST 5: DELETE API
test("DELETE - Delete an object", async ({ request }) => {
  // 1. Create an object specifically for this test
  const createResponse = await request.post(baseUrl, {
    data: {
      name: "Apple MacBook Pro 13",
      data: { test: true },
    },
  });

  expect(createResponse.status()).toBe(200);

  const createdObject = await createResponse.json();
  const objectId = createdObject.id;

  // 2. Delete the newly created object
  const response = await request.delete(`${baseUrl}/${objectId}`);

  console.log("DELETE Status:", response.status());

  const responseBody = await response.json();
  console.log("DELETE Body:", responseBody);

  // 3. Verify deletion
  expect(response.status()).toBe(200);
  expect(responseBody.message).toContain("has been deleted");
});
