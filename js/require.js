var ipc = function(){};
ipc.send = (function(varname, value) {
	console.log(varname + ": " + value);
});

function require(thing) {
	if(thing == "ipc") return ipc;
}
