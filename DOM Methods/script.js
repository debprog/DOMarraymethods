const main=document.getElementById('main');
const addUserBtn=document.getElementById('add-user');
const doubleBtn=document.getElementById('double');
const showmillionairesBtn=document.getElementById('show-millionaires');
const sortBtn=document.getElementById('sort');
const calculateWealthBtn=document.getElementById('calculate-wealth');

let data=[];
getRandomUser()
//fetch random user and money

async function getRandomUser()
{

    const res=await fetch('https://randomuser.me/api');
    const data=await res.json();

    const user =data.results[0];

    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    };

    addData(newUser);
}
function showMillionaires()
{
    data=data.filter(user =>user.money>1000000);
    updateDOM();
}

function addData(obj)
{
    data.push(obj);
    updateDOM();
}
//update dom
function updateDOM(providedData=data)
{
    //clean main div
    main.innerHTML=' <h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item=>{
        const element=document.createElement('div');
        element.classList.add('person');
        element.innerHTML=`<strong> ${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);

    });


}


//format money

function formatMoney(number)
{
    return 'Rs ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

//double money
function doubleMoney()
{
    data=data.map((user)=>{
        return {...user,money:user.money*2}
    })

    updateDOM();
}

//sort by rich

function sortByRichest()
{
    data.sort((a,b)=>b.money-a.money);
    updateDOM();

}
//cal weatlth total

function calculateWealth()
{
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl=document.createElement('div');
    wealthEl.innerHTML=`<h3>Total Wealth:<strong></strong>${formatMoney(wealth)}</h3>`;
    main.appendChild(wealthEl);

}


addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showmillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);