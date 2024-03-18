import { APIRequestContext, test, expect } from "@playwright/test";
import exp from "constants";

const APPID = "969437dd660b6c2251c86d58ae2458c5";

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: "https://api.openweathermap.org",
  });
});

test.afterAll(async ({}) => {
  await apiContext.dispose();
});

test("Opdracht 1", async () => {
  const response = await apiContext.get("/data/2.5/weather?q=Utrecht&appid=");

  expect(response.status()).toBe(401);

  const body = await response.text();
  expect(body).toContain("Invalid API key");
});

test("Opdracht 2", async () => {
  const response = await apiContext.get(
    `/data/2.5/weather?q=Utrecht&appid=${APPID}`
  );

  expect(response.status()).toBe(200);

  const body = await response.text();
  console.log(body);
});

test("Opdracht 3", async () => {
  const response = await apiContext.get(
    `/data/2.5/weather?q=Den Haag&appid=${APPID}`
  );

  expect(response.status()).toBe(200);

  const body = await response.text();

  console.log(body);
});

const cities = [
  { name: "Amsterdam", id: 2759794 },
  { name: "Rotterdam", id: 2747891 },
  { name: "The Hague", id: 2747373 },
  { name: "Groningen", id: 2755251 },
];

for (const city of cities) {
  test(`Opdracht 4: ${city.name}`, async () => {
    const response = await apiContext.get(
      `/data/2.5/weather?id=${city.id}&appid=${APPID}`
    );

    expect(response.status()).toBe(200);
    

    const body = await response.text();
    expect(body).toContain(city.name);
    console.log(body);
  });
}
