import json


def load_lines():
   with open('new.txt',encoding="UTF-8") as inptf:
    out = inptf.read()
    out_lst = out.splitlines()
    return out_lst

def transfrom_data(data):
    out_lst = []
    for line in data:
        line = line.split(',')
        line_dct = {
            'clues': line[:5],
            'answer': line[5],
            'translate': line[6].rstrip('\n')
        }

        out_lst.append(line_dct)

    return out_lst

def update_json_file(updatedJsonString):
        with open('page_src/js/cards.JSON','r') as f_old:
            oldJsonString = f_old.read()

        if oldJsonString == '':
            newJsonString = updatedJsonString
        else :
            newJsonString = f'{oldJsonString[:-2]},\n {updatedJsonString[3:]}'

        with open('page_src/js/cards.JSON','w') as f_new:
            f_new.write(newJsonString)
def clear_input():
    with open('new.txt','w') as inpf:
        inpf.write('')

def main():
    lines = load_lines()

    if lines == []:
        print('Use the "new" file!')
        return
        
    data_dct = transfrom_data(lines)
    addedJsonString = json.dumps(data_dct,indent=4)

    update_json_file(addedJsonString)

    clear_input()


if __name__ == '__main__':
    main()