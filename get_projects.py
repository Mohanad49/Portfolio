import urllib.request
import json

url = "https://firestore.googleapis.com/v1/projects/my-portfolio-da541/databases/(default)/documents/projects?key=AIzaSyB3pFhEEqD3fZYspv_ftWCWN1OsvEXx5pw"
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    
for doc in data.get('documents', []):
    fields = doc.get('fields', {})
    title = fields.get('Title', {}).get('stringValue', '')
    if any(x in title.lower() for x in ['gamerhq', 'lafefny', 'kindle']):
        print(f"Title: {title}")
        print(f"Desc: {fields.get('Description', {}).get('stringValue', '')}")
        print(f"Link: {fields.get('Link', {}).get('stringValue', '')}")
        print(f"Github: {fields.get('Github', {}).get('stringValue', '')}")
        techs = [x.get('stringValue', '') for x in fields.get('TechStack', {}).get('arrayValue', {}).get('values', [])]
        print(f"Tech: {techs}")
        feats = [x.get('stringValue', '') for x in fields.get('Features', {}).get('arrayValue', {}).get('values', [])]
        print(f"Features: {feats}")
        print("-" * 40)
