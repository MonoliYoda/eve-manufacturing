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
            return item
    new_item = {'blueprintID': id, 'materials': [], 'products': {}}
    output['blueprints'].append(new_item)
    return new_item

for row in materials_list:
    bp = get_or_create_bp(row[0])
    bp["materials"].append({'typeid': row[1], 'quantity': row[2]})
for row in products_list:
    bp = get_or_create_bp(row[0])
    bp["products"] = {'typeid': row[1], 'quantity': row[2]}

def filterer(row):
    if row['products'] == {} or row['materials'] == []:
        print('Found One!')
        print(row)
        return False
    return True
print('Filtering invald blueprints...')
filtered = list(filter(filterer, output['blueprints']))
print('Final blueprints:')
print(len(filtered))

def split_list(item_list, elems):
    for i in range(0, len(item_list), elems):
        yield item_list[i:i + elems]

split = list(split_list(filtered, 1000))
print('Split into {} chunks.'.format(len(split)))
for idx, chunk in enumerate(split):
    with open('tools/industryBlueprints{}.json'.format(idx), "w") as outfile:
        json.dump(chunk, outfile, indent=4)