// FunHub V1 — all tools run locally in the browser.
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

  // Reaction Test
  const rBox = document.querySelector("#reaction-box");
  const rBtn = document.querySelector("#reaction-btn");
  const rResult = document.querySelector("#reaction-result");
  let rTimer = null, rStart = 0, rActive = false;
  if (rBox && rBtn) {
    const startReaction = () => {
      clearTimeout(rTimer); rActive = false;
      rBox.className = "reaction-box wait"; rBox.textContent = "Wait for green...";
      rResult.textContent = "";
      rTimer = setTimeout(() => {
        rActive = true; rStart = performance.now();
        rBox.className = "reaction-box go"; rBox.textContent = "CLICK!";
      }, 900 + Math.random() * 2500);
    };
    rBtn.addEventListener("click", () => {
      if (rActive) {
        const ms = Math.round(performance.now() - rStart);
        rActive = false; rBox.className = "reaction-box ready"; rBox.textContent = "Nice!";
        rResult.textContent = `${ms} ms reaction time`;
        rBtn.textContent = "Try again";
      } else if (rBox.classList.contains("wait")) {
        clearTimeout(rTimer); rBox.className = "reaction-box ready"; rBox.textContent = "Too early!";
        rResult.textContent = "Wait until the screen turns green.";
        rBtn.textContent = "Start again";
      } else startReaction();
    });
  }

  // Number guessing
  const gInput = document.querySelector("#guess-input"), gBtn = document.querySelector("#guess-btn");
  const gResult = document.querySelector("#guess-result"), gReset = document.querySelector("#guess-reset");
  let target = Math.floor(Math.random()*100)+1, attempts = 0;
  const resetGuess = () => { target = Math.floor(Math.random()*100)+1; attempts=0; if(gInput) gInput.value=""; if(gResult) gResult.textContent="New number ready."; };
  if (gBtn) gBtn.addEventListener("click", () => {
    const n = Number(gInput.value); if (!n || n<1 || n>100) { gResult.textContent="Enter a number from 1 to 100."; return; }
    attempts++;
    if(n===target) gResult.textContent=`Correct! You got it in ${attempts} ${attempts===1?"guess":"guesses"}. 🎉`;
    else gResult.textContent=n<target ? "Too low — try again." : "Too high — try again.";
  });
  if (gReset) gReset.addEventListener("click", resetGuess);

  // Memory challenge
  const mDisplay=document.querySelector("#memory-sequence"), mBtn=document.querySelector("#memory-btn"), mInput=document.querySelector("#memory-input"), mResult=document.querySelector("#memory-result");
  let memoryLevel=0, memorySequence="";
  if(mBtn) mBtn.addEventListener("click", () => {
    memoryLevel++;
    memorySequence="";
    for(let i=0;i<memoryLevel+2;i++) memorySequence += Math.floor(Math.random()*10);
    mDisplay.textContent=memorySequence;
    mInput.classList.add("hidden"); mResult.textContent="";
    mBtn.disabled=true; mBtn.textContent="Memorize...";
    setTimeout(()=>{mDisplay.textContent="???";mInput.classList.remove("hidden");mInput.focus();mBtn.disabled=false;mBtn.textContent="Check";}, Math.max(1200,1500+memoryLevel*250));
  });
  if(mBtn && mInput) mBtn.addEventListener("click", () => {
    if(!mInput.classList.contains("hidden")) {
      if(mInput.value===memorySequence){mResult.textContent=`Correct! Level ${memoryLevel} complete. 🧠`;mInput.value="";mDisplay.textContent="Ready for next level?";mBtn.textContent="Next level";}
      else{mResult.textContent=`Not quite. The sequence was ${memorySequence}.`;memoryLevel=0;mBtn.textContent="Start again";}
      mInput.classList.add("hidden");
    }
  });

  const copyItem = (text) => {
    navigator.clipboard?.writeText(text);
  };
  const makeItems = (el, items) => {
    el.innerHTML="";
    items.forEach(item=>{
      const row=document.createElement("div"); row.className="output-item";
      row.innerHTML=`<span>${item}</span><button class="copy-btn" type="button">Copy</button>`;
      row.querySelector("button").addEventListener("click",()=>copyItem(item));
      el.appendChild(row);
    });
  };

  // Username generator
  const uBtn=document.querySelector("#username-btn"), uOut=document.querySelector("#username-output"), uVibe=document.querySelector("#username-vibe");
  if(uBtn) uBtn.addEventListener("click",()=>{
    const first=["Nova","Shadow","Pixel","Lunar","Echo","Vortex","Frost","Neon","Orbit","Rogue","Zen","Drift"];
    const second={cool:["X","Wave","Mode","Rush","Core"],gaming:["GG","Quest","Boss","Byte","XP"],minimal:["One","Zero","Line","Void","Mono"],fun:["Noodle","Bubbles","Pickle","Mango","Waffles"]}[uVibe.value];
    const arr=[...Array(8)].map(()=>first[Math.floor(Math.random()*first.length)]+second[Math.floor(Math.random()*second.length)]+(Math.random()<.5?"":Math.floor(Math.random()*99)));
    makeItems(uOut,[...new Set(arr)].slice(0,8));
  });

  // Nickname generator
  const nBtn=document.querySelector("#nickname-btn"), nOut=document.querySelector("#nickname-output"), nInput=document.querySelector("#nickname-input");
  if(nBtn) nBtn.addEventListener("click",()=>{
    const name=nInput.value.trim(); if(!name){nOut.innerHTML='<div class="output-item">Enter a name first.</div>';return;}
    const base=name.charAt(0).toUpperCase()+name.slice(1);
    const variants=[base+"y",base.slice(0,Math.min(4,base.length))+"o", "Lil "+base, base+"ster", base+"u", "Captain "+base, base+"zilla", "The "+base];
    makeItems(nOut,variants);
  });

  // Bio generator
  const bBtn=document.querySelector("#bio-btn"), bOut=document.querySelector("#bio-output"), bVibe=document.querySelector("#bio-vibe");
  const bios={
    chill:["Taking it easy, one day at a time.","Good vibes. Quiet mind. Big dreams.","Offline sometimes. Living always."],
    funny:["Professional overthinker. Part-time legend.","Powered by snacks and questionable decisions.","I came. I saw. I forgot why I came."],
    ambitious:["Building quietly. Letting results speak.","Small steps. Big vision.","Learning today. Building tomorrow."],
    mysterious:["You know my name, not my story.","Some things are better left unsaid.","Observe more. Explain less."]
  };
  if(bBtn) bBtn.addEventListener("click",()=>makeItems(bOut,bios[bVibe.value]));

  // Calculators
  const ageBtn=document.querySelector("#age-btn"), ageResult=document.querySelector("#age-result"), dob=document.querySelector("#dob");
  if(ageBtn) ageBtn.addEventListener("click",()=>{
    if(!dob.value){ageResult.textContent="Choose your date of birth.";return;}
    const birth=new Date(dob.value+"T00:00:00"), now=new Date();
    let years=now.getFullYear()-birth.getFullYear(), months=now.getMonth()-birth.getMonth(), days=now.getDate()-birth.getDate();
    if(days<0){months--; const prev=new Date(now.getFullYear(),now.getMonth(),0); days+=prev.getDate();}
    if(months<0){years--;months+=12;}
    ageResult.textContent=`You are ${years} years, ${months} months and ${days} days old.`;
  });
  const pBtn=document.querySelector("#percent-btn"), pRes=document.querySelector("#percent-result");
  if(pBtn) pBtn.addEventListener("click",()=>{
    const part=Number(document.querySelector("#percent-part").value), total=Number(document.querySelector("#percent-total").value);
    if(!total){pRes.textContent="Enter a non-zero total.";return;} pRes.textContent=`${((part/total)*100).toFixed(2)}%`;
  });
  const dBtn=document.querySelector("#date-btn"), dRes=document.querySelector("#date-result");
  if(dBtn) dBtn.addEventListener("click",()=>{
    const a=new Date(document.querySelector("#date-one").value), b=new Date(document.querySelector("#date-two").value);
    if(isNaN(a)||isNaN(b)){dRes.textContent="Choose both dates.";return;}
    dRes.textContent=`${Math.round(Math.abs(b-a)/86400000).toLocaleString()} days`;
  });
});
