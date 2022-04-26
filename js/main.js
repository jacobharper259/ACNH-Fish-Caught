 let hasLoaded = 0;
 let howManyFish
 dropDown()
 function hideSections(){
 document.querySelector('.item').classList.add("hidden")
 document.querySelector('.loadwrap').classList.remove("hidden")
 }

let theCurrentName
document.querySelector('.hero').classList.remove('on')

function checkForClick(click){
    
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

function create(elementName , urlName,phrase,image,price){
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
                if(localStorage.getItem('setquotes')==='true'){
                    if(phrase.length>1){
                    p.innerHTML = data[i][`${phrase}`]
                    }
                }
                if(localStorage.getItem('setprices')==='true'){
                    
                    p.innerHTML=`${data[i][`${price}`]} <img class=bells src="img/bells.png" alt="">`
                  //  p.innerHTML= '<i class="fa-solid fa-sack-dollar"></i>'

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

                if(localStorage.getItem('setuncaught')==='false' || localStorage.getItem('setcaught')==='false'){
                    if(localStorage.getItem('setuncaught')==='true'){
                        if(localStorage.getItem(`${elementName}${i}`) === 'true'){
                            document.querySelector(`.${elementName}${i}`).classList.add('hidden')
                        }
                    }
                    if(localStorage.getItem('setcaught')==='true'){
                        if(localStorage.getItem(`${elementName}${i}`) === 'true'){
                            document.querySelector(`.${elementName}${i}`).classList.remove('hidden')
                        }
                        if(localStorage.getItem(`${elementName}${i}`) === 'false'){
                            document.querySelector(`.${elementName}${i}`).classList.add('hidden')
                        }
                    }
                }
                if(localStorage.getItem('setcatchable') === 'false' || localStorage.getItem('setuncatchable') === 'false'){
                    if(localStorage.getItem('setcatchable') === 'true'){
                        if(data[i]['availability']){
                            if(! data[i]['availability']['time-array'].includes(Number(localStorage.getItem('setTimeConverted')))){
                                document.querySelector(`.${elementName}${i}`).classList.add('hidden')
                            }
                            if(! data[i]['availability'][`month-array-${localStorage.getItem('setHemi')}`].includes(Number(localStorage.getItem('setmonthConverted')))){
                                document.querySelector(`.${elementName}${i}`).classList.add('hidden')
                            }
                        }
                    }
                    if(localStorage.getItem('setuncatchable') === 'true'){
                        if(data[i]['availability']){
                            if(data[i]['availability']['time-array'].includes(Number(localStorage.getItem('setTimeConverted')))){
                                document.querySelector(`.${elementName}${i}`).classList.add('hidden')
                            }
                            if(data[i]['availability'][`month-array-${localStorage.getItem('setHemi')}`].includes(Number(localStorage.getItem('setmonthConverted')))){
                                document.querySelector(`.${elementName}${i}`).classList.add('hidden')
                            }
                        }
                    }
                }
            }

        })
    }
}

create('fish','fish','catch-phrase','icon_uri','price')
create('fossil','fossils','museum-phrase','image_uri','price')
create('sea','sea','catch-phrase','icon_uri','price')
create('bug','bugs','catch-phrase','icon_uri', 'price')
create('art','art','museum-desc','image_uri','sell-price')
create('music','songs','','image_uri','sell-price')
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
        
        },40)
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
    
    document.querySelectorAll('.fishy').forEach(elem => elem.style.height = `${max}px`)
    
}


function goHard(bool){
    
    for(i=0;i<howManyFish;i++){
        localStorage.setItem(theCurrentName[i],`${bool}`)
    }
}






document.querySelector('.doIt').addEventListener('scroll', ()=>{
    if(document.querySelector('.hero').classList.contains('on')){
        document.querySelector('.hero').classList.remove('on')
        dropDown()
    }
})










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
    localStorage.setItem(`${elementName}sCollected`, `${Math.round((progress / total)*100)}`)
    
    
}
function dropDown(){
    let number = document.querySelector('.dropdown').offsetHeight
    
    if(document.querySelector('.dropdown').offsetHeight>=10){
        document.querySelector('.item').style.paddingTop = `${number}px`
        document.querySelector('.item').style.top = `0px`
        document.querySelector('.dropdown').style.top = `0px`
        document.querySelector('.item').style.position = `absolute`
    }else{
        document.querySelector('.item').style.paddingTop = `0px`
        document.querySelector('.item').style.top = `0px`
        document.querySelector('.item').style.position = `relative`
    }
    
}

function createHome (){
    document.querySelector('title').innerText = "ACNH Progress Guide"
    menuClick()
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
        elementLogo.src=`img/${elementName}.png`
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
            if(progressSoFar.offsetWidth <= progressTotal.offsetWidth){
                let i =0
                if(i<=100){
               var timer = setInterval(()=>{
                if(i<Number(localStorage.getItem(`${elementName}sCollected`))){
                i++
                }
                
                progressSoFar.style.width= `${i}%`
                progressPerc.innerText = `${i}%`
                
                if(i===localStorage.getItem(`${elementName}sCollected`)) clearInterval(timer)
                },1000/160)
                      
                
            }
            
           
        }
            
            
        }else{
            progressPerc.innerText = '0%'
        }
        document.querySelector(`.${elementName}progress`).appendChild(progressTotal)
        document.querySelector(`.${elementName}progressTotal`).appendChild(progressSoFar)
        dropDown()
        setTimeout(()=>{
            dropDown()
        },10)
        setTimeout(()=>{
            dropDown()
        },50)
        setTimeout(()=>{
            dropDown()
        },100)
        setTimeout(()=>{
            dropDown()
        },200)
        setTimeout(()=>{
            dropDown()
        },300)
        setTimeout(()=>{
            dropDown()
        },500)
        setTimeout(()=>{
            dropDown()
        },1000)
        document.querySelector(`.${elementName}progress`).appendChild(progressPerc)
        
    }
    createProgressTrackingFor('fossil')
    createProgressTrackingFor('fish')
    createProgressTrackingFor('sea')
    createProgressTrackingFor('bug')
    createProgressTrackingFor('art')
    createProgressTrackingFor('music')

}
let monthConverted
let set = false
document.querySelector('.settingsButt').addEventListener('click', settings)
let timeConverted 
function changeTime(time,dayPart){
    if(dayPart==='AM'){
        if(time===12){
            time=0;
        }
        if(time!==12){
        timeConverted = time
        }
    }
    if(dayPart==='PM'){
        if(time===12){
            timeConverted=12;
        }
        if(time!==12){
        timeConverted = time + 12
        }
        
        
    }
    
}

function changeMonth (month){
    if(month==="January"){
        monthConverted=1
    }
    if(month==="February"){
        monthConverted=2
    }
    if(month==="March"){
        monthConverted=3
    }
    if(month==="April"){
        monthConverted=4
    }
    if(month==="May"){
        monthConverted=5
    }
    if(month==="June"){
        monthConverted=6
    }
    if(month==="July"){
        monthConverted=7
    }

    if(month==="August"){
        monthConverted=8
    }
    if(month==="September"){
        monthConverted=9
    }
    if(month==="October"){
        monthConverted=10
    }
    if(month==="November"){
        monthConverted=11
    }
    if(month==="December"){
        monthConverted=12
    }
}
function createSettingsStore(name,standard){
    if(! localStorage.getItem(`${name}`)){
        localStorage.setItem(`${name}`,`${standard}`)
    }
}

createSettingsStore('setcatchable','true')
createSettingsStore('setuncatchable','true')
createSettingsStore('setcaught','true')
createSettingsStore('setuncaught','true')
createSettingsStore('setquotes','true')
createSettingsStore('setprices','false')
createSettingsStore('setMonth','April')
createSettingsStore('setTime','7')
createSettingsStore('setamPM','PM')
createSettingsStore('setHemi','Northern')
createSettingsStore('setmonthConverted','4')
createSettingsStore('setTimeConverted','19')
function settings (){
    document.querySelectorAll('.fa-circle-check').forEach((elem)=>{
        if(localStorage.getItem(`set${elem.classList.value.split(' ')[2]}`) === 'true'){
            elem.classList.add('click')
        }else{
            elem.classList.remove('click')
        }
    })

    document.querySelectorAll('select').forEach((elem)=>{
        elem.addEventListener('change', ()=>{
            document.querySelector('.sort').classList.remove('unchanged')
            document.querySelector('.sort').addEventListener('click', applySet)
        })
    })
    document.querySelectorAll('.settings div div').forEach((elem)=>{
        elem.addEventListener('click', ()=>{
            document.querySelector('.sort').classList.remove('unchanged')
            document.querySelector('.sort').addEventListener('click', applySet)
        })
    })
    document.querySelector('.settings').classList.toggle('hidden')
    document.querySelector('.Dcaught').addEventListener('click', ()=>{
        document.querySelector('.fa-solid.caught').classList.toggle('click')
    })
    document.querySelector('.Duncaught').addEventListener('click', ()=>{
        document.querySelector('.fa-solid.uncaught').classList.toggle('click')
    })
    document.querySelector('.Dcatchable').addEventListener('click', ()=>{
        document.querySelector('.fa-solid.catchable').classList.toggle('click')
    })
    document.querySelector('.Duncatchable').addEventListener('click', ()=>{
        document.querySelector('.fa-solid.uncatchable').classList.toggle('click')
    })
    document.querySelector('.Dquotes').addEventListener('click', ()=>{
        document.querySelector('.fa-solid.quotes').classList.toggle('click')
        document.querySelector('.fa-solid.prices').classList.toggle('click')
    })
    document.querySelector('.Dprices').addEventListener('click', ()=>{
        document.querySelector('.fa-solid.prices').classList.toggle('click')
        document.querySelector('.fa-solid.quotes').classList.toggle('click')
    })

    document.querySelector('.month').value= localStorage.getItem('setMonth')
    
    
    document.querySelector('.time').value= `${localStorage.getItem('setTime')}:00`
    

    document.querySelector('.amPM').value= localStorage.getItem('setamPM')
    
    
    document.querySelector('.noSo').value= localStorage.getItem('setHemi').charAt(0).toUpperCase() + localStorage.getItem('setHemi').slice(1)

    
}



function applySet(){
    window.navigator.vibrate(200);
    document.querySelectorAll('.fa-circle-check').forEach((elem)=>{
        if(elem.classList.contains('click')){
            localStorage.setItem(`set${elem.classList.value.split(' ')[2]}`,'true')
        }else{
            localStorage.setItem(`set${elem.classList.value.split(' ')[2]}`,'false')
        }
    })
    document.querySelector('.settings').classList.add('hidden')
    localStorage.setItem('setMonth', `${document.querySelector('.month').value}`)
    if(document.querySelector('.time').value.length ===5){
        localStorage.setItem('setTime', `${document.querySelector('.time').value.charAt(0)}${document.querySelector('.time').value.charAt(1)}`)
    }
    if(document.querySelector('.time').value.length !==5){
        localStorage.setItem('setTime', `${document.querySelector('.time').value.charAt(0)}`)
    }
    localStorage.setItem('setamPM', `${document.querySelector('.amPM').value}`)
    localStorage.setItem('setHemi', `${document.querySelector('.noSo').value.toLowerCase()}`)
    changeTime(Number(localStorage.getItem('setTime')),localStorage.getItem('setamPM'))
    console.log(timeConverted)
    localStorage.setItem('setTimeConverted', timeConverted)
    changeMonth(document.querySelector('.month').value)
    localStorage.setItem('setmonthConverted', `${monthConverted}`)
    setTimeout(()=>{
        location.reload()
    },1000)
}
