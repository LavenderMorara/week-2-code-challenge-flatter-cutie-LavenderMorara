let baseUrl="https://flatacuties-backend-other.vercel.app";
let serverData="characters"
let fullUrl=`${baseUrl}/${serverData}`
let clickedCharacter;

document.addEventListener('DOMContentLoaded',fetchCharaters)

function fetchCharaters(){
    fetch(`${fullUrl}`)
    .then(res=>res.json())
    .then(data=>displayCharacter(data))
    .catch(err=>console.log(err))
}

function displayCharacter(serverData){
     serverData.forEach(character => {
     const nameBar=document.querySelector('#character-bar')
     const btn=document.createElement('button')
     btn.addEventListener('click',()=>{
        clickedCharacter===character
        displayDetails(character)
     })
     btn.textContent=character.name
     nameBar.appendChild(btn)
   });
}


function displayDetails(character){
   const Name=document.querySelector('#name')
   Name.textContent=character.name
   const image=document.querySelector('#image')
   image.src=character.image
   image.alt=character.name
   const Votes=document.querySelector('#vote-count')
   Votes.textContent=character.votes
}

