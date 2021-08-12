from faker import Faker
from datetime import datetime, date
import numpy as np
import pandas as pd

NEXT_USER_ID = 0
NEXT_ORG_ID = 0
NEXT_BRAND_AD_CARD_ID = 0
NEXT_CREATOR_AD_CARD_ID = 0
NEXT_BRAND_CAMPAIGN_ID = 0
NEXT_CREATOR_CAMPAIGN_ID = 0


def generate_fake_creator(user_role="internal-admin"):
    global NEXT_USER_ID
    fake = Faker()
    creator_dict = {
        "id":  NEXT_USER_ID,
        "user-type": "creator",
        "name": fake.name(),
        "email": fake.email(),
        "password": fake.password(),
        "creation-time": datetime.now(),
        "user-role": user_role,
        "phone-number": fake.phone_number()
    }
    NEXT_USER_ID += 1
    return creator_dict


def generate_fake_brand_user(user_role="internal-admin", organization_id=None):
    global NEXT_USER_ID
    fake = Faker()
    brand_user_dict = {
        "id":  NEXT_USER_ID,
        "user_type": "brand",
        "name": fake.name(),
        "email": fake.email(),
        "password": fake.password(),
        "organization-id": organization_id,
        "creation-time": datetime.now(),
        "user-role": user_role,
        "phone-number": fake.phone_number()
    }
    NEXT_USER_ID += 1
    return brand_user_dict


def generate_fake_user(user_type="creator", user_role="internal-admin", organization_id=None):
    if user_type == "creator":
        return generate_fake_creator(user_role)
    elif user_type == "brand":
        return generate_fake_brand_user(user_role, organization_id=organization_id)
    else:
        print("pass valid user type")


def generate_fake_organization(name=None):
    global NEXT_ORG_ID
    organization_dict = {
        "id": NEXT_ORG_ID,
        "name": name,
        "creation-time": datetime.now()
    }
    NEXT_ORG_ID += 1
    return organization_dict


def get_platform():
    platforms = ["instagram",
                 "tiktok",
                 "youtube",
                 "linkedin",
                 "twitch"]

    return platforms[np.random.randint(0, 5)]


def generate_fake_brand_ad_card(name=None,
                                brand_user_id=None,
                                creator_user_id=None,
                                brand_organization_id=None,
                                brand_campaign_id=None,
                                creator_campaign_id=None,
                                price=None):
    global NEXT_BRAND_AD_CARD_ID
    fake = Faker()
    brand_ad_card_dict = {
        "id": NEXT_BRAND_AD_CARD_ID,
        "name": name,
        "state": "BRAND SUGGESTED",
        "price": price,
        "platform": get_platform(),
        "brand-user-id": brand_user_id,
        "brand-organization-id": brand_organization_id,
        "creator-user-id": creator_user_id,
        "creation-time": datetime.now(),
        "execution-window-start": date(2021, 5, 5),
        "execution-window-end": date(2021, 5, 9),
        "brand-campaign-id": brand_campaign_id,
        "creator-campaign-id": creator_campaign_id,
        "instructions": fake.sentence(nb_words=18),
        "post-analytics-id": None,  # to be set once ad is executed
    }
    NEXT_BRAND_AD_CARD_ID += 1
    return brand_ad_card_dict


def generate_fake_creator_ad_card(name=None,
                                  brand_user_id=None,
                                  creator_user_id=None,
                                  brand_organization_id=None,
                                  brand_campaign_id=None,
                                  creator_campaign_id=None,
                                  expected_impressions=None,
                                  price=None):
    global NEXT_CREATOR_AD_CARD_ID
    fake = Faker()
    creator_ad_card_dict = {
        "id": NEXT_CREATOR_AD_CARD_ID,
        "name": name,
        "state": "CREATOR SUGGESTED",
        "price": price,
        "platform": get_platform(),
        "brand-user-id": brand_user_id,
        "brand-organization-id": brand_organization_id,
        "creator-user-id": creator_user_id,
        "creation-time": datetime.now(),
        "creator-expected-impressions": expected_impressions,
        "execution-window-start": date(2021, 5, 2),
        "execution-window-end": date(2021, 5, 4),
        "brand-campaign-id": brand_campaign_id,
        "creator-campaign-id": creator_campaign_id,
        "instructions": fake.sentence(nb_words=18),
        "post-analytics-id": None,  # to be set once ad is executed
    }
    NEXT_CREATOR_AD_CARD_ID += 1
    return creator_ad_card_dict


def generate_fake_brand_campaign(name=None,
                                 brand_user_id=None,
                                 brand_organization_id=None):
    global NEXT_BRAND_CAMPAIGN_ID
    brand_campaign_dict = {
        "id": NEXT_BRAND_CAMPAIGN_ID,
        "name": name,
        "state": "PRE LAUNCH",
        "brand-user-id": brand_user_id,
        "brand-organization-id": brand_organization_id,
        "creation-time": datetime.now(),
        "completion-time": None,
    }
    NEXT_BRAND_CAMPAIGN_ID += 1
    return brand_campaign_dict


def generate_fake_creator_campaign(name=None,
                                   creator_user_id=None):
    global NEXT_CREATOR_CAMPAIGN_ID
    creator_campaign_dict = {
        "id": NEXT_CREATOR_CAMPAIGN_ID,
        "name": name,
        "state": "PRE LAUNCH",
        "creator-user-id": creator_user_id,
        "creation-time": datetime.now(),
        "completion-time": None,

    }
    NEXT_CREATOR_CAMPAIGN_ID += 1
    return creator_campaign_dict


# People + organizations
N_CREATORS = 10
N_BRAND_ACTORS = 10
BRAND_LIST = ["Spoild & Rotten", "Only", "Delos",
              "Converse", "Sustainable Fashion Brand X"]

# Campaigns
SAMPLE_CAMPAIGN_NAMES = ["Christmas", "NBA finals",
                         "spring line", "Beijing olympics"]
SAMPLE_CAMPAIGN_YEARS = [2021, 2022, 2023]
N_BRAND_CAMPAIGNS = 5
N_CREATOR_CAMPAIGNS = 3

# Individual Ads
N_BRAND_AD_CARDS = 25
N_CREATOR_AD_CARDS = 20

creators = [generate_fake_user(
    user_type="creator", user_role="internal-admin") for user_id in range(N_CREATORS)]
brands = [generate_fake_organization(name=n) for n in BRAND_LIST]
brand_actors = [generate_fake_user(user_type="brand", user_role="internal-admin",
                                   organization_id=np.random.randint(0, len(BRAND_LIST))) for _ in range(N_BRAND_ACTORS)]

brand_campaigns = [generate_fake_brand_campaign(name=f"{SAMPLE_CAMPAIGN_NAMES[np.random.randint(0,len(SAMPLE_CAMPAIGN_NAMES))]} {Faker().month()}-{SAMPLE_CAMPAIGN_NAMES[np.random.randint(0,len(SAMPLE_CAMPAIGN_NAMES))]}",
                                                brand_user_id=np.random.randint(
                                                    0, N_BRAND_ACTORS),
                                                brand_organization_id=np.random.randint(0, len(BRAND_LIST))) for _ in range(N_BRAND_CAMPAIGNS)]

creator_campaigns = [generate_fake_creator_campaign(name=f"{SAMPLE_CAMPAIGN_NAMES[np.random.randint(0,len(SAMPLE_CAMPAIGN_NAMES))]} {Faker().month()}-{SAMPLE_CAMPAIGN_NAMES[np.random.randint(0,len(SAMPLE_CAMPAIGN_NAMES))]}",
                                                    creator_user_id=np.random.randint(0, N_CREATORS),) for _ in range(N_CREATOR_CAMPAIGNS)]

brand_ad_cards = [generate_fake_brand_ad_card(name=f"{SAMPLE_CAMPAIGN_NAMES[np.random.randint(0,len(SAMPLE_CAMPAIGN_NAMES))]} {Faker().month()}-{SAMPLE_CAMPAIGN_NAMES[np.random.randint(0,len(SAMPLE_CAMPAIGN_NAMES))]}",
                                              brand_user_id=np.random.randint(
                                                  0, N_BRAND_ACTORS),
                                              creator_user_id=np.random.randint(
                                                  0, N_CREATORS),
                                              brand_organization_id=np.random.randint(
                                                  0, len(BRAND_LIST)),
                                              brand_campaign_id=None if np.random.random(
                                              ) < 0.5 else np.random.randint(0, N_BRAND_CAMPAIGNS),
                                              creator_campaign_id=None if np.random.random(
                                              ) < 0.9 else np.random.randint(0, N_CREATOR_CAMPAIGNS),
                                              price=np.random.randint(20, 100)*100) for _ in range(N_BRAND_AD_CARDS)]

creator_ad_cards = [generate_fake_creator_ad_card(name=f"{SAMPLE_CAMPAIGN_NAMES[np.random.randint(0,len(SAMPLE_CAMPAIGN_NAMES))]} {Faker().month()}-{SAMPLE_CAMPAIGN_NAMES[np.random.randint(0,len(SAMPLE_CAMPAIGN_NAMES))]}",
                                                  brand_user_id=np.random.randint(
                                                      0, N_BRAND_ACTORS),
                                                  creator_user_id=np.random.randint(
                                                      0, N_CREATORS),
                                                  brand_organization_id=None if np.random.random(
                                                  ) < 0.75 else np.random.randint(0, len(BRAND_LIST)),
                                                  brand_campaign_id=None if np.random.random(
                                                  ) < 0.9 else np.random.randint(0, N_BRAND_CAMPAIGNS),
                                                  creator_campaign_id=None if np.random.random(
                                                  ) < 0.25 else np.random.randint(0, N_CREATOR_CAMPAIGNS),
                                                  expected_impressions=np.random.randint(
                                                      50, 500)*100,
                                                  price=np.random.randint(20, 100)*100) for _ in range(N_CREATOR_AD_CARDS)]

for data_table, table_name in zip([creators, brands, brand_actors, brand_campaigns, creator_campaigns, brand_ad_cards, creator_ad_cards],
                                  ["creators", "brands", "brand-actors", "brand-campaigns", "creator-campaigns", "brand-ad-cards", "creator-ad-cards"]):
    # compression_opts = dict(method='zip', archive_name=f'{table_name}.csv')
    df = pd.DataFrame(data_table)
    df.to_csv(f'{table_name}.csv')
    #df.to_csv(f'{table_name}.zip', index=False, compression=compression_opts)
