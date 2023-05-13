import json
import pandas as pd


print('Attempting to get latest Type IDs database...')
types = pd.read_csv('https://www.fuzzwork.co.uk/dump/latest/invTypes.csv')
types.drop(['iconID', 'soundID', 'graphicID'], axis=1, inplace=True)
types = types.fillna('')
types[['basePrice', 'marketGroupID', 'raceID']] = types[['basePrice', 'marketGroupID', 'raceID']].apply(pd.to_numeric, errors='coerce')

item_list = types.to_dict(orient='records')

print(type(item_list[0]['raceID']))
print(item_list[0]['raceID'])

output = {'typeids': item_list}

with open("tools/typeIDs.json", "w") as outfile:
    json.dump(output, outfile, indent=4)