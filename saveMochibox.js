import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';


export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  console.log('data: ', data, 'event: ', event, 'context: ', context);

  
  
  const params = {
    TableName: 'mochiboxes',
    Item: {
      restaurantId: event.requestContext.authorizer.claims.sub,
      boxId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime(),
    },
  };

  console.log('params: ', params);
  try {
    const result = await dynamoDbLib.call('put', params);
    console.log('result: ', result);
    callback(null, success(params.Item));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
}