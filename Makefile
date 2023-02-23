exec:
	pyinstaller --onefile ./adder_src/adder.py

test:
	cd ./adder_src/
	python3 -m unittest -v
	cd ..

add: test
	git add -A