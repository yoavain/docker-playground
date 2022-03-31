FROM amazon/aws-cli

WORKDIR /usr/app

ENV AWS_ACCESS_KEY_ID="local"
ENV AWS_SECRET_ACCESS_KEY="local"

# Create tables
RUN ["aws", "dynamodb", "create-table", "--table-name", "visits", "--attribute-definitions", "AttributeName=count,AttributeType=N", "--key-schema", "AttributeName=count,KeyType=HASH", "--region", "us-east-1", "--endpoint-url", "http://dynamodb-local:8000"]
