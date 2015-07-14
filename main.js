var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

app.on('ready', function() {
	var mainWindow = new BrowserWindow({width: 1280, height: 800, 'min-width': 1024, 'min-height': 600});
	mainWindow.loadUrl('file://' + __dirname + '/index.html');
	ipc.on('badge', function(event, arg) {
		app.dock.setBadge(String(arg));
	});
	mainWindow.on('closed', function() {
		app.quit();
	});
});
