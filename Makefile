all: Glowing-Bear.app

Glowing-Bear.app: Electron.app main.js
	rm -rf Glowing-Bear.app
	cp -Ra Electron.app Glowing-Bear.app
	echo 'Set :CFBundleDisplayName "Glowing Bear"\nSet :CFBundleIconFile "app/assets/img/glowing-bear.icns"\nSave' | /usr/libexec/PlistBuddy Glowing-Bear.app/Contents/Info.plist
	mkdir Glowing-Bear.app/Contents/Resources/app
	cp -Ra 3rdparty assets css directives index.html js main.js package.json Glowing-Bear.app/Contents/Resources/app

Electron.app: electron-v0.29.2-darwin-x64.zip
	unzip electron-v0.29.2-darwin-x64.zip 'Electron.app/**'

electron-v0.29.2-darwin-x64.zip:
	curl -L -O https://github.com/atom/electron/releases/download/v0.29.2/electron-v0.29.2-darwin-x64.zip
