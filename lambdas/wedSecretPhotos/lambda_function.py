import json
import boto3
import os
import logging
import base64

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

s3=boto3.client('s3')
bucket_name = 'wed-photographer'
FOLDERS = ["Coronel_F&K_062725/Thb/", "Coronel_F&K_062725_LS/Thb/"]

def lambda_handler(event, context):
    all_color_photos = []

    for folder in FOLDERS: 
        continuation_token = None

        while True:
            list_kwargs = {
                "Bucket": bucket_name,
                "Prefix": folder,
                "MaxKeys": 1000
            }

            if continuation_token: list_kwargs["ContinuationToken"] = continuation_token

            response = s3.list_objects_v2(**list_kwargs)
            contents = response.get("Contents", [])

            logger.info(f"Fetched {len(contents)} objects from {folder}")

            for obj in contents:
                key = obj["Key"]
                if not key.lower().endswith((".jpg", ".jpeg", ".png")):
                    continue
                url = f"https://{bucket_name}.s3.amazonaws.com/{key}"
                all_color_photos.append({"key": key, "url":url})

            if response.get("IsTruncated"):
                continuation_token = response.get("NextContinuationToken")
            else:
                break

    logger.info(f"reasponse {all_color_photos}")

    return {
        'statusCode': 200,
        'body': json.dumps(all_color_photos)
    }



# If local env, test using this
if __name__ == "__main__":
    test_event ={
        "httpMethod": "GET",
        "body": json.dumps({
            "name": "First Last",
            "files": [
                {"name": "test1.jpg", "data": base64.b64encode(b"dummy data").decode()}
            ]
        })
    }
    print(lambda_handler(test_event, None))
