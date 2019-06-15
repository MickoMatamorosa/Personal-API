const allChampsURL = "https://api.pandascore.co/lol/champions";
const allItemsURL = "https://api.pandascore.co/lol/items";
const allTeamsURL = "https://api.pandascore.co/lol/teams";
const allTourURL = "https://api.pandascore.co/lol/tournaments";
const allSkinURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";

const cont = document.getElementById('contents');
const allChamps = document.getElementById('Champions');
const allItems = document.getElementById('Items');
const allTeams = document.getElementById('Teams');
const allTour = document.getElementById('Tournament');

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

const searchInput = document.querySelector('input.search');
const searchLbl = document.querySelector('label.search');

searchInput.addEventListener('change', searchChampion);
searchInput.addEventListener('keyup', searchChampion);

function searchChampion(){
    let searchURL = `&search[name]=${this.value}`;
    if(searchURL) getAllChampions(allChampsURL,searchURL);
    else getAllChampions(allChampsURL);
}

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', () => {
    aChampImg.removeAttribute('src');
    details.removeAttribute('style');
});

getAllChampions(allChampsURL);

allChamps.addEventListener('click', () => getAllChampions(allChampsURL));
allItems.addEventListener('click', () => getAllItems(allItemsURL));
allTeams.addEventListener('click', () => getAllTeams(allTeamsURL));
allTour.addEventListener('click', () => getAllTournament(allTourURL));

function getAllItems(URL){
    cont.innerHTML = "";
    searchLbl.hidden = true;
    cont.classList.remove('tournament-grid');
    cont.classList.remove('teams-grid');
    cont.classList.remove('champs-grid');
    cont.classList.add('items-grid');
    API.fetchJSON(URL).then(data => {
        cont.innerHTML = data.map(item => 
            `<div class="item hover">
                <img src="${item.image_url}">
                <h2>${item.name}</h2>
            </div>`).join('');
    });
}

function getAllTeams(URL){
    cont.innerHTML = "";
    searchLbl.hidden = true;
    cont.classList.remove('tournament-grid');
    cont.classList.remove('champs-grid');
    cont.classList.remove('items-grid');
    cont.classList.add('teams-grid');
    API.fetchJSON(URL).then(data => {
        cont.innerHTML = data.map(reg => 
            `<div onclick="viewTeam('${reg}','${reg.image_url}')" class="team hover"
            style="background-image:url('${reg.image_url}');"
            ><h2>${reg.name}</h2></div>`).join('');
    });
}

function getAllTournament(URL){
    cont.innerHTML = "";
    searchLbl.hidden = true;
    cont.classList.remove('champs-grid');
    cont.classList.remove('items-grid');
    cont.classList.remove('teams-grid');
    cont.classList.add('tournament-grid');
    API.fetchJSON(URL).then(data => {
        cont.innerHTML = data.map(reg => 
            `<div onclick="viewTournament('${reg}')" class="tour hover"
            style="background-image:url('${reg.league.image_url}');"
            ><h2>${reg.name}</h2></div>`).join('');
    });
}

function getAllChampions(URL,sURL){
    cont.innerHTML = "";
    searchLbl.hidden = false;
    cont.classList.remove('tournament-grid');
    cont.classList.remove('teams-grid');
    cont.classList.remove('items-grid');
    cont.classList.add('champs-grid');
    API.fetchJSON(URL,sURL).then(data => {
        cont.innerHTML = data.map(reg => 
            `<div onclick="viewChampion('${reg.id}','${reg.name}')" class="champion hover"
            style="background-image:url('${reg.big_image_url}');"
            ><h2>${reg.name}</h2></div>`).join('');
    });
}

function itemDetails(d){
    return `
        ${d.gold_base?`<li>${d.gold_base}(total: ${d.gold_total})</li><li>sell for ${d.gold_sell}</li>`:""}
        ${d.flat_armor_mod?`<li>+${d.flat_armor_mod} armor</li>`:""}
        ${d.flat_crit_chance_mod?`<li>+${d.flat_crit_chance_mod} critical chance</li>`:""}
        ${d.flat_hp_pool_mod?`<li>+${d.flat_hp_pool_mod} health</li>`:""}
        ${d.flat_hp_regen_mod?`<li>+${d.flat_hp_regen_mod} health regen</li>`:""}
        ${d.flat_magic_damage_mod?`<li>+${d.flat_magic_damage_mod} magic damage</li>`:""}
        ${d.flat_movement_speed_mod?`<li>+${d.flat_movement_speed_mod} movement speed</li>`:""}
        ${d.flat_mp_pool_mod?`<li>+${d.flat_mp_pool_mod} mana</li>`:""}
        ${d.flat_mp_regen_mod?`<li>+${d.flat_mp_regen_mod} mana regen</li>`:""}
        ${d.flat_physical_damage_mod?`<li>+${d.flat_physical_damage_mod} attack damage</li>`:""}
        ${d.flat_spell_block_mod?`<li>+${d.flat_spell_block_mod} magic resist</li>`:""}
    `;
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

function viewTeam(teamData){
    console.log(teamData);
    // display team and its players
}

function viewTournament(matchData){
    console.log(matchData);
    // display all matches from selected tournament
}