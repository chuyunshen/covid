import csv
import json
data = {}

def readCSV(filename):
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file)

        for row in csv_reader:
            date = row[0]
            dailyTest = row[1]
            dailyActive = row[2]
            entry = row[3]
            data[date] = []
            data[date].append({
              'dailyTest': dailyTest,
              'dailyActive':dailyActive,
              'entry': entry
            })
with open('Alberta.json','w') as outfile:
    json.dump(data,outfile)