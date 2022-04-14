 let hasLoaded = 0;
 let howManyFish
 document.querySelector('.fish').classList.add("hidden")
 document.querySelector('.loadwrap').classList.remove("hidden")
 fetch('https://acnhapi.com/v1a/fish/')
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        howManyFish = data.length
        for(i=0;i<data.length;i++){
            if(! localStorage.getItem(`fish${i}`)){
                localStorage.setItem(`fish${i}`,false)
                console.log("done")
            }
            
            let newFishy =document.createElement('div') //div for storing fishes into sections
            let newH2 =document.createElement('h2') //created a h2 for displayijng fish names
            let fishName=data[i].name['name-USen'] //capitalized the fish name
            let fishImg = document.createElement('img')//created an image
            fishImg.src=data[i]['icon_uri'] //set the fish image to the icon_uri
            newFishy.classList.add(`fish${i}`) //added a classlist to individually select each fish div
            newFishy.classList.add(`fishy`) //added a classlist to all the fish divs for styling
            newH2.classList.add(`fishyName`)
            fishImg.classList.add(`fishyImg`)
            fishImg.classList.add(`fishicon${i}`) //added classes for all fishIcons
            fishImg.addEventListener('load',hasLoadeded)
            newFishy.addEventListener('click',checkForClick)
            
            newH2.innerText= fishName.charAt(0).toUpperCase() + fishName.slice(1); //set the name for each fish
            document.querySelector('.fish').appendChild(newFishy) //appended the divs to the 'fishy section
            document.querySelector(`.fish${i}`).appendChild(newH2) //appended the h2 to the fish div
            document.querySelector(`.fish${i}`).appendChild(fishImg) //appended the img to the fish div
            
            
            if(localStorage.getItem(`fish${i}`)=== 'true'){
                document.querySelector(`.fish${i}`).classList.add('clicked')
            }
        }
        
    })

function hasLoadeded(){
    hasLoaded+=1
    
    if(hasLoaded===howManyFish){
        document.querySelector('.fish').classList.remove("hidden")
        document.querySelector('.loadwrap').classList.add("hidden")
    }
}
function checkForClick(click){
    let pName= click.target.parentElement.className.split(' ')[0]
    let cName= click.target.className.split(' ')[0]
    if(click.target.classList.contains('fishyImg') ||click.target.classList.contains('fishyName')){
        if(click.target.parentElement.classList.contains('clicked')){
            click.target.parentElement.classList.remove('clicked')  
            localStorage.setItem(`${pName}`, false)
            console.log("click")
        }else{
        click.target.parentElement.classList.add('clicked')
        localStorage.setItem(`${pName}`, true)
        console.log("click")
        }
    }
    else if(click.target.classList.contains('clicked')){
        click.target.classList.remove('clicked')
        localStorage.setItem(`${cName}`, false)
        console.log(cName)
    }else{
        click.target.classList.add('clicked')
        localStorage.setItem(`${cName}`, true)
        console.log(cName)
    }
    
    
    
    
}
/*
setTimeout(()=>{
    for(i=0;i<howManyFish;i++){
        if(document.querySelector(`.fishicon${i}`).complete){
            hasLoaded+=1
        }
        
    }
    console.log(hasLoaded)
    if(hasLoaded!=howManyFish){
    setTimeout(()=>{
        for(i=0;i<howManyFish;i++){
            if(document.querySelector(`.fishicon${i}`).complete){
                hasLoaded+=1
            }
            
        }
        console.log(hasLoaded)
        if(hasLoaded!=howManyFish){
            setTimeout(()=>{
                for(i=0;i<howManyFish;i++){
                    if(document.querySelector(`.fishicon${i}`).complete){
                        hasLoaded+=1
                    }
                    
                }
                console.log(hasLoaded)
                
            },500)}
    },500)}
},500)
*/
    