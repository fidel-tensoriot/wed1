import pathlib
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import os
import json


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
    return img.show()


def lambda_handler(event, context=None):
    """
    Lambda handler, entry point for script 
    """
    print("--- -- -- event",event)
    body = event['body']
    print("--- - --- - name",body, type(body))
    name = body['name']
    print(name)
    # draw_image(name)
    return  {
        'statusCode': 200,
        'body': json.dumps("Hello from lambda")
    }


if __name__ == "__main__":
    lambda_handler(
        event={
            'body': {
                'name': 'Chris and Cat'
            }
        }
    )



