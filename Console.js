function Console(elem) {
    this.element = elem;
    this.activeProcess = "";
    this.commandTasks = new Array();
    this.amountLogged = 0; //deprecated
    this.println = function(msg) {
        console.log(msg);
        this.element.removeChild(this.element.childNodes[this.element.childNodes.length - 1]);
        this.element.innerHTML += msg + "<br>";
        this.element.appendChild(document.createElement("p"));
        this.element.scrollTop = this.element.scrollHeight;
        this.amountLogged++;
    }
    this.error = function(msg) {
        this.println("<span style='color:#F1654C;'><b>&gt;&gt;&gt;</b>    " + msg + "</span>")
    }
    this.warn = function(msg) {
        this.println("<span style='color:#DEE825;'><b>(!)</b>   " + msg + "</span>");
    }
    this.onCommand = function(cmd) {
        var preventDefault = false;
        for(var i = 0; i < this.commandTasks.length; i++) {
            if(this.commandTasks[i](cmd) == true) {
                preventDefault = true;
            }
        }
    }
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