

var printer = new Console(document.getElementById("console"));


function Polymerase(c) {
    this.code = c;
    this.VERSION = 0.015;
    this.modules = {
        /*
        * //Example:
        mylanguage : {
            polymerase_version : 0.015,
            version : 0.07,
            console_version : 0.03,
            description : "Test",
            author : "Me",
            src : "http://mywebsite.com/mylanguage.polymerase.js"
            outdated : function() {
                if(printer.supports("println")) {
                    return true; //we can continue
                } else {
                    return false; //we are too outdated
                }
            },
            checkCode : function(arg1) { //arguments are optional
                // code here...
            }
        }
        */
        
    };
    
    this.checkCode = function(languages) {
        if (languages) {
            var codearray = this.code.split("\n");
            printer.println("Checking " + codearray.length + " lines of code");
            var response;
            for(var i = 0; i < languages.length; i++) {
                if (this[languages[i]]) {
                    printer.println("Checking code with <span style='color:#6DC2ED;'>" + languages[i] + "</span>");
                    printer.println("---------------------------");
                    response = this[languages[i]](codearray);
                    if (response.line === codearray.length || codearray.length === 0 || (response.status && response.status === 0)) {
                        printer.success("Your code is safe!");
                        return;
                    } else if (response.line < codearray.length) {
                        printer.println(languages[i] + " has stopped at line "+response.line);
                        codearray.splice(0,response.line);
                    }
                } else {
                    printer.error("Polymerase Error: You don\'t have the <span style='color:#6DC2ED;'>" + languages[i] + "</span> module installed.");
                }
            }
            if (response === undefined || response.status === "") {
                var msg = "<a style='cursor:pointer;'>";
                msg += response.error + ": ";
                msg += response.reason;
                msg += " on line:" + response.line + "|column:" + response.column;
                msg += "</a>";
                printer.error(msg);
                printer.println("<span style='color:#F0BD26;'>" + response.hint + "</span>");
            } else {
                printer.println("Your code is perfectly safe.");
            }
        } else {
            //This means they want the languages within the code
        }
    }
}
Polymerase.VERSION = 0.017
/*
*This is our personal command processor for our uses. It has been added to the queu of tasks
*when we created the "printer" object.
*/
Polymerase.polymeraseCommand = function(command) { //global public static method of our class
    if (typeof command=='string') {
        var cmd = command.trim().split(" ");
        if (cmd[0] === "pms") {
            //add commands here... our root label is "pms" (PolyMeraSe)
            if (cmd.length === 1) { //General Info
                printer.println("<span style='color:yellow;'>Polymerase</span> syntax checker <span style='color:#EEB8A9'>v" + Polymerase.VERSION + "</span>&nbsp;made by EdMaxPrime");
                printer.println(printer.parser.repeat("-", 50));
                printer.println("");
                return true;
            }
        }
    }
    return false;
}
printer.addTask(Polymerase.polymeraseCommand);