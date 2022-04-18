 let hasLoaded = 0;
 let howManyFish
 function hideSections(){
 document.querySelector('.item').classList.add("hidden")
 document.querySelector('.loadwrap').classList.remove("hidden")
 }
let theCurrentName
document.querySelector('.hero').classList.remove('on')

function checkForClick(click){
    resizeHeight()
    let pName= click.target.parentElement.className.split(' ')[0]
    let cName= click.target.className.split(' ')[0]
    if(click.target.classList.contains('fishyImg') ||click.target.classList.contains('fishyName') ||click.target.classList.contains('corny')){
        if(click.target.parentElement.classList.contains('clicked')){
            click.target.parentElement.classList.remove('clicked')  
            localStorage.setItem(`${pName}`, false)
            
        }else{
        click.target.parentElement.classList.add('clicked')
        localStorage.setItem(`${pName}`, true)
        
        }
    }
    else if(click.target.classList.contains('clicked')){
        click.target.classList.remove('clicked')
        localStorage.setItem(`${cName}`, false)
        
    }else{
        click.target.classList.add('clicked')
        localStorage.setItem(`${cName}`, true)
        
    }
    
}
let parentF = document.querySelector('.item')
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function selectedButt(selectedElement){
    
    document.querySelectorAll('h1').forEach(elem=>{
        elem.classList.remove('on')
    })
    document.querySelector(`.${selectedElement}Butt`).classList.add('on')
    document.querySelector(`.menuButt`).classList.remove('on')
}

if(! localStorage.getItem('lastClicked')){
    localStorage.setItem('lastClicked', 'homeButt')
}

function create(elementName , urlName,phrase,image){
    let titleName = elementName.charAt(0).toUpperCase() + elementName.slice(1);
    
    document.querySelector(`.${elementName}Butt`).addEventListener('click',Section)
    function Section(){
        document.querySelector('.item').classList.remove("home")
        hideSections()
        menuClick()
        document.querySelector('title').innerText = `ACNH | ${titleName}`
        document.querySelector('.dropdown').style.top = `0px`
        removeAllChildNodes(parentF)
        theCurrentName =[]
        hasLoaded=0;
        lastClick = `.${elementName}Butt`
        selectedButt(`${elementName}`)
        fetch(`https://acnhapi.com/v1a/${urlName}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            howManyFish = data.length
            localStorage.setItem('lastClicked',(`${elementName}Butt`))
            for(i=0;i<data.length;i++){
                if(! localStorage.getItem(`${elementName}${i}`)){
                    localStorage.setItem(`${elementName}${i}`,false)
                    
                }

                let newFossil =document.createElement('div') //div for storing fishes into sections
                let newH2 =document.createElement('h2') //created a h2 for displaying fish names
                let fossilName=data[i].name['name-USen'] //capitalized the fish name
                let fossilImg = document.createElement('img')//created an image
                
                
                let p = document.createElement('p')
                fossilImg.src=data[i][`${image}`]
                //set the fish image to the icon_uri
                newFossil.classList.add(`${elementName}${i}`) //added a classlist to individually select each fish div
                newFossil.classList.add(`fishy`) 
                newFossil.classList.add(`${elementName}`)//added a classlist to all the fish divs for styling
                p.classList.add('corny')
                p.classList.add(`corny${i}`)
                newH2.classList.add(`fishyName`)
                newH2.classList.add(`fishyName${i}`)
                fossilImg.classList.add(`fishyImg`)
                fossilImg.classList.add(`fishicon${i}`) //added classes for all fishIcons
                fossilImg.addEventListener('load',hasLoadeded)
                
                newFossil.addEventListener('click',checkForClick)
                if(phrase.length>1){
                p.innerHTML = data[i][`${phrase}`]
                }
                newH2.innerText= fossilName.charAt(0).toUpperCase() + fossilName.slice(1); //set the name for each fish
                document.querySelector('.item').appendChild(newFossil) //appended the divs to the 'fishy section
                document.querySelector(`.${elementName}${i}`).appendChild(newH2) //appended the h2 to the fish div
                document.querySelector(`.${elementName}${i}`).appendChild(fossilImg) //appended the img to the fish div
                document.querySelector(`.${elementName}${i}`).appendChild(newH2) //appended the h2 to the fish div
                document.querySelector(`.${elementName}${i}`).appendChild(p)
                if(localStorage.getItem(`${elementName}${i}`)=== 'true'){
                    document.querySelector(`.${elementName}${i}`).classList.add('clicked')
                }
                theCurrentName.push(`${elementName}${i}`)
            }

        })
    }
}

create('fish','fish','catch-phrase','icon_uri')
create('fossil','fossils','museum-phrase','image_uri')
create('sea','sea','catch-phrase','icon_uri')
create('bug','bugs','catch-phrase','icon_uri')
create('art','art','museum-desc','image_uri')
create('music','songs','','image_uri')
document.querySelector('.homeButt').addEventListener('click', createHome)
document.querySelector(`.${localStorage.getItem('lastClicked')}`).click()
document.querySelector('.hero').classList.remove('on')
function hasLoadeded(){
    hasLoaded+=1
    
    if(hasLoaded===howManyFish){
        
        document.querySelector('.item').classList.remove("hidden")
        document.querySelector('.loadwrap').classList.add("hidden")
        if(document.querySelector('.dropdown').offsetHeight>=10){
        dropDown()
        }
        setTimeout(()=>{
        resizeHeight()
        
        },100)
    }else{
        document.querySelector('.item').classList.add("hidden")
        document.querySelector('.loadwrap').classList.remove("hidden")
        
    }
}


function resizeHeight(){
    let contentsHeight =[]
    let max = 0
    for(i=0;i<howManyFish;i++){
        let imageSize = document.querySelector(`.fishicon${i}`).offsetHeight
        let headerSize = document.querySelector(`.fishyName${i}`).offsetHeight
        let cornySize = document.querySelector(`.corny${i}`).offsetHeight
        let totalSize = imageSize+headerSize+cornySize + 10
        contentsHeight.push(totalSize)
        
    }
    
    max = Math.max(...contentsHeight)
    console.log(`max`)
    document.querySelectorAll('.fishy').forEach(elem => elem.style.height = `${max}px`)
    
}


function goHard(bool){
    
    for(i=0;i<howManyFish;i++){
        localStorage.setItem(theCurrentName[i],`${bool}`)
        console.log(`set ${theCurrentName[i]} to ${bool}`)
    }
}

window.addEventListener('resize', ()=>{
    let sizing = (document.querySelector('.hero').offsetHeight-1)
    document.querySelector('.dropdown').style.top = `${sizing}px`
    
        dropDown()
        
    resizeHeight()
})
document.querySelector('.menuButt').addEventListener('click', menuClick)
function menuClick(){
    if(document.querySelector('.hero').classList.contains('on')){
        document.querySelector('.hero').classList.remove('on')
        document.querySelector('.dropdown').classList.remove('on')
        
    }else
    document.querySelector('.hero').classList.add('on')
    document.querySelector('.dropdown').style.top = `${document.querySelector('.hero').offsetHeight-1}px`
    console.log(`${document.querySelector('.hero').offsetHeight}`)
}
function creatLocal(name){
    if(! localStorage.getItem(`${name}sCollected`)){
        localStorage.setItem(`${name}sCollected`, '0')
    }
}
creatLocal('bug')
creatLocal('fossil')
creatLocal('art')
creatLocal('sea')
creatLocal('fish')
creatLocal('music')
let string = "words6"
function progressTracker(elementName){
    let progress = 0
    let total = 0
    for(i=0;i<300;i++){
        if(localStorage.getItem(`${elementName}${i}`)){
            total+=1
            if(localStorage.getItem(`${elementName}${i}`)=== 'true'){
                progress +=1
                
            }
        }
    }
    localStorage.setItem(`${elementName}sCollected`, `${Math.round((progress / total)*100)}%`)
    
    
}
function dropDown(){
    let number = document.querySelector('.dropdown').offsetHeight
    console.log(number)
    if(document.querySelector('.dropdown').offsetHeight>=10){
        document.querySelector('.item').style.paddingTop = `${number}px`
        document.querySelector('.item').style.top = `0px`
        document.querySelector('.item').style.position = `absolute`
    }else{
        document.querySelector('.item').style.paddingTop = `0px`
        document.querySelector('.item').style.top = `0px`
        document.querySelector('.item').style.position = `relative`
    }
    
}

function createHome (){
    document.querySelector('title').innerText = "ACNH Progress Guide"
    removeAllChildNodes(parentF)
    hideSections()
    localStorage.setItem('lastClicked',(`homeButt`))
    selectedButt(`home`)
    document.querySelector('.item').classList.remove("hidden")
    document.querySelector('.loadwrap').classList.add("hidden")
    document.querySelector('.item').classList.add("home")
    
    let titleContainer =document.createElement('div')           //Title Container
    titleContainer.classList.add('progressContainer')           //classlist add
    document.querySelector('.item').appendChild(titleContainer)//append to main section
    let newh1 = document.createElement('h1')      //create h1 
    newh1.innerText ="Progress" //add text to the h1
    document.querySelector('.progressContainer').appendChild(newh1) //add h1 to the DOM

    function createProgressTrackingFor(elementName){ //create multiple progress tracker with different elements
        let progressDiv =document.createElement('div') //make a new div for the section                   
        progressDiv.classList.add(`${elementName}progress`) //add class name "progress"
        progressDiv.classList.add(`progress`)
        document.querySelector('.item').appendChild(progressDiv)  //add element to dom   
        
        let elementLogo = document.createElement('img') //create img for element
        elementLogo.src=`${elementName}.png`
        document.querySelector(`.${elementName}progress`).appendChild(elementLogo)

        


        let progressTotal =document.createElement('div') //create progress total
        let progressSoFar =document.createElement('div') //create progress so far
        progressTotal.classList.add(`${elementName}progressTotal`)
        progressTotal.classList.add(`progressTotal`)
        progressSoFar.classList.add(`progressSoFar`)
        progressTracker(`${elementName}`)
        let progressPerc = document.createElement('h1')
        progressPerc.classList.add('progressPerc')
        if(localStorage.getItem(`${elementName}sCollected`) !== 'NaN%'){
        progressPerc.innerText = localStorage.getItem(`${elementName}sCollected`)
        progressSoFar.style.width = localStorage.getItem(`${elementName}sCollected`)
        }else{
            progressPerc.innerText = '0%'
        }
        document.querySelector(`.${elementName}progress`).appendChild(progressTotal)
        document.querySelector(`.${elementName}progressTotal`).appendChild(progressSoFar)
        
        
        document.querySelector(`.${elementName}progress`).appendChild(progressPerc)
    }
    createProgressTrackingFor('fossil')
    createProgressTrackingFor('fish')
    createProgressTrackingFor('sea')
    createProgressTrackingFor('bug')
    createProgressTrackingFor('art')
    createProgressTrackingFor('music')
    


    
    
    
    
}
