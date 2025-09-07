import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Contact: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      dateOfBirth: a.string().required(),
      emailAddress: a.string().required(),
      phoneNumber: a.string(),
      homeAddress: a.string(),
      favoriteColor: a.string()
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});