var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function() {
	var mainWindow = new BrowserWindow({width: 1280, height: 800, 'min-width': 1024, 'min-height': 600});
	mainWindow.loadUrl('file://' + __dirname + '/index.html');
	mainWindow.on('closed', function() {
		app.quit();
	});
});
