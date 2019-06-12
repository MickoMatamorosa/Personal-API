const allChampsURL = "https://api.pandascore.co//lol/champions?token=nS2RoUimybxL5f28GKHz9ec9GzbMWaWXH7TA7eg2oXjuTLWcPl0";
const cont = document.getElementById('contents');
const champ = cont.childNodes;
const details = document.querySelector('.overlay');
const aChampImg = document.querySelector('.active-champion-img');
const aChampName = document.querySelector('.active-champion-name');
const mhVal = document.getElementById('health-value');
const hrVal = document.getElementById('health-regen-value');
const adVal = document.getElementById('ad-value');
const apVal = document.getElementById('ap-value');
const mnVal = document.getElementById('mana-value');
const mnrVal= document.getElementById('mana-regen-value');
const asVal = document.getElementById('as-value');
const msVal = document.getElementById('ms-value');
const arVal = document.getElementById('armor-value');
const mrVal = document.getElementById('magic-resist-value');


champions(allChampsURL);

function champions(URL){
    API.fetchJSON(URL).then(data => {
        cont.innerHTML = data.map(reg => 
            `<div onclick="view('${reg}')" class="champion hover"
            style="background-image:url('${reg.big_image_url}');"
            ><h2>${reg.name}</h2>
            </div>`).join('');
    });
}

function view(cData){
    details.setAttribute('style','display:block')
    aChampImg.setAttribute('src',cData.image_url);
    aChampName.innerHTML = cData.name;
    mhVal.innerHTML = `${cData.hp} (+${cData.hpperlevel} per level)`;
    hrVal.innerHTML = `${cData.hpregen} (+${cData.hpregenperlevel} per level)`;
    adVal.innerHTML = `${cData.attackdamage} (+${cData.attackdamageperlevel} per level)`;
    apVal.innerHTML = `${cData.} (+${cData.} per level)`;
    mnVal.innerHTML = `${cData.mp} (+${cData.mpperlevel} per level)`;
    mnrVal.innerHTML= `${cData.mpregen} (+${cData.mpregenperlevel} per level)`;
    asVal.innerHTML = `${cData.attackspeedoffset} (+${cData.attackspeedperlevel} per level)`;
    msVal.innerHTML = cData.movespeed;
    arVal.innerHTML = `${cData.armor} (+${cData.armorperlevel} per level)`;
    mrVal.innerHTML = `${cData.spellblock} (+${cData.spellblockperlevel} per level)`;












}