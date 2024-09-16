
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button")
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg1");
for(let select of dropdown)
{
 for(currCode in countryList)
 {
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name==="from"&&currCode=="USD")
    {
        newOption.selected="selected";
    }
    if(select.name==="to"&&currCode==="INR")
    {
        newOption.selected="selected";
    }
    select.append(newOption);
 }
select.addEventListener("change",(evt)=>{
updateFlag(evt.target);
});
}

const updateFlag=(element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img= element.parentElement.querySelector("img");
img.src=newSrc;

}

btn.addEventListener("click",async (evt)=>{
evt.preventDefault();
let amount=document.querySelector(".amount input");
let amtVal=amount.value;
if(isNaN(amtVal)){
    msg.innerText="Invalid"
}
if(amtVal===""||amtVal<1)
{
    amtVal=1;
    amount.value="1";
}

// console.log(fromCurr.value,toCurr.value);
const BASE_URL="https://api.exchangerate-api.com/v4/latest"
const URL=`${BASE_URL}/${fromCurr.value}`;
let response=await fetch(URL);

let data=await response.json();
const rate=data.rates[toCurr.value];
const fullamount=rate*amtVal;
msg.innerText=`${amtVal} ${fromCurr.value} = ${fullamount} ${toCurr.value}`;
});
       


