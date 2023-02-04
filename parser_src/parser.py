import json
import argparse

def parse_aguments():
    ap = argparse.ArgumentParser()

    default_inpf = 'new.txt'
    default_delim = ','

    ap.add_argument('-i','--inpfilename', default = default_inpf,
    help=f'Specify a different inpt fille from the deafult "{default_inpf}"')

    ap.add_argument('-d','--delimiter', default = default_delim,
    help = f'Changes the delimiter in input file from the default "{default_delim}"; use "" to input the delimiter')

    return ap.parse_args()

def load_lines(input_file):
    with open(input_file,encoding="UTF-8") as inptf:
        out = inptf.read()
        out_lst = out.splitlines()
        return out_lst

def transfrom_data(data,delimiter):
    out_lst = []
    for line in data:
        line = line.split(delimiter)
        print(line)

        line_dct = {
            'clues': line[:5],
            'answer': line[5].rstrip('\n')
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


def clear_input(input_file):
    with open(input_file,'w') as inpf:
        inpf.write('')

def main():
    agrs = parse_aguments()

    lines = load_lines(agrs.inpfilename)

    if lines == []:
        print('The input file is empty!')
        return
        
    data_dct = transfrom_data(lines,agrs.delimiter)
    addedJsonString = json.dumps(data_dct,indent=4)

    update_json_file(addedJsonString)

    clear_input(agrs.inpfilename)


if __name__ == '__main__':
    main()