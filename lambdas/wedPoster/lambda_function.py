import pathlib
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import os
import json
import boto3

# Initialize S3 client
s3 = boto3.client('s3')
BUCKET_NAME = "wed-bucket-flyers"


def draw_image(name):
    """
    Draws the image, takes the name and then shows it. 
    """
    myFont = ImageFont.truetype("Lobster-Regular.ttf", 80)
    img = Image.open('day1.jpg')
    draw = ImageDraw.Draw(img)
    draw.text((150, 1715), name, font=myFont, fill=(255, 0, 0))  # top
    draw.text((600, 1790), "Are Going!", font=myFont,
              fill=(255, 0, 0))  # bottom
    # return img.show()
    output_path = f"/tmp/{name}.jpg"  # Save to /tmp, the writable directory in Lambda
    img.save(output_path)  # Save the image
    return output_path


def upload_to_s3(file_name, key):
    """
    Uploads the file to S3 and makes it publicly accessible.
    """
    s3.upload_file(file_name, BUCKET_NAME, key, ExtraArgs={"ACL": "public-read"})
    file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{key}"
    return file_url


def lambda_handler(event, context=None):
    """
    Lambda handler, entry point for script 
    """
    print("--- -- -- event",event)
    body = json.loads(event['body'])
    print("--- - --- - name",body, type(body))
    name = body['name']
    print(name)
    file_name = draw_image(name)

    key = f"flyers/{os.path.basename(file_name)}"
    
    # Upload the image to S3
    file_url = upload_to_s3(file_name, key)

    return {
        'statusCode': 200,
        'body': json.dumps({"message": "Image created", "url": file_url})
    }


if __name__ == "__main__":
    lambda_handler(
        event={
            'body': {
                'name': 'Chris and Cat'
            }
        }
    )
