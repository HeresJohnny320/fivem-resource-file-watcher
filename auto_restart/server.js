const path = require('path');

var enabled_script = true;
var attempt_to_run = false;

fs.watch("./resources", {  recursive: true}, function (event, filename) {
	if (filename == null) {
		return
	}

	const pathParts = filename.split(path.sep);

	console.log("REFRESHING RESOURCES LIST")
	ExecuteCommand("refresh")

	if (event === 'change' && filename) {
		if (enabled_script) {
			let foldersToSkip = 0

			// If the folder starts with a open bracket, its clearly not a resource. Skip it until you find the actual resource.
			for (let i = 0; i < pathParts.length - 1; i++) {
				if (pathParts[i][0] == "[") {
					foldersToSkip++
				} else {
					break
				}
			}

			let resourceName = pathParts[foldersToSkip]

			// Do not restart yourself
			if (resourceName == GetCurrentResourceName()) {
				console.error("Resource changed is self ('auto_restart').\n\t      Ignoring.")
			} else {
				// If it's started then restart it.
				if (GetResourceState(resourceName) == 'started' || GetResourceState(resourceName) == 'starting' || GetResourceState(resourceName) == 'running') {
					console.debug("Resource named: '" + resourceName + "' was changed.\n\t      Path: '" + filename + "'\n\t      Restarted.");
					ExecuteCommand("restart " + resourceName)
				// If it's stopped, then either start it, or give a warning that it stopped and must be started manually.
				} else if (GetResourceState(resourceName) == 'stopped' || GetResourceState(resourceName) == 'stopping') {
					if (attempt_to_run) {
						console.warn("Attempting to start resource: '" + resourceName + "'")
						ExecuteCommand("start " + resourceName)
					} else {
						console.warn("Resource named: " + resourceName + " is not running.\n\t      Please start it with 'start " + resourceName + "' to run the resource.\n\t      Ignoring.")
					}
				} else {
					console.error("Resource named: '" + resourceName + "' is uninitialized/unknown/cannot be found!\n\t      Ignoring.")
				}
			}
		}
	}
});
