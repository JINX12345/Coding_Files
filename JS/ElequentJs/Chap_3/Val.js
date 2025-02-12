let safemode = false;  // Declare and initialize
let launchM = function() {
    missileS.launch("now");
};

if (safemode) {
    launchM = function() {
        return "Screw you";
    };
}