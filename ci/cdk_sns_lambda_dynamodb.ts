import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkSnsLambdaDynamodbStack } from './cdk_sns_lambda_dynamodb-stack';
import { Env } from './env';

const app = new cdk.App();
new CdkSnsLambdaDynamodbStack(app, Env.dev);
new CdkSnsLambdaDynamodbStack(app, Env.uat);
new CdkSnsLambdaDynamodbStack(app, Env.prod);