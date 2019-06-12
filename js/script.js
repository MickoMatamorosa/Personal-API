const allChampsURL = "https://api.pandascore.co//lol/champions?token=nS2RoUimybxL5f28GKHz9ec9GzbMWaWXH7TA7eg2oXjuTLWcPl0";
const cont = document.getElementById('contents');
const champ = document.getElementsByClassName('champion');

champions(allChampsURL);

function champions(URL){
    API.fetchJSON(URL).then(data => {
        cont.innerHTML = data.map(reg => 
            `<div class="champion hover"
            style="background-image:url('${reg.big_image_url}');"
            ><h2>${reg.name}</h2>
            </div>`).join('');
    });
}

console.log(champ);

// champ.addEventListener('click', viewInfo);

function viewInfo(){
    alert('Hi');
}