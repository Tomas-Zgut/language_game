exec:
	pyinstaller --onefile ./adder_src/adder.py


.PHONY: clean_test
clean_test:
	rm -r __pycache__/
	rm -r tests/__pycache__/

test:
	python3 -m unittest -v
	make clean_test