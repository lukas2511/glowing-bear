'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');
const Menu = require('menu');

app.on('browser-window-focus', function(e, w) {
	w.webContents.executeJavaScript('setTimeout(function() { document.getElementById("glowingbear").focus(); }, 0);');
	w.webContents.executeJavaScript('setTimeout(function() { document.getElementById("glowingbear").executeJavaScript("document.getElementById(\\"sendMessage\\").focus();") }, 0);');
});

app.on('ready', function() {
	if (Menu.getApplicationMenu())
		return;

	var template;
	if (process.platform == 'darwin') {
		template = [
			{
				label: 'Electron',
				submenu: [
					{
						label: 'About Electron',
						selector: 'orderFrontStandardAboutPanel:'
					},
					{
						type: 'separator'
					},
					{
						label: 'Services',
						submenu: []
					},
					{
						type: 'separator'
					},
					{
						label: 'Hide Electron',
						accelerator: 'Command+H',
						selector: 'hide:'
					},
					{
						label: 'Hide Others',
						accelerator: 'Command+Shift+H',
						selector: 'hideOtherApplications:'
					},
					{
						label: 'Show All',
						selector: 'unhideAllApplications:'
					},
					{
						type: 'separator'
					},
					{
						label: 'Quit',
						accelerator: 'Command+Q',
						click: function() { app.quit(); }
					},
				]
			},
			{
				label: 'Edit',
				submenu: [
					{
						label: 'Undo',
						accelerator: 'Command+Z',
						selector: 'undo:'
					},
					{
						label: 'Redo',
						accelerator: 'Shift+Command+Z',
						selector: 'redo:'
					},
					{
						type: 'separator'
					},
					{
						label: 'Cut',
						accelerator: 'Command+X',
						selector: 'cut:'
					},
					{
						label: 'Copy',
						accelerator: 'Command+C',
						selector: 'copy:'
					},
					{
						label: 'Paste',
						accelerator: 'Command+V',
						selector: 'paste:'
					},
					{
						label: 'Select All',
						accelerator: 'Command+A',
						selector: 'selectAll:'
					},
				]
			},
			{
				label: 'View',
				submenu: [
					{
						label: 'Reload',
						accelerator: 'Command+R',
						click: function() {
							var focusedWindow = BrowserWindow.getFocusedWindow();
							if (focusedWindow)
								focusedWindow.reload();
						}
					},
					{
						label: 'Toggle Full Screen',
						accelerator: 'Ctrl+Command+F',
						click: function() {
							var focusedWindow = BrowserWindow.getFocusedWindow();
							if (focusedWindow)
								focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
						}
					},
					{
						label: 'Toggle Developer Tools',
						accelerator: 'Alt+Command+I',
						click: function() {
							var focusedWindow = BrowserWindow.getFocusedWindow();
							if (focusedWindow)
								focusedWindow.toggleDevTools();
						}
					},
				]
			},
			{
				label: 'Window',
				submenu: [
					{
						label: 'Minimize',
						accelerator: 'Command+M',
						selector: 'performMiniaturize:'
					},
					{
						label: 'Close',
						accelerator: 'Command+W',
						selector: 'performClose:'
					},
					{
						type: 'separator'
					},
					{
						label: 'Bring All to Front',
						selector: 'arrangeInFront:'
					},
				]
			}
		];
	} else {
		template = [
			{
				label: '&File',
				submenu: [
					{
						label: '&Open',
						accelerator: 'Ctrl+O',
					},
					{
						label: '&Close',
						accelerator: 'Ctrl+W',
						click: function() {
							var focusedWindow = BrowserWindow.getFocusedWindow();
							if (focusedWindow)
								focusedWindow.close();
						}
					},
				]
			},
			{
				label: '&View',
				submenu: [
					{
						label: '&Reload',
						accelerator: 'Ctrl+R',
						click: function() {
							var focusedWindow = BrowserWindow.getFocusedWindow();
							if (focusedWindow)
								focusedWindow.reload();
						}
					},
					{
						label: 'Toggle &Full Screen',
						accelerator: 'F11',
						click: function() {
							var focusedWindow = BrowserWindow.getFocusedWindow();
							if (focusedWindow)
								focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
						}
					},
					{
						label: 'Toggle &Developer Tools',
						accelerator: 'Alt+Ctrl+I',
						click: function() {
							var focusedWindow = BrowserWindow.getFocusedWindow();
							if (focusedWindow)
								focusedWindow.toggleDevTools();
						}
					},
				]
			}
		];
	}

	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
	var mainWindow = new BrowserWindow({width: 1280, height: 800, 'min-width': 1024, 'min-height': 600, 'web-security': false, 'java': false});
	mainWindow.loadUrl('file://' + __dirname + '/start.html');
	ipc.on('badge', function(event, arg) {
		app.dock.setBadge(String(arg));
	});
	mainWindow.on('devtools-opened', function() {
		mainWindow.webContents.executeJavaScript("document.getElementById('glowingbear').openDevTools();");
	});

	mainWindow.on('closed', function() {
		app.quit();
	});
});
