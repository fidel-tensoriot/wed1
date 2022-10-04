import json
import boto3


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('wed-rsrv-1') 


def lambda_handler(event, context=None):
    body = (event['body'])
    print(f"body: {body} \n type: {body} \n event:{event}")
    
    if type(body) is not dict:
        body = json.loads(body)
        
    name = body['name']
    print(name)
    table.put_item(Item=body)


    # end return 
    return  {
        'statusCode': 200,
        # 'body': json.dumps(url)
        'body': f"Wrote to the DB{body}"
    }
    
    
    

# If local env, test using this. 
if __name__ == "__main__":
    lambda_handler(
        event={
            'body': {
                "name": "First Last",
                "email": "emai@gmail.coml",
                "notes": "Test Notes"
            }
        }
    )

