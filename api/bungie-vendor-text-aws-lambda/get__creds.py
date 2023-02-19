import boto3
import json
from botocore.exceptions import ClientError
from dotenv import dotenv_values
config = dotenv_values(".env")


def get_secret():
    secret_name = config.get("SECRET_NAME")
    region_name = config.get("REGION_NAME")

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
        "API_KEY": results[config.get("API_KEY_VALUE")],
        "ACCESS_TOKEN": results[config.get("ACCESS_TOKEN_VALUE")],
        "REFRESH_TOKEN": results[config.get("REFRESH_TOKEN_VALUE")],
        "CLIENT_ID": results[config.get("CLIENT_ID_VALUE")],
        "CLIENT_SECRET": results[config.get("CLIENT_SECRET_VALUE")],
        "ACCOUNT_SID": results[config.get("ACCOUNT_SID_VALUE")],
        "AUTH_TOKEN": results[config.get("AUTH_TOKEN_VALUE")],
        "BUNGIE_ACCOUNT_NAME": results[config.get("BUNGIE_ACCOUNT_NAME_VALUE")],
        "BUNGIE_ACCOUNT_CODE": results[config.get("BUNGIE_ACCOUNT_CODE_VALUE")],
        "SENDING_NUMBER": results[config.get("SENDING_NUMBER_VALUE")],
        "RECEIVING_NUMBERS": results[config.get("RECEIVING_NUMBERS_VALUE")]
    }
    return data


get_secret()
