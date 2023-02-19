import boto3
import json
from botocore.exceptions import ClientError


def get_secret():
    secret_name = "dev/ada/auth"
    region_name = "us-east-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        raise e
    secret = get_secret_value_response['SecretString']
    results = json.loads(secret)
    data = {
        "API_KEY": results["API_KEY"],
        "ACCESS_TOKEN": results["ACCESS_TOKEN"],
        "REFRESH_TOKEN": results["REFRESH_TOKEN"],
        "CLIENT_ID": results["CLIENT_ID"],
        "CLIENT_SECRET": results["CLIENT_SECRET"],
        "ACCOUNT_SID": results["ACCOUNT_SID"],
        "AUTH_TOKEN": results["AUTH_TOKEN"],
        "BUNGIE_ACCOUNT_NAME": results["BUNGIE_ACCOUNT_NAME"],
        "BUNGIE_ACCOUNT_CODE": results["BUNGIE_ACCOUNT_CODE"],
        "SENDING_NUMBER": results["SENDING_NUMBER"],
        "RECEIVING_NUMBERS": results["RECEIVING_NUMBERS"]
    }
    return data


get_secret()
