import csv
import os
usData = './../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports_us'

def createCSV():
    sourcepath = './../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports_us/'
    names = []
    outputpath = './Batch/'
    try:
        with open(sourcepath+'04-12-2020.csv') as csv_file:
            csv_reader = csv.reader(csv_file)
            for row in csv_reader:
                if(validData(row[0])):
                    names.append(row[0])
            for index in range (1,len(names)):
                path = outputpath +names[index]+'.csv'
                out = csv.writer(open(path, "w"), delimiter=',', quoting=csv.QUOTE_ALL)

    finally:
        print("done")

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
    return [filename for filename in filenames if (filename.endswith(suffix) )]

def findPastFile(path):
    files = find_csv_files()
    files = sorted(files)
    res_list = [i for i, value in enumerate(files) if value == path]
    if(res_list[0]-1 >=0):
        old_path = files[res_list[0]-1]
        return usData + '/' +old_path
    else:
        return 0
if __name__=='__main__':
    createCSV()
    #files = find_csv_files()
   # files = sorted(files)
    #for i in range (1,len(files)):
     #   oldfile = findPastFile(files[i])
     #   files[i] = usData + '/' + files[i]
     #   updateCSV(files[i], oldfile)
