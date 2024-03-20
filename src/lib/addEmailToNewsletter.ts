const client = require("@sendgrid/client");

client.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

const contactListId = process.env.NEXT_PUBLIC_SENDGRID_CONTACT_LIST_ID;

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

  await client.request(request)
};
