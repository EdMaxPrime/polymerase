


function Polymerase(c) {
    this.code = c;
    this.printer = new Console(document.getElementById("console"));
    this.printer.commandTasks.push(syntaxCommand);
    
    this.checkCode = function(languages) {
        if (languages) {
            var codearray = this.code.split("\n");
            this.printer.println("Checking " + codearray.length + " lines of code");
            var response;
            for(var i = 0; i < languages.length; i++) {
                if (this[languages[i]]) {
                    this.printer.println("Checking code with <span style='color:#6DC2ED;'>" + languages[i] + "</span>");
                    this.printer.println("---------------------------");
                    response = this[languages[i]](codearray);
                    if (response.line === codearray.length || codearray.length === 0 || (response.status && response.status === 0)) {
                        this.printer.println("<span style='color:rgb(116, 243, 133);'>Your code is safe!</span>");
                        return;
                    } else if (response.line < codearray.length) {
                        this.printer.println(languages[i] + " has stopped at line "+response.line);
                        codearray.splice(0,response.line);
                    }
                } else {
                    this.printer.error("Polymerase Error: You don\'t have the <span style='color:#6DC2ED;'>" + languages[i] + "</span> module installed.");
                }
            }
            if (codearray.length > 0) {
                var msg = "<a style='cursor:pointer;'>";
                msg += response.error + ": ";
                msg += response.reason;
                msg += " on line:" + response.line + "|column:" + response.column;
                msg += "</a>";
                this.printer.error(msg);
                this.printer.println("<span style='color:#F0BD26;'>" + response.hint + "</span>");
            } else {
                this.printer.println("Your code is perfectly safe.");
            }
        } else {
            //This means they want the languages within the code
        }
    }
}

/*
 *This is our personal command processor for our uses. It has been added to the queu of tasks
 *when we created the "printer" object.
*/
function syntaxCommand(command) {
    if (typeof command=='string') {
        var cmd = command.trim().split(" ");
        if (cmd[0] === "empsc") {
            //add commands here... our root label is "empsc" (EdMaxPrime Syntax Checker)
        }
    }
}