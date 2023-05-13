import json
import pandas as pd


print('Attempting to get latest materials database...')
materials = pd.read_csv('https://www.fuzzwork.co.uk/dump/latest/industryActivityMaterials.csv')
materials = materials[materials['activityID']==1]
materials.drop(['activityID'], axis = 1, inplace = True)
materials_list = materials.values.tolist()

print('Attempting to get latest products database...')
products = pd.read_csv('https://www.fuzzwork.co.uk/dump/latest/industryActivityProducts.csv')
products = products[products['activityID']==1]
products.drop(['activityID'], axis = 1, inplace = True)
products_list = products.values.tolist()

output = {"blueprints": []}


def get_or_create_bp(id):
    for item in output['blueprints']:
        if item['blueprintID'] == id:
            print(item)
            return item
    new_item = {'blueprintID': id, 'materials': [], 'products': []}
    output['blueprints'].append(new_item)
    return new_item

for row in materials_list:
    bp = get_or_create_bp(row[0])
    bp["materials"].append({row[1]: row[2]})
for row in products_list:
    bp = get_or_create_bp(row[0])
    bp["products"].append({row[1]: row[2]})

with open("tools/industryBlueprints.json", "w") as outfile:
    json.dump(output, outfile, indent=4)