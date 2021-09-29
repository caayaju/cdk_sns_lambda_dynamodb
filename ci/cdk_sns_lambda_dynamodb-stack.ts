import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

import { Topic } from "@aws-cdk/aws-sns";
import { SnsEventSource, SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { capitalizeEnv, Env } from './env';

export class CdkSnsLambdaDynamodbStack extends cdk.Stack {
  private env: Env;

  constructor(scope: cdk.Construct, env: Env) {
    super(scope, `${capitalizeEnv(env)}TestStack`, {
      env: {
        account: accountIdForEnv(env),
        region: "ap-southeast-1",
      },
    });

    const sampleTopic = new Topic(this, "SampleTopicID", {
      topicName : this.mkName("sampleTopic")
    });

    const sampleDynamoDB = new dynamodb.Table(this, "SampleDyanmoDB", {
      tableName: this.mkName("sampleDynamoDB"),
      partitionKey: { name: "partitionkey", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sortkey", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: env === Env.prod,
    });

    const sampleLambda = new lambda.Function(this,  "SampleLambdaID", {
      functionName: this.mkName("sampleLambda"),
      runtime: lambda.Runtime.PYTHON_3_6,
      handler: "lambda_function",
      code: lambda.Code.fromAsset("./src/handlers/"),
      environment: {
        ENVSAMPLE: 'test1234567890',
        TABLE_NAME: sampleDynamoDB.tableName,
        TABLE_ARN: sampleDynamoDB.tableArn,
      }
    });
    sampleLambda.addEventSource(new SnsEventSource(sampleTopic, {}));


  }
  private mkName(suffix: string): string {
    return `${this.env}-CdkSnsLambdaDynamodbStack-${suffix}`;
  }
}

function accountIdForEnv(env: Env): string {
  if (env === Env.prod) {
    return "865894116526";
  } else {
    return "865894116526";
  }
}