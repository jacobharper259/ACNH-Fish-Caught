 let hasLoaded = 0;
 let howManyFish
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
    localStorage.setItem('lastClicked', 'fishButt')
}

function create(elementName , urlName,phrase,image){
    let titleName = elementName.charAt(0).toUpperCase() + elementName.slice(1);
    
    document.querySelector(`.${elementName}Butt`).addEventListener('click',Section)
    function Section(){
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

document.querySelector(`.${localStorage.getItem('lastClicked')}`).click()
document.querySelector('.hero').classList.remove('on')
function hasLoadeded(){
    hasLoaded+=1
    
    if(hasLoaded===howManyFish){
        
        document.querySelector('.item').classList.remove("hidden")
        document.querySelector('.loadwrap').classList.add("hidden")
        setTimeout(()=>{
        resizeHeight()
        },10)
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
    let sizing = (document.querySelector('.hero').offsetHeight-10)
    document.querySelector('.dropdown').style.top = `${sizing}px`
    
    resizeHeight()
})
document.querySelector('.menuButt').addEventListener('click', menuClick)
function menuClick(){
    if(document.querySelector('.hero').classList.contains('on')){
        document.querySelector('.hero').classList.remove('on')
        document.querySelector('.dropdown').classList.remove('on')
        
    }else
    document.querySelector('.hero').classList.add('on')
    document.querySelector('.dropdown').style.top = `${document.querySelector('.hero').offsetHeight-10}px`
    console.log(`${document.querySelector('.hero').offsetHeight}`)
}
