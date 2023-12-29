# fivem-resource-file-watcher
this resource will attempt to restart any resource when you edit something in any resource

any time you add a new resource or remove a resource or edit something in any resource it will refresh and restart only if resource is started if not started it will tell you to start the resource before it starts working



make sure you edit your config permissions and add these lines
```cfg
# this lets the script run the commands needed to restart / start / stop / refresh
add_ace resource.auto_restart command.restart allow
add_ace resource.auto_restart command.refresh allow
add_ace resource.auto_restart command.start allow
add_ace resource.auto_restart command.stop allow
```

you can also edit the server.js file to enable or disable the script 
`enabled_script = true` this will turn script on or off
`attempt_to_run = false` this will attempt to run any scripts that not already running that you edited

## WARNING THIS REASOURCE IS FOR DEVELOPMENT PURPOSE ONLY I DO NOT RECOMMEND USING THIS IN A LIVE PRODUCTION ENVIRONMENT

feel free to use my code and edit to your needs but please make sure you credit me for my work thanks and hope this helps :)

any questions feel free to ask or create an issue on GitHub and i will be happy to help
