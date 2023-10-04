const axios = require('axios');
const client = require('@sendgrid/client');

client.setApiKey(process.env.SENDGRID_API_KEY);

const contactListId = "e4e454a1-ddce-43d0-be03-82c903737169";


export const addEmailToNewsletter = async (emailAdress) => {
  const data = {
    "contacts": [
      {
        "email": emailAdress
      }
    ],
    "list_ids": [ 
      contactListId
    ],
  };
  
  const request = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: data
  }
  
  client.request(request)
    .then(([response, body]) => {
      console.log("Added user to Newsletter contact list");
    })
    .catch(error => {
      console.error(error);
    });
}
