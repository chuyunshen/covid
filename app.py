from flask import Flask, jsonify
import git
import os
import csv

app = Flask(__name__)

path = './COVID-19'
usData = './COVID-19/csse_covid_19_data/csse_covid_19_daily_reports_us'
Data = './Webapp/Data'
predictionData = './Webapp/Prediction'
batchData = './Webapp/Batch'


@app.route("/data/<location>")
def sendData(location):
    if('%20' in location):
        location.replace('%20',' ')
    filePath = Data +'/'+location+ '.csv'
    print (filePath)
    locationData = readCSV(filePath) #read in csv, store in list
    response = jsonify({location: locationData})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/data/<location>/<title>")
def sendDataColumn(location, title):
    filePath = Data +'/'+location+ '.csv'
    print (filePath)
    locationData = readCSV(filePath,title) #read in csv, store in list
    response = jsonify({location: locationData})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/pull")
def pull():
    #display:app updating, please wait


    oldfiles = os.listdir(usData)
    repo = git.Repo(path)
    o = repo.remotes.origin
    o.pull()
    newfiles = os.listdir(usData)
    difference = Diff(newfiles, oldfiles)
    if not difference:
        return jsonify("no new files")
    else:
        difference = sorted(difference)
        for i in range (0, len(difference)):
            oldfile = findPastFile(difference[i])
            difference[i] = usData + '/' + difference[i]
            updateCSV(difference[i], oldfile)
        updatePrediction()
        return jsonify({"newfile":difference})

#this will send the 14 days prediction,
#location is the location, n is the # of lines to traceback
@app.route("/prediction/<location>/<n>")
def sendPrediction(location,n=14):
    #read from csv, get last two weeks
    filepath = Data+'/'+location+'.csv'
    predictionpath = predictionData+'/'+location+'.csv'
    pastData = {}
    num_lines = sum(1 for line in open(filepath))
    num_lines = num_lines -int(n)
    with open(filepath) as past_file:
        csv_reader = csv.reader(past_file)
        for row in (csv_reader):
            num_lines= num_lines-1
            if (num_lines<0):
                pastData.update({row[0]:[row[1],row[2],row[3]]})
    with open(predictionpath) as predict_file:
        csv_reader = csv.reader(predict_file)
        for row in (csv_reader):
            pastData.update({row[0]:[row[1],row[2],row[3]]})
    response = jsonify({"prediction":pastData})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


#this will send the batch sizes
@app.route("/batch/<location>")
def sendBatch(location):
    filepath = batchData + '/' + location +'.csv'
    batch = {}
    with open(filepath) as batchfile:
        csv_reader = csv.reader(filepath)
        for row in csv_reader:
            try:
                batch.update({row[0]:[row[1],row[2],row[3]]})
            except:
                return jsonify("empty")

    response = jsonify({"prediction":pastData})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def Diff(A, B):
   return (list(set(A) - set(B)))


#update prediction for each region and write to Prediction folder
#./Prediction/{Name}.csv
def updatePrediction():
    #run prediction for each state


    #for each state, get a list, write the list to predictionData/{name}.csv
    return

#path for current date, oldpath for the previous date
def updateCSV(path,oldpath):
    old_daily_total={}
    with open(oldpath) as past_csv_file:
        csv_reader_old = csv.reader(past_csv_file)
        for row in csv_reader_old:
            if(validData(row[0])):
                old_daily_total.update({row[0]:row[5]})

    #path as ./'usData'/Date.csv
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file)
        if (usData+'/') in path:
            time = path.replace((usData+'/'),'')
            time = time.replace('-','')
            time = time.replace('.csv','')
        else:
            time = path
        print(time)
        for row in csv_reader:
            if (validData(row[0])):
                name = row[0]
                confirm = int(float(row[5]))
                old_comfired = int(float(old_daily_total[name]))
                confirm = int(confirm) - int(old_comfired)
                tested = row[11]
                index = 0
                outputfilePath = './Data/'+name+'.csv'
                print(outputfilePath)

                with open(outputfilePath) as outfile:
                    csv_reader = csv.reader(outfile)
                    for row in csv_reader:
                        index+=1
                #write to Data/name.csv
                with open(outputfilePath,mode = 'a+', newline='') as outfile:
                    csv_writer = csv.writer(outfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL )
                    csv_writer.writerow([time, tested,confirm, index])
    return

def find_csv_files(path = usData, suffix = '.csv'):
    filenames = os.listdir(path)
    return [filename for filename in filenames if (filename.endswith(suffix))]

def findPastFile(path):
    files = find_csv_files()
    files = sorted(files)
    res_list = [i for i, value in enumerate(files) if value == path]
    if(res_list[0]-1 >=0):
        old_path = files[res_list[0]-1]
        return usData + '/' +old_path
    else:
        return 0

#return false if it's header, grand princess, diamond princess, or recovered
def validData (data):
    if data == 'Province_State':
        return False
    elif data == 'Grand Princess':
        return False
    elif data == 'Diamond Princess':
        return False
    elif data == 'Recovered':
        return False
    else:
        return True

def readCSV(filename, column='all'):
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file)
        if (column =='all'):
            data = {}
            for row in csv_reader:
                date = row[0]
                dailyTest = row[1]
                dailyActive = row[2]
                entry = row[3]
                data[date] = []
                data[date].append({
                    'dailyTest': dailyTest,
                    'dailyActive': dailyActive,
                    'entry': entry
                })
            return data
        else:
            data = []
            for row in csv_reader:
                if (column =='date'):
                    data.append(row[0])
                elif (column == 'dailyTest'):
                    data.append(row[1])
                elif (column == 'dailyActive'):
                    data.append(row[2])
                elif (column == 'entry'):
                    data.append(row[3])
                else:
                    data.append("invalid request")
                    return data
            return data

if __name__=='__main__':
    app.run(host="127.0.0.1", port = 5000)
