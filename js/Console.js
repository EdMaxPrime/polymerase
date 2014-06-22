function Console(elem) {
    this.element = elem;
    this.activeProcessName = "\\";
    this.activeProcess = undefined;
    this.commandTasks = new Array();
    this.amountLogged = 0;
    this.parser = {
        repeat : function(what, times) {
            var result = "";
            if (typeof what === "string" && typeof times === "number") {
                for(var i = 0; i < times; i++) {
                    result += what;
                }
            } else if (Array.isArray(what) && typeof times === "number") {
                for(var i = 0; i < what.length; i++) {
                    for(var j = 0; j < times; j++) {
                        result += what[i];
                    }
                }
            } else if (Array.isArray(what) === true && Array.isArray(times) === true) {
                for(var w = 0; w < what.length; w++) {
                    for(var i = 0; i < times[w]; i++) {
                        result += what[w];
                    }
                }
            }
            return result;
        },
        conformToLength : function(text, len, filler) {
            text += this.repeat(filler, (len - text.length));
            return text;
        },
        stripHTML : function(str) { // another good one: /<\/?[^>]+(>|$)/g
            var result = str.replace(/&nbsp;/gi, " ").replace(/(<([^>]+)>)/gi, "").replace(/&gt;/gi, ">").replace(/&lt;/gi, "<");
            return result;
        },
        addArray : function(arr) {
            var result = arr[0];
            for(var i = 1; i < arr.length; i++) {
                result += arr[i];
            }
            return result;
        }
    };
    this.children = [];
    this.getChild = function(id) {
        if (this.children.hasOwnProperty(id) === true) {
            return this.children[id];
        } else {
            this.children[id] = {
                real : false,
                childId : id
            };
            return this.children[id];
        }
    }
    this.println = function(msg) {
        console.log(msg);
        this.element.removeChild(this.element.childNodes[this.element.childNodes.length - 1]);
        this.element.innerHTML += msg + "<br>";
        this.element.appendChild(document.createElement("p"));
        this.element.scrollTop = this.element.scrollHeight;
        this.amountLogged++;
    }
    this.addTask = function(action) {
        this.commandTasks.push(action);
    }
    this.setProcess = function(theName, action) {
        if (this.activeProcess === "\\") {
            this.activeProcessName = theName;
            this.activeProcess = action;
            return true;
        } else {
            return false;
        }
    }
    this.removeTask = function(task) {
        this.commandTasks.splice(this.commandTasks.indexOf(task), 1);
    }
    this.exitProcess = function(name) {
        if (typeof name !== 'undefined') {
            if (name === this.activeProcessName) {
                this.activeProcessName = "\\";
                this.activeProcess = undefined;
            }
        } else {
            this.activeProcessName = "\\";
            this.activeProcess = undefined;
        }
    }
    this.supports = function(what) { //returns true if it is supported, otherwise false
        if (what === "println" || what === "error" || what === "warn" || what === "success" || what === "table") {
            return true;
        }
        if (what === "error(msg,id)" || what === "success(mgs,id)" || what === "warn(msg,id)") {
            return true;
        }
        if (what === "commandTasks" || what === "addTask" || what === "commandTasks/preventOthers" || what === "removeTask[task|index]") {
            return true;
        }
        if (what === "activeProcess" || what === "setProcess" || what === "activeProcessName" || what === "exitProcess") {
            return true;
        }
        if (what === "amountLogged" || what === "divStyleLogging" || what === "0.07" || what === 0.07 || what === "chrome 19+") {
            return true;
        }
        return false;
    }
    this.error = function(msg, id) {
        var theId = id? id : this.element.id + "_" + (this.amountLogged + 1);
        this.println("<div style='color:#F1654C;' id='" + theId + "'><b>&gt;&gt;&gt;</b>    " + msg + "</div>");
    }
    this.warn = function(msg, id) {
        var theId = id? id : this.element.id + "_" + (this.amountLogged + 1);
        this.println("<div style='color:#DEE825;' id='" + theId + "'><b>(!)</b>   " + msg + "</div>");
    }
    this.success = function(msg, id) {
        var theId = id? id : this.element.id + "_" + (this.amountLogged + 1);
        this.println("<div style='color:rgb(116, 243, 133);' id='" + theId + "'>" + msg + "</div>");
    }
    this.table = function(data, options) {
        var hr = "-"; //horizontal rule
        var vr = "|"; //vertical rule
        var fixedwidth = 15; //to make this 'undefined'(to use different widths for each column) make this negative in options
        var widths = new Array();
        var longestcolumn = 1; //the length of the longest array in data
        var ve = "[|]"; //Vertical edge
        var he = "="; //Horizontal edge
        var vh = "+"; //Vertical horizontal intersection
        if (options) {
            if (options.hasOwnProperty("horizontalRule") === true) {
                hr = options.horizontalRule;
            }
            if (options.hasOwnProperty("verticalRule") === true) {
                vr = options.verticalRule;
            }
            if (options.hasOwnProperty("fixedwidth") === true) {
                fixedwidth = options.fixedwidth;
            }
        }
        /*Find the width for each column*/
            for(var a = 0; a < data.length; a++) {
                var longest = 0;
                for(var c = 0; c < data[a].length; c++) {
                    var str = this.parser.stripHTML(data[a][c]);
                    if (str.length > longest) {
                        longest = str.length;
                    }
                }
                if(fixedwidth < 0) {widths[a] = longest;}
                else {widths[a] = fixedwidth;}
                if (data[a].length > longestcolumn) {
                    longestcolumn = data[a].length;
                }
            }
        /*Now make sure all rows are the same length*/
        for(var col = 0; col < data.length; col++) {
            for(var row = 0; row < data[col].length; row++) {
                if (data[col][row].length < widths[col]) {
                    data[col][row] = this.parser.conformToLength(data[col][row], widths[col], "&nbsp;");
                }
            }
        }
        /*Now make sure all the columns are the same length*/
        for(var col = 0; col < data.length; col++) {
            if (data[col].length < longestcolumn) {
                for(var left = (longestcolumn - data[col].length); left > 0; left--) {
                    data[col].push(this.parser.repeat(" ", widths[col])); //just fill it with spaces
                }
            }
        }
        /*Now we actually print everything*/
        for(var row = 0; row < data[0].length; row++) {
            var line = ve; //this is what we will be printing
            for(var col = 0; col < data.length; col++) {
                    line += data[col][row];
                    if (col === (data.length - 1)) {
                        line += ve; //vertical edge at the end
                    } else {
                        line += vr; //vertical rule at the end
                    }
            }
            if (row === 0) { //top border.
                this.println(this.parser.repeat(he, ((data.length - 1) * this.parser.stripHTML(vr).length + this.parser.addArray(widths) + 2*this.parser.stripHTML(ve).length)/(this.parser.stripHTML(he).length)));
            }
            this.println(line);
            if (row < (data.length - 1)) {
                this.println(ve + this.parser.repeat(hr, ((data.length - 1) * this.parser.stripHTML(vr).length + this.parser.addArray(widths))/(this.parser.stripHTML(hr).length)) + ve);
            } else { // bottom row
                this.println(this.parser.repeat(he, ((data.length - 1) * this.parser.stripHTML(vr).length + this.parser.addArray(widths) + 2*this.parser.stripHTML(ve).length)/(this.parser.stripHTML(he).length)));
            }
        }
    }
    this.onCommand = function(cmd) {
        if (this.activeProcessName === "\\") {
            var preventOthers = false;
            for(var i = 0; i < this.commandTasks.length && preventOthers === false; i++) {
                if(this.commandTasks[i](cmd) == true) {
                    preventOthers = true;
                }
            }
        } else {
            if (this.activeProcess(cmd) === true) { //if it returns true then we can exit from it
                this.activeProcess = undefined;
                this.activeProcessName = "\\";
            }
        }
    }
    /*Deprecated. Will be removed soon.*/
    this.keyReleased = function(event) {
        var key = event.keyCode? event.keyCode : event.which;
        var charCode = String.fromCharCode(key).toLocaleLowerCase();
        if (event.shiftKey) {
            charCode = charCode.toLocaleUpperCase();
        }
        if (key == 8) {
            event.target.value = event.target.value.substring(0, event.target.value.length-1);
        } else {
            event.target.value += charCode;
        }
        this.println("key Pressed: " + key + event.target.value);
        if (key == 13) {
            this.println("Command sent");
            printer.onCommand(event.target.value);
            event.target.value = "";
            event.target.focus();
        }
    }
}