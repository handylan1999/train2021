import os
from numpy import result_type
import pandas as pd
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/hello')
def hello_api():
    return jsonify({'Hello': request.remote_addr}), 200

# @app.route('/file')
# def file_api():
#     task = os.listdir('./static/videos')
#     return jsonify(task), 200

@app.route('/list')
def list_api():

    data_path = 'static/records/20210908.xlsx'

    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    Year = record_data.drop_duplicates(subset=['Year'])
    Year_dict = Year.to_dict(orient = 'records')

    Game = record_data.drop_duplicates(subset=['Game'])
    Game_dict = Game.to_dict(orient = 'records')

    Team = record_data.drop_duplicates(subset=['Team'])
    Team_dict = Team.to_dict(orient = 'records')

    Name = record_data.drop_duplicates(subset=['Name'])
    Name_dict = Name.to_dict(orient = 'records')

    Event = record_data.drop_duplicates(subset=['Event'])
    Event_dict = Event.to_dict(orient = 'records')

    game_data_json = {
        "Year" : Year_dict,
        "Game" : Game_dict,
        "Team" : Team_dict,
        "Name" : Name_dict,
        "Event" : Event_dict
    }

    task = game_data_json
    return jsonify(task), 200

@app.route('/yearlist')
def yearlist_api():

    data_path = 'static/records/20210908.xlsx'

    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    Year = record_data.drop_duplicates(subset=['Year'])
    Year_dict = Year.to_dict(orient = 'records')

    game_data_json = {
        "Year" : Year_dict
    }

    task = game_data_json
    return jsonify(task), 200

@app.route('/yearfilter', methods=['POST','GET'])
def yearfilter_api():
    
    yearfilter = request.json
    data_path = 'static/records/20210908.xlsx'
    
    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    mask = record_data['Year'] == yearfilter['label']
    result = record_data.loc[mask]
    year_result = result.to_dict(orient = 'records')

    game_data_json = {
            "Yearresult" : year_result
        }

    return jsonify(game_data_json), 200


@app.route('/gamelist')
def gamelist_api():

    data_path = 'static/records/Yearlist.xlsx'

    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    Game = record_data.drop_duplicates(subset=['Game'])
    Game_dict = Game.to_dict(orient = 'records')

    game_data_json = {
        "Game" : Game_dict
    }

    task = game_data_json
    return jsonify(task), 200

@app.route('/gamefilter', methods=['POST','GET'])
def gamefilter_api():
    
    gamefilter = request.json
    data_path = 'static/records/20210908.xlsx'
    
    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    mask = record_data['Year'] == gamefilter['Year']
    result = record_data.loc[mask]

    mask = record_data['Game'] == gamefilter['label']
    result = record_data.loc[mask]
    game_result = result.to_dict(orient = 'records')

    game_data_json = {
            "Gameresult" : game_result
        }

    return jsonify(game_data_json), 200



@app.route('/teamlist')
def teamlist_api():

    data_path = 'static/records/Gamelist.xlsx'

    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    Team = record_data.drop_duplicates(subset=['Team'])
    Team_dict = Team.to_dict(orient = 'records')

    game_data_json = {
        "Team" : Team_dict
    }

    task = game_data_json
    return jsonify(task), 200

@app.route('/teamfilter', methods=['POST','GET'])
def teamfilter_api():
    
    teamfilter = request.json
    data_path = 'static/records/20210908.xlsx'
    
    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    mask = record_data['Year'] == teamfilter['Year']
    result = record_data.loc[mask]

    mask = record_data['Game'] == teamfilter['Game']
    result = record_data.loc[mask]

    mask = record_data['Team'] == teamfilter['label']
    result = record_data.loc[mask]
    game_result = result.to_dict(orient = 'records')

    game_data_json = {
            "Teamresult" : game_result
        }

    return jsonify(game_data_json), 200


@app.route('/namelist')
def namelist_api():

    data_path = 'static/records/Teamlist.xlsx'

    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    Name = record_data.drop_duplicates(subset=['Name'])
    Name_dict = Name.to_dict(orient = 'records')

    game_data_json = {
        "Name" : Name_dict
    }

    task = game_data_json
    return jsonify(task), 200

@app.route('/namefilter', methods=['POST','GET'])
def namefilter_api():
    
    namefilter = request.json
    data_path = 'static/records/20210908.xlsx'
    
    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    mask = record_data['Year'] == namefilter['Year']
    result = record_data.loc[mask]

    mask = record_data['Game'] == namefilter['Game']
    result = record_data.loc[mask]

    mask = record_data['Team'] == namefilter['Team']
    result = record_data.loc[mask]

    mask = record_data['Name'] == namefilter['label']
    result = record_data.loc[mask]
    game_result = result.to_dict(orient = 'records')

    game_data_json = {
            "Nameresult" : game_result
        }

    return jsonify(game_data_json), 200


@app.route('/eventlist')
def eventlist_api():

    data_path = 'static/records/Namelist.xlsx'

    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    Event = record_data.drop_duplicates(subset=['Event'])
    Event_dict = Event.to_dict(orient = 'records')

    game_data_json = {
        "Event" : Event_dict
    }

    task = game_data_json
    return jsonify(task), 200

@app.route('/eventfilter', methods=['POST','GET'])
def eventfilter_api():
    
    eventfilter = request.json
    data_path = 'static/records/Namelist.xlsx'
    
    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    event_mask = record_data['Event'] == eventfilter['label']
    print(record_data.loc[event_mask])
    result = record_data.loc[event_mask]
    writer = pd.ExcelWriter('static/records/Eventlist.xlsx', engine='openpyxl')
    result.to_excel(writer, sheet_name='Sheet1')
    writer.save()
    writer.close()

    return jsonify('nothing'), 200


@app.route('/hashlist', methods=['POST','GET'])
def hashlist_api():


    final = request.json
    data_path = 'static/records/20210908.xlsx'
    
    record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    record_data = record_data.dropna()
    mask = record_data['Year'] == final['Year']
    result = record_data.loc[mask]

    mask = record_data['Game'] == final['Game']
    result = record_data.loc[mask]

    mask = record_data['Team'] == final['Team']
    result = record_data.loc[mask]

    mask = record_data['Name'] == final['Name']
    result = record_data.loc[mask]

    mask = record_data['Event'] == final['Event']
    result = record_data.loc[mask]
    allresult = result.to_dict(orient = 'records')

    game_data_json = {
            "Allresult" : allresult
        }

    return jsonify(game_data_json), 200


    # hashlist = request.json
    # videoFullCorrectFileName_list = list()

    # data_path = 'static/records/Hashlist.xlsx'
    # record_data = pd.read_excel(data_path, sheet_name="Sheet1", usecols=["Year","Date","Game","T_Guest","T_Home","Quarter","Team","Number","Name","Event","Type","VideoHash"], engine='openpyxl')
    # record_data = record_data.dropna()
    # hash_mask = record_data['Event'] == hashlist['label']
    # result = record_data.loc[hash_mask]
    # VideoHash_dict = result.to_dict(orient = 'records')

    # game_data_json = {
    #     "VideoHash" : VideoHash_dict
    # }


    # for i in game_data_json:
    #     FileName = { 'FileName': i }
    #     videoFullCorrectFileName_list.append(FileName)

    # return jsonify(videoFullCorrectFileName_list), 200


# @app.route('/data', methods=['POST'])
# def data_para_api():

#     teamType = request.json
#     selectedTeamType = teamType['teamType']
#     print('Posted:' , teamType['teamType'])
    
#     data_path = 'static/records/20210817.xlsm'

#     home_df = pd.read_excel(data_path, sheet_name="HomeAttackPlay-by-Play", usecols=["總球數","局數","投手","打者","球種","球速","結果","好壞球","投手球數","揮棒","Count","在壘與出局","Clip_ID","ExitVelo","LaunchAngle","Direction"], engine='openpyxl')
#     home_data = home_df.dropna(subset=["總球數"]) # If 總球數 is Nan then del this row.
#     home_data = home_data.fillna("")

#     home_data_dict = home_data.to_dict(orient = 'records')

#     guest_df = pd.read_excel(data_path, sheet_name="GuestAttackPlay-by-Play", usecols=["總球數","局數","投手","打者","球種","球速","結果","好壞球","投手球數","揮棒","Count","在壘與出局","Clip_ID","ExitVelo","LaunchAngle","Direction"], engine='openpyxl')
#     guest_data = guest_df.dropna(subset=["總球數"]) # If 總球數 is Nan then del this row.
#     guest_data = guest_data.fillna("")

#     guest_data_dict = guest_data.to_dict(orient = 'records')

#     game_dada_json = {
#         'HomeAllLogs': home_data_dict,
#         'GuestAllLogs': guest_data_dict,
#     }
    
#     if not request.json or not 'teamType' in request.json:
#         return jsonify(), 400
#     elif selectedTeamType == 'Guest':
#         task = game_dada_json["GuestAllLogs"]
#         return jsonify(task), 200
#     else:
#         task = game_dada_json["HomeAllLogs"]
#         return jsonify(task), 200

# @app.route('/parameter', methods=['POST'])
# def parameter_api():

#     teamType = request.json
#     selectedTeamType = teamType['value']

#     print('Posted:' , teamType['value'])
    
#     data_path = 'static/records/20210817.xlsm'

#     home_df = pd.read_excel(data_path, sheet_name="HomeAttackPlay-by-Play", usecols=["總球數","局數","投手","打者","球種","球速","結果","好壞球","投手球數","揮棒","Count","在壘與出局","Clip_ID","ExitVelo","LaunchAngle","Direction"], engine='openpyxl')
#     home_data = home_df.dropna(subset=["總球數"]) # If 總球數 is Nan then del this row.
#     home_data = home_data.fillna("")

#     home_data_dict = home_data.to_dict(orient = 'records')

#     guest_df = pd.read_excel(data_path, sheet_name="GuestAttackPlay-by-Play", usecols=["總球數","局數","投手","打者","球種","球速","結果","好壞球","投手球數","揮棒","Count","在壘與出局","Clip_ID","ExitVelo","LaunchAngle","Direction"], engine='openpyxl')
#     guest_data = guest_df.dropna(subset=["總球數"]) # If 總球數 is Nan then del this row.
#     guest_data = guest_data.fillna("")

#     guest_data_dict = guest_data.to_dict(orient = 'records')

#     game_dada_json = {
#         'HomeAllLogs': home_data_dict,
#         'GuestAllLogs': guest_data_dict,
#     }
    
#     if not request.json or not 'value' in request.json:
#         return jsonify(), 400
#     elif selectedTeamType == '客隊':
#         task = game_dada_json["GuestAllLogs"]
#         return jsonify(task,'客隊'), 200
#     elif selectedTeamType == '主隊':
#         task = game_dada_json["HomeAllLogs"]
#         return jsonify(task, '主隊'), 200
#     else:
#         return jsonify('nothing'), 200

@app.route('/find-videos', methods=['POST','GET'])
def find_video_api():
    
    findVideo = request.json
    videoFullCorrectFileName_list = list()

    # file_path = str(findVideo['file_path']) # eg.2021/中職一軍-上半季/20210319-味全vs兄弟/Cam-1/
    # find_file = str(findVideo['find_file'])
    # end_file = str(findVideo['end_file'])

    file_path = "" 
    find_file = str(findVideo['label1'] + "-" + findVideo['label']) 
    print (find_file)
    end_file = ".mp4"

    videos_path = './static/videos/' + file_path

    for i in os.listdir(videos_path):
        if find_file in i and i.endswith(end_file):
            fullCorrectFileName = { 'FullCorrectFileName': i }
            videoFullCorrectFileName_list.append(fullCorrectFileName)
            print(f"Find All File Have :{find_file} , And File Type Is :{end_file}, Full Correct File Name :{i}")

    return jsonify(videoFullCorrectFileName_list), 200



if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(debug=True)
    # app.run(debug=False, host='0.0.0.0', port=5000)