exec:
	-rm ./adder.exe
	pyinstaller --onefile  ./adder.py
	make clean_exec

.PHONY: clean_test clean_exec
clean_test:
	rm -r __pycache__/
	rm -r tests/__pycache__/

clean_exec:
	mv ./dist/adder.exe ./adder.exe
	rm -r ./build/ ./__pycache__/ ./dist/
	rm ./adder.spec


test:
	python3 -m unittest -v
	make clean_test