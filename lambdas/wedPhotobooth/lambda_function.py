import json
import boto3
import os
import logging


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

s3 = boto3.client('s3')
# bucket_name = os.environ['wed-bucket-gallery']  # Make sure to set this in the Lambda environment variables
bucket_name = 'wed-bucket-photobooth-fidel'  


def lambda_handler(event, context):
    try:
        response = s3.list_objects_v2(Bucket=bucket_name)
        print("test response", response)
        contents = response.get('Contents', [])

        files = [
            {
                "key": obj["Key"],
                "url": f"https://{bucket_name}.s3.amazonaws.com/{obj['Key']}"
            }
            for obj in contents
            if not obj["Key"].endswith("/")  # skip folder entries
        ]

        return {
            "statusCode": 200,
            "body": json.dumps({ "photos": files })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({ "error": str(e) })
        }


# If local env, test using this. 
if __name__ == "__main__":
    test_event = {
        "httpMethod": "GET",
        "body": json.dumps({
            "name": "First Last",
            "files": [
                {"name": "test1.jpg", "data": base64.b64encode(b"dummy data").decode()}
            ]
        })
    }
    print(lambda_handler(test_event, None))
