all: Glowing\ Bear.app

Glowing\ Bear.app: Electron.app main.js
	rm -rf Glowing\ Bear.app
	cp -Ra Electron.app Glowing\ Bear.app

	echo 'Set :CFBundleName "Glowing Bear"\nSet :CFBundleExecutable "Glowing Bear"\nSet :CFBundleDisplayName "Glowing Bear"\nSet :CFBundleIconFile "app/assets/img/glowing-bear.icns"\nSave' | /usr/libexec/PlistBuddy Glowing\ Bear.app/Contents/Info.plist
	mv Glowing\ Bear.app/Contents/MacOS/Electron Glowing\ Bear.app/Contents/MacOS/Glowing\ Bear

	mv Glowing\ Bear.app/Contents/Frameworks/Electron\ Helper.app Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper.app
	mv Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper.app/Contents/MacOS/Electron\ Helper Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper.app/Contents/MacOS/Glowing\ Bear\ Helper
	echo 'Set :CFBundleName "Glowing Bear Helper"\nSave' | /usr/libexec/PlistBuddy Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper.app/Contents/Info.plist

	mv Glowing\ Bear.app/Contents/Frameworks/Electron\ Helper\ NP.app Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper\ NP.app
	mv Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper\ NP.app/Contents/MacOS/Electron\ Helper\ NP Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper\ NP.app/Contents/MacOS/Glowing\ Bear\ Helper\ NP
	echo 'Set :CFBundleName "Glowing Bear Helper NP"\nSave' | /usr/libexec/PlistBuddy Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper\ NP.app/Contents/Info.plist

	mv Glowing\ Bear.app/Contents/Frameworks/Electron\ Helper\ EH.app Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper\ EH.app
	mv Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper\ EH.app/Contents/MacOS/Electron\ Helper\ EH Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper\ EH.app/Contents/MacOS/Glowing\ Bear\ Helper\ EH
	echo 'Set :CFBundleName "Glowing Bear Helper EH"\nSave' | /usr/libexec/PlistBuddy Glowing\ Bear.app/Contents/Frameworks/Glowing\ Bear\ Helper\ EH.app/Contents/Info.plist

	mkdir Glowing\ Bear.app/Contents/Resources/app
	cp -Ra 3rdparty assets css directives js *.html *.js *.json Glowing\ Bear.app/Contents/Resources/app
	cp -a assets/img/glowing-bear.icns Glowing\ Bear.app/Contents/Resources/atom.icns

Electron.app: electron-v0.29.2-darwin-x64.zip
	unzip electron-v0.29.2-darwin-x64.zip 'Electron.app/**'

electron-v0.29.2-darwin-x64.zip:
	curl -L -O https://github.com/atom/electron/releases/download/v0.29.2/electron-v0.29.2-darwin-x64.zip

install: Glowing\ Bear.app
	rm -rf /Applications/Glowing\ Bear.app
	cp -Ra Glowing\ Bear.app /Applications/
