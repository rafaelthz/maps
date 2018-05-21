import csv
import math

# Distances are measured in miles.
# Longitudes and latitudes are measured in degrees.
# Earth is assumed to be perfectly spherical.

earth_radius = 3960.0
degrees_to_radians = math.pi/180.0
radians_to_degrees = 180.0/math.pi

def change_in_latitude(miles):
    "Given a distance north, return the change in latitude."
    return (miles/earth_radius)*radians_to_degrees

def change_in_longitude(latitude, miles):
    "Given a latitude and a distance west, return the change in longitude."
    # Find the radius of a circle around the earth at given latitude.
    r = earth_radius*math.cos(latitude*degrees_to_radians)
    return (miles/r)*radians_to_degrees

# Read in raw data from csv
rawData = csv.reader(open('./data/buses_by_time.csv', 'r'), dialect='excel')


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

{ "type" : "FeatureCollection",
   "features" : [
   '''


# loop through the csv by row skipping the first
iter = 0
for row in rawData:
   # iter += 1
   # if iter >= 2:
   id = row[0]
   lat = change_in_latitude(float(row[2]))
   lon = change_in_longitude(lat, float(row[1]))
   instant = row[3]
   if (instant=="5"):
     break;
   # output += template % (row[0], row[2], row[1], row[3], row[4])
   output += template % (str(lon), str(lat), id, instant)

# the tail of the geojson file
output += \
   ''' \
   ]

}
   '''


# opens an geoJSON file to write the output
outFileHandle = open("./data/teste.geojson", "w")
outFileHandle.write(output)
outFileHandle.close()