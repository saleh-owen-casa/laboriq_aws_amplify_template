import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { subscriberPostFunction, subscriberGetFunction } from './api/resource';

defineBackend({
  auth,
  data,
  subscriberPostFunction,
  subscriberGetFunction,
});
