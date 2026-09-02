all: bundler package

package: bundler
	echo "Packaging bundle..."
	./bundle

bundler:
	echo "Building bundler..."
	pyinstaller --onefile --noconfirm --clean bundle.py
	mv dist/bundle ./
	rm -rf build dist __pycache__
