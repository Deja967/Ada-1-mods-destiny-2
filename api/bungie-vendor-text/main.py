import requests as r
from dotenv import load_dotenv
from twilio.rest import Client
import os
import json
from requests.auth import HTTPBasicAuth

load_dotenv()
api_key = os.getenv("API_KEY")
account_name = os.getenv("BUNGIE_ACCOUNT_NAME")
account_code = os.getenv("BUNGIE_ACCOUNT_CODE")
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
account_sid = os.getenv("ACCOUNT_SID")
auth_token = os.getenv("AUTH_TOKEN")
client = Client(account_sid, auth_token)
url = "https://www.bungie.net/Platform"
headers = {"X-API-KEY": api_key}

authorization_url = f"https://www.bungie.net/en/OAuth/Authorize?client_id={client_id}&response_type=code"
get_auth_token = "https://www.bungie.net/Platform/App/OAuth/Token"

sending = os.getenv("SENDING_NUMBER")


def lambda_handler(event=None, context=None):
    refresh_token(account_name, account_code)


def refresh_token(display_name, display_name_code):
    with open('creds.json', 'r') as f:
        creds = json.load(f)
    refresh_token = creds['refresh_token']
    token_headers = {
        'Content-Type': "application/x-www-form-urlencoded",
    }
    data = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    }

    response = r.post(get_auth_token, headers=token_headers, data=data, auth=HTTPBasicAuth(client_id, client_secret))
    token = response.json()
    access_token = token['access_token']
    return retrieve_bungie_user(display_name, display_name_code, access_token)


def retrieve_bungie_user(display_name, display_name_code, access_token):
    print("running..")
    body = {
        "displayName": display_name,
        "displayNameCode": display_name_code
    }
    bungie_user = r.post(url + "/Destiny2/SearchDestinyPlayerByBungieName/all/", json=body, headers=headers)
    inventory_item = bungie_user.json()
    if len(inventory_item['Response']) > 0:
        for pc_type in inventory_item['Response']:
            if pc_type['membershipType'] == 2:
                pc_membership_id = pc_type["membershipId"]
                pc_membership_type = pc_type['membershipType']
                return get_bungie_character(pc_membership_type, pc_membership_id, access_token)


def get_bungie_character(membership_type, membership_id, access_token):
    character = r.get(url + f"/Destiny2/{membership_type}/Profile/{membership_id}/?components=200", headers=headers)
    results = character.json()

    date_list = []
    for k, v in results['Response']['characters']['data'].items():
        print(k, v['dateLastPlayed'])
        last_login = v['dateLastPlayed']
        date_list.append(last_login)
    most_recent_character = max(date_list)

    for k, v in results['Response']['characters']['data'].items():
        if v['dateLastPlayed'] == most_recent_character:
            character_id = v['characterId']
            # print(v['characterId'])
            return get_vendor(membership_type, membership_id, character_id, access_token)


def get_vendor(membership_type, membership_id, character_id, access_token):
    auth_headers = {"X-API-KEY": api_key, "Authorization": f"Bearer {access_token}"}
    vendor = r.get(url + f"/Destiny2/{membership_type}/Profile/{membership_id}/Character/{character_id}/Vendors"
                         f"/350061650/?components=402", headers=auth_headers)

    bounties = []
    count = 0
    results = vendor.json()
    for k, v in results['Response']['sales']['data'].items():
        count += 1
        if 6 <= count <= 9:
            bounties.append(v['itemHash'])
    define_item(bounties, access_token)


def define_item(bounties, access_token):
    auth_headers = {"X-API-KEY": api_key, "Authorization": f"Bearer {access_token}"}
    defined_bounties = []
    for x in bounties:
        item = r.get(url + f"/Destiny2/Manifest/DestinyInventoryItemDefinition/{x}/", headers=auth_headers)
        results = item.json()
        defined_item = results['Response']['displayProperties']['name']
        defined_bounties.append(defined_item)
    get_item(defined_bounties)


def get_item(item):
    with open('creds.json', 'r') as f:
        creds = json.load(f)
    numbers = creds['phone_numbers']
    print(numbers)
    for receiver in numbers:
        client.messages.create(
            to=receiver,
            from_=sending,
            body=f"Reset has hit, here are the mods Ada-1 is selling today  "
                 f"\n\n{item[0]}, \n{item[1]}, \n{item[2]}, \n{item[3]}")


if __name__ == '__main__':
    lambda_handler()

