var i = 0;
var choice = 0; 
var txt = 'Lorem ipsum typing effect!'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

var app = document.getElementById('demo');

var typewriter = new Typewriter(demo, {
    loop: false
});

function yes()
{
    choice = 0;
    decision();
}

function no()
{
    choice = 1;
    decision(); 
}

function decision()
{
    switch(choice) {
    case 0:
	txt = 'Awesome Lets Get Started... <br> I am going to clean up some stuff and set the mood...';
	typewriter.typeString(txt)
    	    .pauseFor(2500)
	    .deleteAll()
    	    .start();
	removeHeader();

	break;
    case 1:
	txt = 'Oh... just click the yes button to start the game';
	break;
    }


}

function removeHeader()
{
    var header = document.getElementById("oldHeader");
    setTimeout(() => {header.remove(); }, 12000);

    var button = document.getElementById("startButton");
    setTimeout(() => {button.remove(); }, 8000);
    
}
function startGame() {
    typewriter.typeString('We have two options in our game <button onclick= "yes()">Yes</button>')
	.pauseFor(2500)
	.start();
    
    typewriter.typeString('\n and <button onclick= "no()">No</button>')
	.pauseFor(2500)
	.start();

    typewriter.typeString('<br> Do you understand? <br>')
	.pauseFor(2500)
	.start();
    
}
