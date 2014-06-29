

var printer = new Console(document.getElementById("console"));


function Polymerase(c) {
    var code = c;
    this.VERSION = 0.017;
    this.m = {
        
    };
    
    this.checkCode = function(language, options) {
        if (language) {
            var codearray = code.split("\n");
            printer.println("Checking " + codearray.length + " lines of code");
            var response;
                if (this.m[language] !== undefined) {
                    printer.println("Checking code with <span style='color:#6DC2ED;'>" + language + "</span>");
                    printer.println("---------------------------");
                    try {
                    response = this.m[language].checkCode(codearray, options);
                    } catch(err) {
                        console.error(err);
                        printer.error("[Polymerase] Internal Error: Something went wrong within the syntax checker itself. Ironic, isn't it?");
                        printer.warn(err);
                        return;
                    }
                    if (response.status === 0) {
                        printer.success("Your code is safe!");
                        return;
                    } else if (response.line < codearray.length || response.status < 0) {
                        printer.println(language + " has stopped at line "+response.line + "<br>Up until that line your code is safe");
                        codearray.splice(0,response.line);
                    } else {
                        var msg = "<a style='cursor:pointer;'>";
                        msg += response.error + ": ";
                        msg += response.reason;
                        msg += " on line:" + response.line + "|column:" + response.column;
                        msg += "</a>";
                        printer.error(msg);
                        printer.println("<span style='color:#F0BD26;'>" + response.hint + "</span>");
                    }
                } else {
                    printer.error("Polymerase Error: You don\'t have the <span style='color:#6DC2ED;'>" + language + "</span> module installed.");
                }
        } else {
            printer.error("[Polymerase] Command Error: You did not specify a language to be used.");
        }
    }
}
Polymerase.VERSION = 0.017;
Polymerase.addMod = function(theName, obj) {
    if (Polymerase.prototype.m.hasOwnProperty(theName)) {
        return false;
    } else {
        Polymerase.prototype.m[theName] = obj;
        return true;
    }
}
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
                printer.println("<span style='color:yellow;'>pms</span> - Lists the commands");
                printer.println("<span style='color:yellow;'>pms add &lt;arg1&gt;</span> - Adds a module to Polymerase, <span style='color:#EEB8A9'>arg1</span> is the url of the javascript file");
                printer.println("<span style='color:yellow;'>pms check arg1 arg2</span> - Checks the code, replace <span style='color:#EEB8A9'>arg1</span> with the language and <span style='color:#EEB8A9'>arg2</span> with the code");
                printer.println("<span style='color:yellow;'>pms help arg1</span> - Replace <span style='color:#EEB8A9'>arg1</span> with a polymerase command and you will get the help for it");
                printer.println("<span style='color:yellow;'>pms remove arg1</span> - Replace <span style='color:#EEB8A9'>arg1</span> with the name of the module to be removed, not its url");
                printer.println("<span style='color:yellow;'>pms supports arg1</span> - Says whether or not this version supports the feature. <span style='color:#EEB8A9'>Arg1</span> is the feature you are checking for");
                printer.println("<span style='color:yellow;'>pms version</span> - Gets the polymerase version and changelog");
                return true;
            }
            else if (cmd.length === 2) {
                if (cmd[1] === "add") {
                    printer.error("[Polymerase] Command Error: You forgot the url of the file. Use as \"<span style='color:#F1834C;'>pms add &lt;yourURL&gt;</span>\", click or type \"<a style='color:#F1834C;cursor:pointer;' onclick='printer.onCommand(\"pms help add\")'>pms help add</a>\" for help on this command");
                }
                if (cmd[1] === "check") {
                    printer.error("[Polymerase] Command Error: Use as \"<span style='color:#F1834C;'>pms check &lt;whichLanguage&gt; &lt;theCode&gt;</span>\", click or type \"<a style='color:#F1834C;cursor:pointer;' onclick='printer.onCommand(\"pms help check\")'>pms help check</a>\" for help on this command");
                }
            }
            else if (cmd.length == 3) {
                if (cmd[1] === "help") {
                    if (cmd[2] === "add") {
                        printer.println("[Polymerase] Type \"<span style='color:#F1834C;'>pms add&nbsp;</span>\" followed by the url(including http://) of your javascript file<br>This will attatch the script to this page and any polymerase modules within will be added");
                    }
                    else if (cmd[2] === "check") {
                        printer.println("[Polymerase] Type \"<span style='color:#F1834C;'>pms check&nbsp;</span>\" followed by the name of the module to be used, then a space, then the code.<br>If you wish to pass parameters to your language, use \"<span style='color:#F1834C;'>pms add &lt;yourLanguage&gt; -arg &lt;yourCode&gt;</span>\"<br>" +
                                        "But you should replace '&lt;yourLanguage&gt;' with the language and '&lt;yourCode&gt;' with the code. When you press enter you will get a prompt for your arguments. They should be comma (,) delimeted. Press enter when you finish or  if you don't want to continue press 'Exit Process' in the console.");
                    }
                }
                else if (cmd[1] === "check") {
                    printer.error("[Polymerase] Command Error: There is no code present, you forgot the fourth argument. Click or type \"<a style='color:#F1834C;cursor:pointer;' onclick='printer.onCommand(\"pms help check\")'>pms help check</a>\" for help.");
                }
                else if (cmd[1] === "add") {
                    var scpt = document.createElement("script");
                    scpt.setAttribute("src", cmd[2]);
                    document.body.appendChild(scpt);
                }
            }
            else if (cmd.length >= 4) {
                if (cmd[1] === "check") {
                    if (cmd[2] !== "" && cmd[2] !== undefined) {
                        if (cmd[3] !== "" && cmd[3] !== undefined) {
                            cmd = cmd.slice(3); //remove pms check <lang>
                            printer.println(cmd.join(" "));
                            new Polymerase(cmd.join(" ")).checkCode([cmd[2]]);
                        } else {
                            printer.error("[Polymerase] Command Error: There is no code present, your forgot the fourth argument. Click or type \"<a style='color:#F1834C;cursor:pointer;' onclick='printer.onCommand(\"pms help check\")'>pms help check</a>\" for help.");
                        }
                    } else {
                        printer.onCommand("pms check"); //Give the same "no language" error
                    }
                }
            }
        }
    }
    return false;
}
printer.addTask(Polymerase.polymeraseCommand);