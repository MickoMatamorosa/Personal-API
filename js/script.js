const allChampsURL = "https://api.pandascore.co/lol/champions";
const allItemsURL = "https://api.pandascore.co/lol/items";
const allSkinURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";

const cont = document.getElementById('contents');
const allChamps = document.getElementById('Champions');
const allItems = document.getElementById('Items');

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

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', () => {
    aChampImg.removeAttribute('src');
    details.removeAttribute('style');
});

getAllChampions(allChampsURL);

allChamps.addEventListener('click', () => getAllChampions(allChampsURL));
allItems.addEventListener('click', () => getAllItems(allItemsURL));

function getAllItems(URL){
    cont.innerHTML = "";
    cont.classList.remove('champs-grid');
    cont.classList.add('items-grid');
    API.fetchJSON(URL).then(data => {
        cont.innerHTML = data.map(item => 
            `<div onclick="viewItem('${item.id}')" class="item hover">
                <img src="${item.image_url}">
                <h2>${item.name}</h2>
            </div>`).join('');
    });
}

function getAllChampions(URL){
    cont.innerHTML = "";
    cont.classList.remove('items-grid');
    cont.classList.add('champs-grid');
    API.fetchJSON(URL).then(data => {
        cont.innerHTML = data.map(reg => 
            `<div onclick="viewChampion('${reg.id}','${reg.name}')" class="champion hover"
            style="background-image:url('${reg.big_image_url}');"
            ><h2>${reg.name}</h2></div>`).join('');
    });
}

function viewChampion(champID,champName){
    let URL = `${allChampsURL}/${champID}`;
    let chName = champName.replace(/[' ]/g,'').replace(/&.+/g,'');
    let skinUrl = `${allSkinURL}${chName}_0.jpg`;
    
    details.setAttribute('style',`display:block;background:url("${skinUrl}");`);
    
    API.fetchJSON(URL).then(cData => {
        aChampImg.setAttribute('src', cData.image_url);
        aChampName.innerHTML = cData.name;
        mhVal.innerHTML = `${cData.hp} (+${cData.hpperlevel} per level)`;
        hrVal.innerHTML = `${cData.hpregen} (+${cData.hpregenperlevel} per level)`;
        adVal.innerHTML = `${cData.attackdamage} (+${cData.attackdamageperlevel} per level)`;
        apVal.innerHTML = `${cData.attackdamage} (+${cData.attackdamageperlevel} per level)`;
        mnVal.innerHTML = `${cData.mp} (+${cData.mpperlevel} per level)`;
        mnrVal.innerHTML= `${cData.mpregen} (+${cData.mpregenperlevel} per level)`;
        asVal.innerHTML = `${cData.attackspeedoffset} (+${cData.attackspeedperlevel} per level)`;
        msVal.innerHTML =    cData.movespeed;
        arVal.innerHTML = `${cData.armor} (+${cData.armorperlevel} per level)`;
        mrVal.innerHTML = `${cData.spellblock} (+${cData.spellblockperlevel} per level)`;
    });
}

function viewItem(itemID){
    console.log(itemID);
}