//This file retrieves and aggregates data from the G sheet
//and stores it in the PostgreSQL server

import { PrismaClient } from "@prisma/client";

const orm = new PrismaClient()

const months = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
}

const fs = require('fs').promises;
const path = require('path');
const process1 = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process1.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process1.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: any) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Stores the data from the spreadsheet to the DB
 * @see https://docs.google.com/spreadsheets/d/1byShULmKZCmGqfLSUwh1RWWcEUPgZq3FRwYHJpV1ZXo/edit#gid=0
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function CollectData(auth: any) {
  const sheets = google.sheets({version: 'v4', auth});
  const orders = await sheets.spreadsheets.values.get({
    spreadsheetId: '1byShULmKZCmGqfLSUwh1RWWcEUPgZq3FRwYHJpV1ZXo',
    range: 'Orders!A2:D',
  });
  const recipes = await sheets.spreadsheets.values.get({
    spreadsheetId: '1byShULmKZCmGqfLSUwh1RWWcEUPgZq3FRwYHJpV1ZXo',
    range: 'Recipe!A2:E',
  }); 
  const ingredientCosts = await sheets.spreadsheets.values.get({
    spreadsheetId: '1byShULmKZCmGqfLSUwh1RWWcEUPgZq3FRwYHJpV1ZXo',
    range: 'Ingredient costs!A2:C',
  });
  const orderRows = orders.data.values;
  const recipesRows = recipes.data.values;
  const ingredientRows = ingredientCosts.data.values;
  const [savedOrders, savedRecipes, savedIngredients, savedPizza] = await Promise.all([
    orm.orders.findMany(),
    orm.recipe.findMany(),
    orm.ingredientCosts.findMany(),
    orm.price.findMany(),
  ])
  if(savedOrders.length !== 365){
    await orm.orders.deleteMany()
    orderRows.forEach(async(row: any) => {
      const date = new Date(row[0]);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const formatDate = `${year}-${month}-${day}`
      await orm.orders.create({ data: {
        date: new Date(formatDate),
        peperoni: Number(row[1]),
        branco: Number(row[2]),
        alldressed: Number(row[3]),
      }})
    });
  }
  if(savedRecipes.length !== 5){
    await orm.recipe.deleteMany()
    recipesRows.forEach(async(row: any) => {
      await orm.recipe.create({ data: {
        name: row[0],
        peperoni: Number(row[1]),
        branco: Number(row[2]),
        alldressed: Number(row[3]),
        unit: row[4]
      }})
    });
  }
  if(savedIngredients.length !== 5){
    await orm.ingredientCosts.deleteMany()
    ingredientRows.forEach(async(row: any) => {
      await orm.ingredientCosts.create({ data: {
        name: row[0],
        cost: row[1],
        unit: row[2]
      }})
    });
  }
  if(savedPizza.length !== 3){
      await orm.price.deleteMany()
      await orm.price.create({ data: {
        name: "peperoni",
        price: 19,
      }})
      await orm.price.create({ data: {
        name: "branco",
        price: 15,
      }})
      await orm.price.create({ data: {
        name: "all dressed",
        price: 21,
      }})
  }
  const [a, b,c, da] = await Promise.all([
    orm.orders.findMany(),
    orm.recipe.findMany(),
    orm.ingredientCosts.findMany(),
    orm.price.findMany(),
  ])
  console.log(a.length,b.length,c.length,da.length)
  console.log("Data collected correctly.")
}

authorize().then(CollectData).catch(console.error);