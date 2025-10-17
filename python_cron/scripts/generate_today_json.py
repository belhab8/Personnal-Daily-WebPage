import os
import requests
import json
import datetime
import pandas as pd
import random
#from dotenv import load_dotenv
from supabase import create_client, Client

#load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))
json_path = "/app/data/today.json"

def get_data():
    kanye_url = "https://api.kanye.rest"
    cat_fact_url = "https://meowfacts.herokuapp.com/"
    cat_img_url = "https://cataas.com/cat/small?json=true"
    plane_img_url = "https://api.planespotters.net/pub/photos/reg/"
    plane_info_url = f"https://api.aviationstack.com/v1/airplanes?limit=1"
    plane_info_key = os.getenv('AVIATIONSTACK_API_KEY')

    kanyeOTD = requests.get(kanye_url).json()['quote']
    catFactOTD = requests.get(cat_fact_url).json()['data'][0]
    catImgOTD = requests.get(cat_img_url).json()['url']
    flag = False
    tries = 0
    while flag != True :
        randPlane = f'&offset={random.randrange(1000)}'
        full_url = f'{plane_info_url}{randPlane}&access_key={plane_info_key}'
        plane_info = requests.get(full_url).json()['data'][0]
        code = plane_info['registration_number']
        planeImgOTD = requests.get(plane_img_url + code).json()
        print(planeImgOTD)
        try:
            flag = True
            planeOTD = {
                'engines_count': plane_info['engines_count'],
                'engines_type': plane_info['engines_type'],
                'first_flight_date': plane_info['first_flight_date'],
                'owner': plane_info['plane_owner'],
                'registration_number': code,
                'model': plane_info['model_code'],
                'production_line': plane_info['production_line'],
                'status': plane_info['plane_status'],
                'image': planeImgOTD['photos'][0]['thumbnail_large']['src'],
                'photographer': planeImgOTD['photos'][0]['photographer']}
        except:
            flag = False
            tries += 1
            if tries > 5:
                planeOTD = {
                    'engines_count': None,
                    'engines_type': None,
                    'first_flight_date': None,
                    'owner': None,
                    'registration_number': None,
                    'production_line': None,
                    'status': None,
                    'image': None,
                    'photographer': 'N/A'}
                flag = True
                break
    
    today = datetime.datetime.today().strftime('%d-%m-%Y')
    content = {
        "date": today,
        "kanye": kanyeOTD,
        "catFact": catFactOTD,
        "catImg": catImgOTD,
        "plane": planeOTD}
    return {'content': content, 'filename' : f'data_{today}.json'}

def ingest_data(file):
    data = file['content']
    content = pd.DataFrame([data])
    record = content.iloc[0].to_dict()
    os.makedirs('/app/data',exist_ok=True)
    local_path = '/app/data/today.json'
    with open(local_path, 'w', encoding='utf-8') as f:
        json.dump(record, f, ensure_ascii=False, indent=2)
    with open(local_path, "rb") as f:
        res_today = (
            supabase.storage
            .from_("today-json")
            .upload(
                file=f,
                path="today.json",
                file_options={"upsert": "true"}
            )
        )
    with open(local_path, "rb") as f:
        res_date = (
            supabase.storage
            .from_("today-json")
            .upload(
                file=f,
                path=f"histo/{file['filename']}",
                file_options={"upsert": "true"}
            )
        )
    print("upload today.json : ", res_today)
    print(f"upload {file['filename']} : ", res_date)
    #with open("/app/data/today.json", "w", encoding="utf-8") as f:
    #    json.dump(record, f, ensure_ascii=False, indent=2)
    #with open(f"/app/data/{file['filename']}.json", "w", encoding="utf-8") as f:
    #    json.dump(record, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    print(url)
    supabase = create_client(supabase_url=url, supabase_key=key)
    data = get_data()