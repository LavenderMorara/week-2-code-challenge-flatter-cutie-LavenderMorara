// Your code here
document.addEventListener('DOMContentLoaded',main)
let baseUrl="http://localhost:3000";
let serverData="characters"
let fullUrl=`${baseUrl}/${serverData}`

function fetchCharacters(){
    fetch(fullUrl,{
        method:"GET"
    })
    .then(res=>res.json())
    .then(data=>displayCharacters(data))
    .catch(err=>console.log(err))
}

function displayCharacters(serverData){
    serverData.forEach(character => {
    let namesBar=document.getElementById('character-bar')
    let btn=document.createElement('button')
    btn.id="characterName"
    btn.textContent=`${character.name}`
    btn.style.width="170px"
    btn.style.height="40px"
    btn.style.textAlign="center"
    btn.style.padding="10px 30px"
    btn.style.borderRadius="50px"
    btn.style.backgroundColor="navy"
    namesBar.appendChild(btn)       
    });
}


function main(){
    fetchCharacters()
}

