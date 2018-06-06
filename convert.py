import csv
from pyproj import Proj, transform
import sys

# Read in raw data from csv
rawData = csv.reader(open('./data/geolife2.csv', 'r'), dialect='excel')


# the template. where data from the csv will be formatted to geojson
template = \
   ''' \
   { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [%s, %s]},
       "properties" : {"id": "%s", "instant": "%s"}
       },
   '''


# the head of the geojson file
output = \
   ''' \
var data2 = { "type" : "FeatureCollection",
   "features" : [
   '''

output2 = \
   ''' \
var dataLines = { "type" : "FeatureCollection",
   "features" : [
   '''


templateLines= \
   ''' \
   { "type" : "Feature",
       "geometry" : {
           "type" : "LineString",
           "coordinates" : ['''

output2 += templateLines

coordinates='''[%s, %s]'''

final=''']},
       "properties" : {"id": "%s"}
       },'''

# loop through the csv by row skipping the first
i = 0
anterior=0
for row in rawData:
  if(row[0]==id):
    output2+=","
  id = row[0]
  lon = float(row[1])
  lat = float(row[2])
  instant = row[3]


  inProj = Proj(init='epsg:3857')
  outProj = Proj(init='epsg:4326')
  x,y = transform(inProj, outProj, lon, lat)

  # if (instant=="10"):
  #   break
  
  output += template % (str(x), str(y), id, instant)

  if(i==0 or (anterior==id)):
    output2 += coordinates % (str(x), str(y))
    #output2 += ","
  else:
    output2 += final % id
    output2 += templateLines
    output2 += coordinates % (str(x), str(y))
    #output2 += ","

  anterior=id

  i+=1



# the tail of the geojson file
output += \
   ''' \
   ]

}
   '''

output2 += final % id
output2 += \
   ''' \
   ]

}
   '''


# opens an geoJSON file to write the output
outFileHandle = open("./data/teste.geojson", "w")
outFileHandle.write(output)
outFileHandle.close()

outFileHandle = open("./data/testeLines.geojson", "w")
outFileHandle.write(output2)
outFileHandle.close()