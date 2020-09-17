var slideImages = [],
    selectorBtns = [],
    progBars = [],
    numSlides,
    current = 0, target = 1,
    onDemand = false, //slide change on user demand/click
    tl, //timeline
    emptyProgBarsTimer;


window.addEventListener("load", initialise);

function initialise()
{	
	getSlides();
	createSelectorBtns();
	createProgBarTimeline();
	current = 0;
	target = 1;
		
  /* 
  Most browsers now support element.classList.add()
  & element.classList.remove()
  
  check browser support for your project needs:
  http://caniuse.com/#search=classlist
  */
	selectorBtns[current].classList.add('selected-btn');
	updateProgBars();
}


function getSlides()
{
	if(document.getElementsByClassName)
	{
		slideImages = document.getElementsByClassName("slide");
	}
	else //IE8
	{
		slideImages = document.querySelectorAll(".slide");
	}
  
  numSlides = slideImages.length;
}


function createSelectorBtns()
{
	var btnsWrapper = document.getElementById('btns-wrapper');
  
	for(var i=0; i<numSlides; i++)
	{
		var selectorID = "selector"+i;
		var progBarID = "prog-bar"+i;
   
    var btn = document.createElement("button");
		btn.classList.add('selector-btn');
		btn.id = selectorID;
		
		if(i==numSlides-1)
		{
			//no prog-bar for last btn
			btnsWrapper.appendChild(btn);
		}
		else
		{	
			var progBar = document.createElement("div");
			progBar.classList.add('prog-bar');
			
			var progBarSpan = document.createElement("span");
			progBarSpan.id = progBarID;
			progBarSpan.style.width = '0';
			
      btnsWrapper.appendChild(btn);
			btnsWrapper.appendChild(progBar);
			progBar.appendChild(progBarSpan);
      progBars[i] = progBarSpan;
		}
    
    selectorBtns[i] = btn;
		selectorBtns[i].addEventListener('click', goToSlide);
		selectorBtns[i].slideIndex = i;
	}
}


function createProgBarTimeline()
{
	tl = new TimelineMax();
	for(var i=0; i<numSlides-1; i++)
	{
		var label = "index"+i;
		tl.to(progBars[i], 5, {width:"100%", ease:Linear.easeNone}, label);
	}
	//add a label at the end for easy reference (tween to label)
	var lastLabel = "index"+(numSlides-1);
	tl.addLabel(lastLabel);
}

/*==END of initialising==*/



/*===Timers & Updates==*/

function updateProgBars()
{	
	if(target==0 && !onDemand)
	{
		//empty ALL after 5 sec
		emptyProgBarsTimer = setTimeout(emptyAllProgBars, 5000);
	}
	else if(target!=numSlides)
	{
		var targetLabel = "index"+target;
		tl.tweenTo(targetLabel, {onComplete: changeSlide});
	}
}


function updateIndex()
{
	selectorBtns[current].classList.remove('selected-btn');
	current = target;
  
	if(current == numSlides-1)
	{
		target=0;
	}
	else
	{
		target += 1;
	}
	
	selectorBtns[current].classList.add('selected-btn');
	onDemand = false;
	
	updateProgBars();
}


function changeSlide()
{
	tl.timeScale(1); //reset speed
	fadeIn(slideImages[target]);
	fadeOut(slideImages[current]);
	updateIndex();
}


function goToSlide(e)
{
	if(current!=e.target.slideIndex)
	{
		onDemand = true;
		clearTimeout(emptyProgBarsTimer);
		
		target = e.target.slideIndex;
		var targetLabel = "index"+(target);
		
		tl.timeScale(20);
		tl.tweenTo(targetLabel, {onComplete:changeSlide});
	}
}


function fadeOut(e)
{
	e.classList.remove('fade-in');
	e.classList.add('fade-out');
}

function fadeIn(e) 
{
	e.classList.remove('fade-out');
	e.classList.add('fade-in');
}

function emptyAllProgBars()
{
	var targetLabel = "index"+0;
	tl.timeScale(20);
	tl.tweenTo(targetLabel, {onComplete:changeSlide});
}
