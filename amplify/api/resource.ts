import { defineFunction } from '@aws-amplify/backend';

export const subscriberPostFunction = defineFunction({
  name: 'subscriber-post',
  entry: './subscriber-post.ts',
  environment: {
    CONTACTS_TABLE: '${aws-dynamodb-table-Contact}'
  }
});

export const subscriberGetFunction = defineFunction({
  name: 'subscriber-get',
  entry: './subscriber-get.ts',
  environment: {
    CONTACTS_TABLE: '${aws-dynamodb-table-Contact}'
  }
});
