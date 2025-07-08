import json
import boto3
import os
import logging
import base64  # Add this import for base64 decoding
from urllib.parse import unquote_plus


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

s3 = boto3.client('s3')
# bucket_name = os.environ['wed-bucket-gallery']  # Make sure to set this in the Lambda environment variables
bucket_name = 'wed-bucket-gallery'  


def lambda_handler(event, context):
    # Parse HTTP method to determine if it's a POST or GET request
    # method = event.get('httpMethod')
    method = event.get("requestContext", {}).get("http", {}).get("method", "")

    logger.info(f"api method {method} type and event payload {event}")
    # print("method:", event.get("requestContext", {}).get("http", {}).get("method", ""))

    
    if method == 'POST':
        return handle_post(event)
    elif method == 'GET':
        return handle_get(event)
    else:
        return {
            'statusCode': 400,
            'body': json.dumps("Invalid method sent", method)
        }


def handle_post(event):
    try:
        # Parse the JSON body of the request
        body = json.loads(event['body'])
        name = body['name']
        files = body['files']  # Expecting a list of file metadata (base64 encoded or URLs)
        logger.info(f"name {name} and files in post call {files}")


        # Validate if files exist
        if not files:
            logger.error("error no files provided")
            return {
                'statusCode': 400,
                'body': json.dumps('No files provided')
            }
        
        # Create a folder structure based on the user's name
        # folder_path = f"{name}/"  # Use name as folder
        uploaded_files = []
        urls = []

        for file in files: 
            url = s3.generate_presigned_url(
                'put_object',
                Params={
                    'Bucket': bucket_name, 
                    'Key': f"{name}/{file['name']}",
                    'ContentType': file.get('type')
                },
                ExpiresIn=3600,
            )
            urls.append({'name': file['name'], 'url': url})

        # for file in files:
        #     # Each file should include filename and file data (or URL)
        #     file_name = file['name']
        #     file_data = file['data']  # Assume base64 or URL (you'll need to handle base64 decoding)
            
        #     # Here we will assume the file data is base64 and decode it
        #     file_data_decoded = base64.b64decode(file_data)
            
        #     # Upload to S3 under the user's folder
        #     s3.put_object(
        #         Bucket=bucket_name,
        #         Key=f"{folder_path}{file_name}",
        #         Body=file_data_decoded,
        #         ContentType="image/jpeg"  # Adjust according to file type
        #     )
            
        #     # Keep track of the uploaded files
        #     uploaded_files.append({
        #         'name': file_name,
        #         'url': f"https://{bucket_name}.s3.amazonaws.com/{folder_path}{file_name}"
        #     })

        logger.info(f"success call on handle post, returning {uploaded_files}")
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Files uploaded successfully',
                # 'uploaded_files': uploaded_files,
                'urls': urls
            })
        }
    except Exception as e:
        logger.error(f"handling posting error {e}")

        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }


def handle_get(event):
    try:
        # Get the user's folder name (e.g., passed as a query parameter)
        query_params = event.get('queryStringParameters')  # This will be None
        name = query_params.get('name') if query_params else None

        # List all objects under the user's folder (name)
        prefix = f"{name}/" if name else ""  # Use an empty prefix if no name
        response = s3.list_objects_v2(
            Bucket=bucket_name,
            Prefix=prefix
        )

        # logger.info(f"prefix {prefix} for the bucket and response {response}")

        if 'Contents' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps('No photos found for this user')
            }

        
        # Build a list of photo URLs
        photos = {}
        for obj in response['Contents']:
            key = obj.get('Key')
            name = key.split('/')[0]
            # Ensure there's a list for this name in the dictionary
            if name not in photos:
                photos[name] = []

            url = f"https://{bucket_name}.s3.amazonaws.com/{unquote_plus(obj['Key'])}"
            photos[name].append(url)

        # logger.info(f"list of photos to return to user {photos}")
        return {
            'statusCode': 200,
            'body': json.dumps({'photos': photos})
        }
    
    except Exception as e:
        logger.error(f"handling get error {e}")

        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }


# If local env, test using this. 
if __name__ == "__main__":
    test_event = {
        "httpMethod": "POST",
        "body": json.dumps({
            "name": "First Last",
            "files": [
                {"name": "test1.jpg", "data": base64.b64encode(b"dummy data").decode()}
            ]
        })
    }
    print(lambda_handler(test_event, None))
