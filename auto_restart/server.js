const path = require('path');
var enabled_script = true;
var attempt_to_run = false;
    fs.watch("./resources", {  recursive: true}, function (event,filename) {
        ExecuteCommand("refresh") 
        console.log("REFRESHING RESOURCES LIST")
        const pathParts = filename.split(path.sep); 
    if (event === 'change' && filename) {
        if(enabled_script){
            if(pathParts[0] == GetCurrentResourceName()){
                console.error("CANT RESTART ITSELF OTHERWISE I CRASH SERVER")
            }else{
                if(GetResourceState(pathParts[0]) == 'started' || GetResourceState(pathParts[0]) == 'starting' || GetResourceState(pathParts[0]) == 'running'){
                console.debug("Resource Named:"+pathParts[0]+" Has Made A Change, fullpath:"+filename);
                ExecuteCommand("restart "+pathParts[0]) 
                }else if(GetResourceState(pathParts[0]) == 'stopped' || GetResourceState(pathParts[0]) == 'stopping'){
                    if(attempt_to_run){
                        console.warn("Attempting To Start Resource:"+pathParts[0])
                        ExecuteCommand("start "+pathParts[0])
                    }else{
                        console.warn("Resource Named:"+pathParts[0]+" Is Not Running Please Start It With 'start "+pathParts[0]+"' To Run The Resource")
                    }
                }else{
                    console.error("Resource Named:"+pathParts[0]+" Is uninitialized or unknown")
                }
            }
        }
    }
  });

