import json
import argparse
import sys
import custom_errors as ce

def read_lines(inp_file:str) -> list[str]:
    """reads the entire 'inp_file' line by line and returns a list of lines"""
    with open(inp_file,"r") as f:
        out:list[str] = f.readlines()
    return out


def write_lines(out_file:str,lines:str) ->None:
    """writes 'lines' to te 'out_file'"""
    with open(out_file,"w") as f:
        f.write(lines)


def read_file(inp_file:str) -> str:
    """reads the entire 'inp_file'"""
    with open(inp_file,"r") as f:
        out:str = f.read()
    return out


def parse_aguments() -> argparse.ArgumentParser:
    """Deals with command line argumetns"""
    ap = argparse.ArgumentParser()

    default_inpf = 'new.txt'
    default_delim = ','

    ap.add_argument('-i','--inpfilename', default = default_inpf,
    help=f'Specify a different inpt fille from the deafult "{default_inpf}"')

    ap.add_argument('-d','--delimiter', default = default_delim,
    help = f'Changes the delimiter in input file from the default "{default_delim}"; use "" to input the delimiter')

    return ap.parse_args()

def load_lines(input_file:str) -> list[str]:
    """loads data from 'input_file'"""
    out_lst:list[str] = read_lines(input_file)

    if len(out_lst) == 0:
        raise ce.FileEmptyError()
    
    return out_lst

def transfrom_data(data:list[str],delimiter:str) -> list[dict]:
    """transforms list of strings to a list of dicts based on a specified delimiter"""
    out_lst:list[dict] = []
    for line in data:
        line_delim:list[str] = line.split(delimiter)

        if len(line_delim) == 1:
            raise ce.DelimiterNotFoundError()
        
        line_dct:dict = {
            'clues': line_delim[:5],
            'answer': line_delim[5].rstrip('\n')
        }   

        out_lst.append(line_dct)
            
    return out_lst

def update_json_file(updatedJsonString:str) -> None:
        """Updates json file"""

        oldJsonString = read_file("page_src/js/cards.JSON")
        newJsonString = f'{oldJsonString[:-2]},\n {updatedJsonString[3:]}'

        write_lines("page_src/js/cards.JSON",newJsonString)


def clear_input(input_file:str) -> None:
    """clears the 'input_file'"""
    write_lines(input_file,"")

def main():
    agrs = parse_aguments()

    try:
        lines = load_lines(agrs.inpfilename)

    except FileNotFoundError:
        print("File not found!")
        sys.exit(1)

    except ce.FileEmptyError:
        print("File was empty")
        sys.exit(2)
    
    try:
        data_dct = transfrom_data(lines,agrs.delimiter)

    except ce.DelimiterNotFoundError:
        print("secified delimiter not found!")
        sys.exit(3)

    addedJsonString = json.dumps(data_dct,indent=4)

    try:
        update_json_file(addedJsonString)
    except FileNotFoundError:
        write_lines('page_src/js/cards.JSON','')
        update_json_file(addedJsonString)

    clear_input(agrs.inpfilename)


if __name__ == '__main__':
    main()