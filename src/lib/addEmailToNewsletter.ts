const axios = require("axios");
const client = require("@sendgrid/client");

client.setApiKey(process.env.SENDGRID_API_KEY);

const contactListId = process.env.SENDGRID_CONTACT_LIST_ID;

export const addEmailToNewsletter = async (emailAdress: string) => {
  const data = {
    contacts: [
      {
        email: emailAdress,
      },
    ],
    list_ids: [contactListId],
  };

  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };

  try {
    client.request(request);
    console.log("Added user to Newsletter contact list");
  } catch (error) {
    console.log("Error adding user to Newsletter contact list");
    console.error(error);
    throw new Error("Error adding user to Newsletter contact list");
  }
};
