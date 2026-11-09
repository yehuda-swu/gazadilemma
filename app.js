(() => {
  'use strict';
  const EPISODES = window.GAZA_SCENARIOS;
  const SOURCES = window.GAZA_SOURCES;
  const QUICK_IDS = ['2005','2006','2007','2008','2014','2023'];
  const $ = selector => document.querySelector(selector);
  const el = document.getElementById('app');
  const dialog = $('#infoDialog');
  const safe = value => String(value ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  let state = {view:'home',route:'full',name:'',idx:0,selected:null,answers:{}};
  const stages = () => state.route === 'quick' ? EPISODES.filter(d => QUICK_IDS.includes(d.id)) : EPISODES;
  const chapter = () => stages()[state.idx];
  function sourceLinks(ids){return ids.map(id=>{const s=SOURCES[id];return `<a href="${safe(s.url)}" target="_blank" rel="noopener noreferrer" title="${safe(s.label)}">${safe(s.label)} ↗</a>`}).join('')}
  const mapSvg = `<svg class="mapGraphic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 490" role="img" aria-label="Stylised diagram of Gaza and nearby Israeli communities. Not to scale.">
    <defs><pattern id="g" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" stroke="#ffffff" stroke-opacity=".05" fill="none"/></pattern><linearGradient id="sea" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#14374d"/><stop offset="1" stop-color="#24546c"/></linearGradient></defs>
    <rect width="500" height="490" fill="#152d40"/><rect width="500" height="490" fill="url(#g)"/>
    <path d="M0 0H130L151 89L133 169L160 254L136 330L179 490H0Z" fill="url(#sea)"/>
    <path d="M154 18L167 86L160 154L179 230L170 313L191 394L209 463L260 450L254 395L247 335L258 267L235 185L226 112L201 30Z" fill="#cbaf78" fill-opacity=".20" stroke="#f2c579" stroke-width="2.3" stroke-dasharray="6 5"/>
    <path d="M290 -20L275 120L342 219L304 340L360 499" stroke="#8bb2c5" stroke-opacity=".22" stroke-width="2" fill="none"/><path d="M420 0L378 133L452 239L419 489" stroke="#8bb2c5" stroke-opacity=".22" stroke-width="2" fill="none"/>
    <path d="M182 80L221 123L205 185L248 263L227 345L266 414" stroke="#e1b76b" stroke-opacity=".65" stroke-dasharray="5 9" fill="none"/>
    <g fill="#ffd17e" stroke="#0b1a29" stroke-width="3"><circle cx="180" cy="93" r="6"/><circle cx="207" cy="238" r="6"/><circle cx="233" cy="397" r="6"/></g>
    <g fill="#e2ebf0" font-size="13" font-family="Arial,sans-serif"><text x="16" y="225" transform="rotate(-90 16 225)" letter-spacing="4" fill="#7eafc5">MEDITERRANEAN SEA</text><text x="146" y="59" font-weight="bold" fill="#ffd17e">GAZA</text><text x="175" y="218" fill="#e7d0a5">Gaza City</text><text x="229" y="375" fill="#e7d0a5">Rafah</text><text x="322" y="127">Ashkelon</text><text x="340" y="235">Sderot</text><text x="355" y="405">Israeli</text><text x="355" y="423">communities</text></g>
    <g stroke="#f5b54d" stroke-width="1.5" stroke-dasharray="4 5" fill="none" opacity=".5"><path d="M200 135Q295 88 337 117"/><path d="M203 241Q279 214 338 228"/></g>
    <g fill="none" stroke="#fff" opacity=".45"><circle cx="342" cy="118" r="6"/><circle cx="351" cy="230" r="6"/></g>
    <path d="M448 40h20m-10-10v20" stroke="#bfd2de" stroke-width="2" opacity=".8"/><text x="457" y="26" text-anchor="middle" fill="#bfd2de" font-size="13" font-weight="bold">N</text>
  </svg>`;
  const miniMap = `<div class="schematic"><svg viewBox="0 0 460 235" aria-hidden="true"><rect width="460" height="235" fill="none"/><path d="M125 15L155 37L143 70L166 111L174 151L183 218L225 209L212 163L225 115L208 66L191 20Z" stroke="#e6bb6c" stroke-width="2" fill="#e6bb6c25" stroke-dasharray="7 5"/><path d="M75 0L100 66L97 150L116 235" fill="none" stroke="#4785a0" stroke-width="39" opacity=".26"/><path d="M150 67Q255 42 355 89M165 122Q266 110 367 147M185 186Q258 191 355 201" fill="none" stroke="#789eb6" stroke-opacity=".4" stroke-dasharray="5 6"/><g fill="#ffcb70"><circle cx="152" cy="69" r="5"/><circle cx="172" cy="122" r="5"/><circle cx="190" cy="183" r="5"/></g><g font-size="11" fill="#d4e1e9" letter-spacing="2" font-family="Arial,sans-serif"><text x="27" y="122" transform="rotate(-90 27 122)" fill="#74a7be">MEDITERRANEAN</text><text x="185" y="35" fill="#ffd17e">GAZA</text><text x="302" y="61">ISRAEL</text><text x="282" y="173" fill="#85b2c8">BORDER REGION</text></g></svg><span style="position:absolute;bottom:13px;left:16px;font-size:10px;letter-spacing:1.6px;color:#9cb3c4">SCHEMATIC · NOT TO SCALE</span></div>`;
  function paint(){
    $('#restartButton').hidden = state.view === 'home';
    if(state.view==='home') el.innerHTML=homeHtml();
    else if(state.view==='final') el.innerHTML=finalHtml();
    else el.innerHTML=gameHtml();
    bindDynamic();
  }
  function homeHtml(){return `<section class="hero">
    <div><div class="eyebrow">EXPLORE · THE CABINET SERIES</div>
      <h1>THE<br><em>GAZA</em><br>DILEMMA.</h1>
      <p class="lead">You are the Prime Minister of Israel. The rockets are falling. The cabinet is waiting. What do you do?</p>
      <p class="sublead">Navigate the events from Israel's 2005 withdrawal from Gaza to the operations of May 2023. Make decisions, defend your reasoning and reveal what actually happened.</p>
      <div class="stats"><div class="stat"><strong>2005</strong> The story begins</div><div class="stat"><strong>10</strong> Historical chapters</div><div class="stat"><strong>3</strong> Choices each round</div></div>
      <div class="entryCard"><div class="subhead">Choose your briefing format</div><div class="modeGrid">
        <button class="modeChoice ${state.route==='quick'?'active':''}" data-route="quick" aria-pressed="${state.route==='quick'}"><strong>Quick mission</strong><small>6 defining dilemmas<br>Approx. 15 to 20 minutes</small></button>
        <button class="modeChoice ${state.route==='full'?'active':''}" data-route="full" aria-pressed="${state.route==='full'}"><strong>Full briefing</strong><small>10 historical decisions<br>Approx. 30 to 40 minutes</small></button>
      </div><div class="entryBottom"><div><label class="label" for="nameField">Prime Minister's name (optional)</label><input id="nameField" class="nameInput" type="text" maxlength="32" autocomplete="off" placeholder="Enter your name" value="${safe(state.name)}"></div><button id="startBtn" class="primary">ENTER THE CABINET <span aria-hidden="true">➜</span></button></div></div>
      <p class="readerNote">Historical outcomes are fixed. Your choices are hypothetical and do not change the recorded past.</p>
    </div>
    <div class="coverArt"><div class="coverRadial"></div><div class="mapFrame"><div class="mapHeader"><span>CLASSIFIED · CABINET BRIEFING</span><span>2005 TO 2023</span></div>${mapSvg}<div class="mapFooter"><span>GAZA BORDER REGION</span><span>SCHEMATIC / NOT TO SCALE</span></div></div><div class="floatingNote"><strong>THE BIG QUESTION</strong>How do you protect your citizens without causing unacceptable harm to civilians across the border?</div></div>
  </section>`}
  function timelineHtml(arr){return `<div class="timeline" aria-label="Historical chapter timeline">${arr.map((s,i)=>`<div class="yearStep ${i<state.idx?'past':''} ${i===state.idx?'current':''}" ${i===state.idx?'aria-current="step"':''}><b>${safe(s.year)}</b><span></span></div>`).join('')}</div>`}
  function gameHtml(){const arr=stages();const d=chapter();const committed=state.view==='discussion'||state.view==='revealed';const revealed=state.view==='revealed';const answer=state.answers[d.id];const chosen=answer!==undefined?answer:state.selected;
    return `<section class="gameLayout">
      <div class="statusBar"><div class="statusLeft"><span class="statusPill amber">CONFIDENTIAL · CABINET ROOM</span><span class="statusPill">${safe(state.name||'PRIME MINISTER')}</span><span class="statusPill">${state.route==='quick'?'QUICK MISSION':'FULL BRIEFING'}</span></div><span class="statusRight">CHAPTER ${state.idx+1} OF ${arr.length} · DECISIONS RECORDED: ${Object.keys(state.answers).length}</span></div>
      ${timelineHtml(arr)}<div class="progressTrack" role="progressbar" aria-label="Chapter progress" aria-valuenow="${state.idx+1}" aria-valuemin="0" aria-valuemax="${arr.length}"><div style="width:${(state.idx+1)/arr.length*100}%"></div></div>
      <div class="chapterTop"><div><p class="counter">CHAPTER ${String(state.idx+1).padStart(2,'0')} / ${String(arr.length).padStart(2,'0')} · ${safe(d.phase)}</p><h1>${safe(d.title)}</h1><p>${safe(d.subtitle)}</p></div><span class="yearFlag" aria-hidden="true">${safe(d.year)}</span></div>
      <div class="twoCol">
        <div class="sectionCard"><div class="briefPad"><div class="miniHeader"><span><span class="dot"></span> INTELLIGENCE BRIEFING</span><span>${safe(d.year)}</span></div><p class="briefText">${safe(d.brief)}</p><div class="intelGrid">${d.intel.map(([k,v])=>`<div class="intelRow"><strong>${safe(k)}</strong><span>${safe(v)}</span></div>`).join('')}</div><div class="tags">${d.tags.map(t=>`<span class="tag">${safe(t)}</span>`).join('')}</div></div>
        ${d.image?`<img class="archivePhoto" alt="Archival image accompanying the ${safe(d.phase)} chapter" src="assets/${safe(d.image)}"><div class="photoCredit">${safe(d.credit)}</div>`:miniMap}</div>
        <div class="sectionCard"><div class="decision"><div class="miniHeader"><span><span class="dot"></span> YOUR DECISION</span><span>PRIME MINISTER'S DESK</span></div><h2>${safe(d.dilemma)}</h2>
        <div class="options" role="group" aria-label="Cabinet choices">${d.options.map((o,i)=>`<button data-choice="${i}" class="option ${chosen===i?'chosen':''}" aria-pressed="${chosen===i}" ${committed?'disabled':''}><span class="optionNumber">${i+1}</span><span><strong>${safe(o.label)}</strong><small>${safe(o.detail)}</small></span><span class="optionArrow">${chosen===i?'✓':'›'}</span></button>`).join('')}</div>
        ${!committed?`<div class="decisionFooter"><span class="hint">Select a choice using the buttons or keys 1, 2 and 3.</span><button class="primary" id="commitBtn" ${state.selected===null?'disabled':''}>LOCK IN DECISION ➜</button></div>`:
          `<div class="discussionCard"><div class="eyebrow">DECISION RECORDED · DISCUSS FIRST</div><h3>${safe(d.options[answer].label)}</h3><p>${safe(d.discuss)}</p><div class="adviserBox"><strong>CABINET CONSIDERATION:</strong> ${safe(d.options[answer].consider)}<br><br><small>This is a hypothetical assessment, not a historical result or a prediction.</small></div>
          ${!revealed?`<button id="revealBtn" class="revealButton">REVEAL WHAT ACTUALLY HAPPENED <span aria-hidden="true">✦</span></button>`:`<div class="revealSection" id="revealPanel"><div class="eyebrow">HISTORICAL REVEAL</div><h3 class="revealTitle">${safe(d.realityTitle)}</h3><p class="revealText">${safe(d.reality)}</p><div class="takeaway"><strong>THE LESSON:</strong> ${safe(d.takeaway)}</div><div class="sourceLine">${sourceLinks(d.sources)}</div><div class="revealBottom"><span class="hint">The real events were not caused by your simulated decision.</span><button id="nextBtn" class="primary">${state.idx===arr.length-1?'VIEW YOUR DEBRIEF':'NEXT CHAPTER'} ➜</button></div></div>`}
          </div>`}
        </div></div>
      </div></section>`;
  }
  function finalHtml(){const arr=stages();const counts={};arr.forEach(d=>{const a=state.answers[d.id];if(a!==undefined){const cat=d.options[a].category;counts[cat]=(counts[cat]||0)+1}});
    const all=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
    return `<section class="finalPage"><span class="edgeLabel">MISSION COMPLETE · MAY 2023</span><div class="eyebrow">YOUR CABINET DEBRIEF</div><h1 class="bigHeading">SECURITY IS A DECISION.<br><span style="color:var(--gold)">SO IS RESTRAINT.</span></h1>
      <p class="finalLead">${safe(state.name||'Prime Minister')}, you have led Israel through ${arr.length} historical dilemmas. There is no victory score. You were asked to weigh immediate threats against the cost, limits and possible consequences of each response.</p>
      <div class="summaryGrid"><div class="summaryMetric"><strong>${arr.length}</strong><span>Historical chapters completed</span></div><div class="summaryMetric"><strong>${all.length}</strong><span>Different types of policy chosen</span></div><div class="summaryMetric"><strong>2023</strong><span>End of this historical simulation</span></div></div>
      <div class="reflectionBox"><div class="eyebrow">FINAL CABINET QUESTION</div><h2>Can military action remove a threat permanently?</h2><p class="guideText">Across these years, Israel sought to stop attacks, recover a captive soldier, counter tunnels and weaken armed groups. Several operations ended with ceasefires, while armed capabilities remained or later reappeared. What do you believe should define success?</p>
      <label class="label" for="reflection">Your final recommendation to the Israeli cabinet</label><textarea id="reflection" placeholder="I would recommend... because...">${safe(state.reflection||'')}</textarea><p class="miniLegal">This reflection remains on your device unless you choose to export it.</p></div>
      <h2>Your decisions across history</h2><div class="summaryList">${arr.map(d=>{const a=state.answers[d.id];return `<div class="summaryRow"><div class="y">${safe(d.year)}</div><strong>${safe(d.phase)}</strong><span>${a!==undefined?safe(d.options[a].label):'Not answered'}</span></div>`}).join('')}</div>
      <div class="finalButtons"><button id="exportBtn" class="primary">EXPORT MY CABINET DEBRIEF ↓</button><button id="printBtn" class="secondary">PRINT / SAVE AS PDF</button><button id="playAgain" class="secondary">RESTART SIMULATION ↻</button></div>
      <p class="readerNote" style="margin-top:25px">Historical events and casualty numbers are drawn from the sources in the educator guide. Alternative decisions are for discussion only.</p>
    </section>`;
  }
  function bindDynamic(){
    $$('[data-route]').forEach(btn=>btn.addEventListener('click',()=>{state.route=btn.dataset.route;paint()}));
    $('#nameField')?.addEventListener('input',e=>{state.name=e.target.value.slice(0,32)});
    $('#startBtn')?.addEventListener('click',()=>{state.idx=0;state.selected=null;state.answers={};state.view='decision';paint();scrollTop()});
    $$('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>{if(state.view!=='decision')return;state.selected=Number(btn.dataset.choice);paint()}));
    $('#commitBtn')?.addEventListener('click',()=>{if(state.selected===null)return;state.answers[chapter().id]=state.selected;state.view='discussion';paint();scrollDecision()});
    $('#revealBtn')?.addEventListener('click',()=>{state.view='revealed';paint();scrollDecision()});
    $('#nextBtn')?.addEventListener('click',()=>{if(state.idx===stages().length-1){state.view='final'}else{state.idx++;state.view='decision';state.selected=null}paint();scrollTop()});
    $('#reflection')?.addEventListener('input',e=>{state.reflection=e.target.value});
    $('#exportBtn')?.addEventListener('click',exportDebrief);
    $('#printBtn')?.addEventListener('click',()=>window.print());
    $('#playAgain')?.addEventListener('click',restart);
  }
  function $$(sel){return Array.from(document.querySelectorAll(sel))}
  function scrollTop(){window.scrollTo({top:0,behavior:'smooth'});el.focus({preventScroll:true})}
  function scrollDecision(){if(window.innerWidth<1000){document.querySelector('.decision')?.scrollIntoView({behavior:'smooth',block:'start'})}}
  function restart(){if(state.view!=='home'&&!confirm('Restart the simulation? Your current decisions will be cleared.'))return;state={view:'home',route:state.route,name:state.name,idx:0,selected:null,answers:{}};paint();scrollTop()}
  function exportDebrief(){const arr=stages();const lines=[
    'THE GAZA DILEMMA | STANDWITHUS UK EXPLORE',
    'Historical leadership simulation | 2005 to May 2023',
    `Prime Minister: ${state.name||'Not entered'}`,
    `Format: ${state.route==='quick'?'Quick mission':'Full briefing'}`,'',
    ...arr.flatMap(d=>{const a=state.answers[d.id];return [`${d.year} | ${d.phase}`,`Decision: ${a!==undefined?d.options[a].label:'Not answered'}`,`Historical outcome: ${d.reality}`,'']}),
    'FINAL CABINET RECOMMENDATION:', state.reflection||'No recommendation recorded','',
    'This is an educational discussion activity. Choices are hypothetical and do not change history.',
    'Sources are available from the Sources menu in the simulation.'
  ];
  const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='gaza_dilemma_cabinet_debrief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function showModal(type){let title='',eyebrow='',html='';
    if(type==='how'){
      title='How to play';eyebrow='THE CABINET BRIEFING';html=`<div class="guideText"><p><strong>You are Israel's Prime Minister.</strong> Every chapter gives you the facts available at that stage in history and asks you to make a difficult decision.</p><ol><li>Read the intelligence briefing.</li><li>Choose one of three cabinet options.</li><li>Lock in your decision and explain why you chose it.</li><li>Discuss the question on screen before clicking <strong>Reveal what actually happened</strong>.</li><li>Move to the next chapter and continue the story.</li></ol><div class="guideCallout"><strong>Important:</strong> Your decisions do not rewrite history. The historical reveal is the same whichever option you choose. There are no correct answers or fictional casualty scores.</div><h3>Keyboard controls</h3><p>Press 1, 2 or 3 to select a choice. Use the on screen button to lock it in and reveal the outcome when your discussion is complete.</p><h3>Mission options</h3><p><strong>Quick mission:</strong> Six major dilemmas for a shorter lesson. <strong>Full briefing:</strong> Ten chapters, including the prisoner exchange and later operations.</p></div>`;
    } else if(type==='teacher'){
      title='Educator guide';eyebrow='STANDWITHUS UK · EXPLORE';html=`<div class="guideText">
        <div class="guideCallout"><strong>Learning question:</strong> How should Israeli leaders respond to attacks from Gaza, and what are the practical, moral and legal limits of military action?</div>
        <h3>Suggested classroom structure</h3><p><strong>5 minutes:</strong> Introduce disengagement, the Gaza border and the main political actors.</p><p><strong>15 to 30 minutes:</strong> Play the Quick or Full version. At each stage ask one student to defend the decision and another to identify a risk.</p><p><strong>5 to 10 minutes:</strong> Ask whether destroying military capacity is the same as achieving long term security.</p>
        <h3>Questions to challenge students</h3><ul><li>What is the exact objective of this decision?</li><li>How will you know whether it succeeded?</li><li>What would you need to know before authorising an operation?</li><li>How do you minimise danger to Israeli civilians and Palestinian civilians?</li><li>When is a ceasefire preferable to further military action?</li><li>What are the limits of a military response when the armed organisation remains in power?</li></ul>
        <h3>Essential historical corrections</h3><p>Rockets were fired from Gaza before the 2005 disengagement. They did not increase in every single calendar year. Gilad Shalit was captured on 25 June 2006, not in 2005. Hamas won the Palestinian legislative election in 2006, then seized control of Gaza in June 2007 after fighting Fatah.</p>
        <p>The original operation cards supplied for this activity need two casualty corrections. In 2012, there were <strong>two Israeli security personnel and four Israeli civilian deaths</strong>, not six soldiers. In 2014, UN figures record <strong>67 Israeli soldiers and six civilians in Israel</strong>, not 73 soldiers. Combatant casualty classifications for Gaza should not be taught as settled when sources disagree.</p>
        <h3>On resources, tunnels and civilians</h3><p>Israel has raised concerns about weapons smuggling, tunnels and the possible military use of materials also required for civilian infrastructure. There are documented cases: in February 2009 UNRWA reported seizures of food and blankets by Hamas authorities. The aid was returned after UNRWA suspended deliveries. Reuters also documented the use of ordinary materials, including pipes, in rocket manufacturing. These examples do not establish that all humanitarian aid was diverted. The dilemma is how to limit military supplies while safeguarding essentials for civilians.</p>
        <h3>Legal boundaries</h3><p>International humanitarian law requires distinction between civilian and military targets, proportionality in assessing expected civilian harm and feasible precautions in attack. A military objective does not remove these duties. These rules apply to all armed actors. See the <a href="${safe(SOURCES.law.url)}" target="_blank" rel="noopener noreferrer">ICRC guidance</a>.</p>
        <h3>Facilitation note</h3><p>Students adopt an Israeli decision maker's perspective, but must still assess the consequences for civilians. Choices are plausible teaching prompts, not claims that all options were formally presented to a particular historical cabinet. The historical reveal does not depend on their decision.</p>
        <h3>Original teaching cards</h3><p class="miniLegal">Included as reference artwork. Use the corrected casualty figures above when teaching.</p>
        <div class="archiveCards"><a href="reference_cards/2006_summer_rains.jpg" target="_blank">2006 card ↗</a><a href="reference_cards/2008_cast_lead.jpg" target="_blank">2008 card ↗</a><a href="reference_cards/2012_pillar_of_defence.jpg" target="_blank">2012 card ↗</a><a href="reference_cards/2014_protective_edge.jpg" target="_blank">2014 card ↗</a></div>
      </div>`;
    }else{
      title='Historical sources';eyebrow='SOURCE LIBRARY';html=`<div class="guideText"><p>The game uses Israeli official sources for decision context and military objectives, alongside United Nations, research and humanitarian law sources for chronology and civilian impact. Links open in new tabs.</p><div class="sourceList">${Object.keys(SOURCES).map(key=>`<a class="sourceItem" href="${safe(SOURCES[key].url)}" target="_blank" rel="noopener noreferrer">${safe(SOURCES[key].label)} ↗</a>`).join('')}</div><p class="miniLegal" style="margin-top:18px">Where sources dispute casualty classifications or policy interpretations, no exact militant death count is presented as settled fact. The game ends in May 2023.</p></div>`
    }
    $('#modalTitle').textContent=title;$('#modalEyebrow').textContent=eyebrow;$('#modalBody').innerHTML=html;dialog.showModal();
  }
  $('#howButton').addEventListener('click',()=>showModal('how'));
  $('#teacherButton').addEventListener('click',()=>showModal('teacher'));
  $('#sourcesButton').addEventListener('click',()=>showModal('sources'));
  $('#closeDialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',ev=>{if(ev.target===dialog)dialog.close()});
  $('#goHome').addEventListener('click',()=>{if(state.view!=='home')restart();else scrollTop()});
  $('#restartButton').addEventListener('click',restart);
  document.addEventListener('keydown',e=>{
    if(dialog.open || state.view!=='decision' || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||''))return;
    const i=Number(e.key)-1;if(i>=0&&i<3){state.selected=i;paint()}
  });
  paint();
})();
