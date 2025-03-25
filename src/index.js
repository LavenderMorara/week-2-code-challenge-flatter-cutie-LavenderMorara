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
        clickedCharacter=character
        displayDetails(character)
        console.log(clickedCharacter)
        console.log(clickedCharacter.votes)
    })
    btn.textContent=character.name
    nameBar.append(btn)
})

};

function displayDetails(character){
    const Name=document.querySelector('#name')
    Name.textContent=character.name
    const image=document.querySelector('#image')
    image.src=character.image
    image.alt=character.name
    const Votes=document.querySelector('#vote-count')
    Votes.textContent=character.votes
 }

const votesForm= document.querySelector('#votes-form')
votesForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let currentVotes=parseInt(clickedCharacter.votes,10)
    let addedVotes=parseInt(document.querySelector('#votes').value,10)
    let newVotes=currentVotes+addedVotes
    fetch(`${fullUrl}/${clickedCharacter.id}`,{
        method:"PATCH",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({votes:newVotes})
    } )
    .then(() => {
        window.location.reload();
        displayDetails
        e.target.reset()
    })
    })

    const resetButton=document.querySelector('#reset-btn')
    resetButton.addEventListener('click',()=>{
            fetch(`${fullUrl}/${clickedCharacter.id}`,{
                method:"PATCH",
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({votes:0})
            } )
            .then(() => {
                window.location.reload();
                displayDetails
            })
        })
    
    
    
    const addForm=document.getElementById('character-form')
    addForm.addEventListener('submit',addNewCharacter)
    
    function addNewCharacter(e){
        e.preventDefault()
        const newName=document.querySelector('#new-name').value
        const newImage=document.querySelector('#image-url').value
        const newCharacter={
            name:newName,
            image:newImage,
            votes:0
        }
        fetch(fullUrl,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newCharacter)
        })
        .then(res=>res.json())
        .then(character=>{
        const nameBar=document.querySelector('#character-bar')
        const btn=document.createElement('button')
        btn.textContent=character.name
        nameBar.appendChild(btn)
       })
       .catch(err=>console.log(err))
    }
