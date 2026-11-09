(() => {
  'use strict';
  const EPISODES = window.GAZA_SCENARIOS;
  const SOURCES = window.GAZA_SOURCES;
  const COMMAND = window.GAZA_COMMAND;
  const QUICK_IDS = ['2005','2006','2007','2008','2014','2023'];
  const root = document.getElementById('app');
  const dialog = document.getElementById('infoDialog');
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const safe = val => String(val ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let state = { view:'home', route:'quick', name:'', idx:0, selected:null, answers:{}, reflection:'', mapPaused:false };
  const chapters = () => state.route === 'quick' ? EPISODES.filter(x => QUICK_IDS.includes(x.id)) : EPISODES;
  const chapter = () => chapters()[state.idx];
  const command = () => COMMAND[chapter().id];
  function linkSources(ids) {
    return ids.map(id => SOURCES[id]).filter(Boolean).map(s => `<a href="${safe(s.url)}" target="_blank" rel="noopener noreferrer">${safe(s.label)} ↗</a>`).join('');
  }
  function mapPaths(mode) {
    const r = (d, type='rocket') => `<path class="mapFlow ${type}" d="${d}"/>`;
    const pulse = (x,y,type='rocket') => `<circle class="mapPulse ${type}" cx="${x}" cy="${y}" r="11"/><circle class="mapPoint" cx="${x}" cy="${y}" r="4.5"/>`;
    const flag = (x,y,text,type='') => `<g transform="translate(${x} ${y})"><rect class="mapFlag ${type}" x="-2" y="-21" rx="5" width="${Math.min(210,text.length*7+17)}" height="25"/><text class="mapFlagText" x="7" y="-5">${safe(text)}</text></g>`;
    switch(mode) {
      case 'withdrawal':
        return r('M280 99 C324 96 365 104 392 120','friendly')+r('M284 214 C321 214 349 220 390 234','friendly')+pulse(391,120,'friendly')+flag(352,84,'WITHDRAWAL')+flag(369,267,'ROCKET ALERTS','danger');
      case 'hostage':
        return r('M375 312 Q340 316 289 312','danger')+pulse(287,312,'danger')+flag(330,283,'SHALIT CAPTURED','danger')+r('M274 150 Q350 125 416 147')+pulse(418,146);
      case 'takeover':
        return `<path class="takeoverFill" d="M253 34L289 52L299 107L296 150L309 208L308 268L326 352L270 382L263 319L253 260L253 196L244 132L250 70Z"/>`+pulse(278,198,'danger')+flag(324,136,'HAMAS TAKEOVER','danger')+r('M275 354 Q314 335 361 339','tunnel');
      case 'rockets':
        return r('M285 105 Q348 33 463 83')+r('M285 151 Q345 118 403 163')+r('M290 217 Q372 222 491 333')+pulse(457,84)+pulse(404,163)+flag(464,62,'ROCKET FIRE','danger');
      case 'exchange':
        return r('M305 260 Q355 212 401 225','friendly')+r('M400 246 Q351 293 307 287','diplomacy')+pulse(400,226,'friendly')+pulse(310,285,'diplomacy')+flag(374,177,'PRISONER EXCHANGE');
      case 'iron':
        return r('M284 109 Q374 13 601 67')+r('M285 174 Q354 121 402 162')+r('M287 228 Q365 230 480 322')+`<path class="interceptArc" d="M361 204Q385 95 436 82"/><path class="interceptArc" d="M407 220Q450 107 515 89"/>`+pulse(434,86,'friendly')+flag(482,120,'IRON DOME','friendly');
      case 'tunnels':
        return r('M287 112 Q348 48 462 80')+r('M283 171 Q344 146 393 166')+r('M289 265 Q359 271 425 271','tunnel')+r('M297 295 Q361 319 399 315','tunnel')+pulse(409,271,'tunnel')+flag(410,261,'TUNNEL THREAT','danger');
      case 'longrange':
        return r('M284 92Q398 -12 604 61')+r('M285 138Q420 91 649 249')+r('M287 166Q350 111 401 165')+pulse(601,62)+pulse(634,249)+flag(531,111,'LONGER RANGE','danger');
      case 'limited':
        return r('M284 140 Q344 103 420 164')+r('M288 213 Q353 194 405 237')+pulse(422,163)+flag(427,148,'BORDER ALERT','danger');
      default: return r('M283 120 Q350 100 405 165');
    }
  }
  function renderMap(data, options={}) {
    return `<div class="mapScreen ${options.paused?'paused':''}" id="visualMap" role="img" aria-label="Animated historical schematic of Gaza and nearby Israeli communities, illustrating ${safe(data.focus)}. Not to scale or an operational map.">
      <div class="gridOverlay"></div>
      <svg viewBox="0 0 720 410" class="tacticalSVG" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
       <defs><linearGradient id="oceanShade" x1="0" x2="1"><stop stop-color="#052539"/><stop offset="1" stop-color="#124059"/></linearGradient><linearGradient id="gazaShade" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#2d6672"/><stop offset="1" stop-color="#1b414b"/></linearGradient></defs>
       <rect x="0" y="0" width="720" height="410" fill="#102b3f"/>
       <path d="M0 0H192L204 93L196 174L210 263L206 410H0Z" fill="url(#oceanShade)"/>
       <path d="M321 0H720V410H340L328 349L325 285L314 217L314 140L303 74L306 0Z" fill="#153850" opacity=".8"/>
       <path d="M253 34L289 52L299 107L296 150L309 208L308 268L326 352L270 382L263 319L253 260L253 196L244 132L250 70Z" fill="url(#gazaShade)" stroke="#f3c477" stroke-width="2.6" stroke-dasharray="7 6"/>
       <path d="M346 0L342 123L340 204L355 311L350 410" fill="none" stroke="#64879a" opacity=".38" stroke-width="2" stroke-dasharray="4 8"/>
       <g stroke="#96bed0" stroke-opacity=".15" fill="none" stroke-width="2"><path d="M368 104Q488 137 720 96"/><path d="M354 205Q514 223 720 203"/><path d="M354 321Q529 334 720 341"/></g>
       <g class="mapZones"><circle cx="400" cy="166" r="8"/><circle cx="458" cy="80" r="8"/><circle cx="490" cy="332" r="8"/><circle cx="603" cy="62" r="8"/><circle cx="638" cy="248" r="8"/></g>
       <g class="mapRoutes">${mapPaths(data.map)}</g>
       <g class="mapLabels"><text x="78" y="215" transform="rotate(-90 78 215)" class="oceanText">MEDITERRANEAN SEA</text><text x="242" y="19" class="gazaText">GAZA</text><text x="372" y="27" class="israelText">ISRAEL</text><text x="314" y="87" class="placeLabel">Gaza City</text><text x="373" y="193" class="placeLabel">Sderot</text><text x="447" y="62" class="placeLabel">Ashkelon</text><text x="483" y="362" class="placeLabel">Beersheba</text><text x="581" y="42" class="placeLabel">Tel Aviv</text><text x="606" y="271" class="placeLabel">Jerusalem</text><text x="255" y="398" class="placeLabel">Rafah</text></g>
       <g stroke="#8cbcd4" stroke-width="2"><path d="M674 31V56M662 43H686"/></g><text x="674" y="22" text-anchor="middle" fill="#a9cbd9" font-size="13">N</text>
      </svg>
      <span class="mapReticle reticleTopLeft"></span><span class="mapReticle reticleBottomRight"></span>
      <div class="mapTagLeft"><span class="liveDot"></span> ARCHIVE RECONSTRUCTION</div>
      <div class="mapTagRight">${safe(data.focus)}</div>
      <div class="mapLegend"><span><i class="redLine"></i> Threat</span><span><i class="blueLine"></i> Response</span><span><i class="dashedLine"></i> Underground</span><span>Illustrative · Not to scale</span></div>
    </div>`;
  }
  function timeline() {
    const cs=chapters();return `<div class="timeline" aria-label="Historical timeline">${cs.map((s,i)=>`<div class="timeBlock ${i===state.idx?'active':''} ${i<state.idx?'done':''}"><div class="timeYear">${safe(s.year)}</div><div class="timeLine"><i></i></div></div>`).join('')}</div>`;
  }
  function homeHtml() {
    return `<section class="homeLayout"><div class="homeCopy">
       <div class="eyebrow"><span class="signalDot"></span> EXPLORE · HISTORICAL DECISION SIMULATION</div>
       <h1>THE <span>GAZA</span><br>DILEMMA<span class="headlineDot">.</span></h1>
       <p class="homeLead">You are Israel's Prime Minister.<br>The next move is yours.</p>
       <p class="homeSupport">Enter the security control room. Hear your advisers. Face the decisions that shaped the years from 2005 to May 2023.</p>
       <div class="homeInput"><label for="nameField">YOUR NAME (OPTIONAL)</label><input type="text" maxlength="32" id="nameField" placeholder="Prime Minister" value="${safe(state.name)}" autocomplete="off"></div>
       <div class="modeHeading">CHOOSE YOUR MISSION</div>
       <div class="modeSwitch"><button type="button" data-route="quick" class="modeChoice ${state.route==='quick'?'selected':''}" aria-pressed="${state.route==='quick'}"><strong>QUICK MISSION</strong><span>6 decisions · Best for a lesson</span></button><button type="button" data-route="full" class="modeChoice ${state.route==='full'?'selected':''}" aria-pressed="${state.route==='full'}"><strong>FULL BRIEFING</strong><span>10 decisions · Deeper story</span></button></div>
       <button class="startButton" id="startBtn">ENTER CONTROL ROOM <span>→</span></button>
       <p class="homeDisclaimer">Historical outcomes are fixed. Advisers' dialogue is simulated, not an actual quotation.</p>
       </div><div class="homeMapWall"><div class="homePanelHeader"><span>STRATEGIC COMMAND / HISTORICAL ARCHIVE</span><strong>2005 → 2023</strong></div>
         ${renderMap({map:'longrange',focus:'Gaza and surrounding region'},{paused:state.mapPaused})}
         <div class="homeMonitorFooter"><span><i></i> SECURITY</span><span><i></i> CIVILIANS</span><span><i></i> DIPLOMACY</span></div>
         <div class="homeCaseNote"><span>THE CORE QUESTION</span><p>How do you protect Israelis while limiting civilian harm and deciding when force should stop?</p></div>
       </div></section>`;
  }
  function adviserCard(role, person, line, tag, index) {
    return `<div class="adviserCard"><div class="adviserBadge ${tag}">${tag==='defence'?'DM':tag==='military'?'IDF':'DIP'}</div><div class="adviserText"><div class="adviserName">${safe(person)}</div><div class="adviserRole">${safe(role)}${tag==='diplomacy'?' · Role play':''}</div><p>“${safe(line)}”</p></div><button type="button" class="listenBtn" data-adviser="${index}" aria-label="Listen to ${safe(role)} briefing" title="Listen to briefing"><span aria-hidden="true">▶</span></button></div>`;
  }
  function adviserHtml(data) {
    const [dName,dWords]=data.defence,[mName,mWords]=data.military,[pName,pWords]=data.diplomacy;
    return `<section class="advisers"><div class="innerHeading"><span><i class="tinyPulse"></i> YOUR SECURITY CABINET</span><span class="roleplay">SIMULATED ADVICE</span></div>
      ${adviserCard('Defence Minister',dName,dWords,'defence',0)}
      ${adviserCard('IDF Chief of Staff',mName,mWords,'military',1)}
      ${adviserCard('Diplomatic Adviser',pName,diplomacyFix(pWords),'diplomacy',2)}
      </section>`;
  }
  function diplomacyFix(text){return text;}
  function optionHtml(d) {
    return `<div class="choiceList" role="group" aria-label="Cabinet decisions">${d.options.map((o,i)=>`<button type="button" class="choice ${state.selected===i?'chosen':''}" data-choice="${i}" aria-pressed="${state.selected===i}"><b>${i+1}</b><span><strong>${safe(o.label)}</strong><small>${safe(o.detail)}</small></span><span class="choiceMark">${state.selected===i?'✓':'›'}</span></button>`).join('')}</div>`;
  }
  function decisionHtml(d) {
    return `<div class="decisionView"><div class="questionLabel">THE PRIME MINISTER'S DECISION</div><h2>${safe(d.dilemma)}</h2>${optionHtml(d)}<button id="commitBtn" class="lockButton" ${state.selected===null?'disabled':''}>LOCK IN YOUR DECISION <span>→</span></button><p class="keyboardHint">Select 1, 2 or 3 to choose. Discuss before revealing history.</p></div>`;
  }
  function discussionHtml(d) {
    const chosen=d.options[state.answers[d.id]];
    return `<div class="discussionView"><div class="questionLabel"><span class="checkRing">✓</span> DECISION RECORDED</div><h2>${safe(chosen.label)}</h2><div class="yourRisk"><span>WHAT YOU MUST CONSIDER</span><p>${safe(chosen.consider)}</p></div><div class="debatePrompt"><span>ASK THE ROOM</span><h3>${safe(d.discuss)}</h3></div><button id="revealBtn" class="lockButton">REVEAL WHAT REALLY HAPPENED <span>→</span></button></div>`;
  }
  function revealHtml(d, data) {
    return `<div class="revealView"><div class="questionLabel"><span class="checkRing">✓</span> HISTORICAL OUTCOME</div><h2>${safe(d.realityTitle)}</h2><p class="revealShort">${safe(data.outcome)}</p><div class="lessonBox"><span>WHAT THIS TELLS US</span><p>${safe(d.takeaway)}</p></div>
       <details class="moreHistory"><summary>Read more history and sources</summary><p>${safe(d.reality)}</p><div class="sourceLinks">${linkSources(d.sources)}</div></details>
       <div class="revealNote">Your choice did not change the historical result.</div><button class="lockButton" id="nextBtn">${state.idx===chapters().length-1?'VIEW YOUR FINAL DEBRIEF':'NEXT BRIEFING'} <span>→</span></button></div>`;
  }
  function missionHtml() {
    const d=chapter(),data=command(),cs=chapters();
    return `<section class="missionView"><div class="missionStatus"><span class="statusLamp"><i></i> SECURITY CONTROL ROOM</span><span class="pmIdentity">${safe(state.name||'PRIME MINISTER')}</span><span class="chapterCount">BRIEFING ${state.idx+1} / ${cs.length}</span></div>
      ${timeline()}
      <div class="missionHeading"><div><span class="eyebrow">${safe(d.year)} <span class="slash">/</span> ${safe(d.phase)}</span><h1>${safe(d.title)}</h1><p>${safe(d.subtitle)}</p></div><div class="chapterAlert"><span><i></i> SITUATION REPORT</span><strong>${safe(data.alert)}</strong></div></div>
      <div class="controlGrid"><div class="leftWing">
        <section class="monitorPanel"><div class="panelHeader"><span><i class="tinyPulse"></i> SITUATION MAP</span><button type="button" class="mapToggle" id="toggleMap" aria-pressed="${state.mapPaused}">${state.mapPaused?'▶ Play map':'Ⅱ Pause map'}</button></div>${renderMap(data,{paused:state.mapPaused})}</section>
        <section class="intelPanel"><div class="innerHeading"><span>YOUR INTELLIGENCE</span><span>${safe(d.year)}</span></div><p class="intelHeadline">${safe(data.brief)}</p><div class="intelStrips">${d.intel.map(([label,value])=>`<div><b>${safe(label)}</b><span>${safe(value)}</span></div>`).join('')}</div></section>
        ${d.image?`<div class="photoNote"><img src="assets/${safe(d.image)}" alt="Historical photograph from the supplied ${safe(d.phase)} reference card"><div><strong>ARCHIVE IMAGE</strong><span>${safe(d.credit)}</span></div></div>`:''}
      </div>
      <div class="rightWing">${adviserHtml(data)}<section class="decisionPanel">${state.view==='decision'?decisionHtml(d):state.view==='discussion'?discussionHtml(d):revealHtml(d,data)}</section></div></div>
      <div class="missionFootnote">Educational reconstruction. Map movements are schematic, not recorded routes or live intelligence. All advisers' recommendations are fictional teaching dialogue.</div>
    </section>`;
  }
  function finalHtml() {
    const cs=chapters();
    return `<section class="finalView"><div class="completionRibbon"><span class="signalDot"></span> MISSION COMPLETE · MAY 2023</div><h1>YOU MADE THE <em>DECISIONS.</em><br>HISTORY SHOWS THE COST.</h1>
      <p class="finalIntro">${safe(state.name||'Prime Minister')}, you faced ${cs.length} dilemmas. There is no score. Your task was to protect citizens, weigh military risks and consider when a response should end.</p>
      <div class="endStats"><div><strong>${cs.length}</strong><span>Chapters completed</span></div><div><strong>2005</strong><span>Story begins</span></div><div><strong>2023</strong><span>Story ends</span></div></div>
      <div class="finalDebrief"><div><div class="eyebrow">FINAL CABINET QUESTION</div><h2>Can military force end the threat permanently?</h2><p>Each operation addressed a danger, but ceasefires did not remove every armed capability. How should Israel define lasting security?</p></div><div><label for="reflection">YOUR RECOMMENDATION</label><textarea id="reflection" rows="5" placeholder="I would advise the cabinet to... because...">${safe(state.reflection)}</textarea></div></div>
      <h2 class="finalTableHeading">YOUR CABINET RECORD</h2><div class="finalRecords">${cs.map(d=>`<div><b>${safe(d.year)}</b><span>${safe(d.phase)}</span><strong>${safe(d.options[state.answers[d.id]].label)}</strong></div>`).join('')}</div>
      <div class="endActions"><button type="button" class="lockButton" id="exportBtn">EXPORT DEBRIEF ↓</button><button type="button" class="secondaryButton" id="printBtn">PRINT / SAVE AS PDF</button><button type="button" class="secondaryButton" id="playAgain">RESTART SIMULATION ↻</button></div>
      <div class="finalNote">Your choices are hypothetical and did not change history. The simulation ends before 7 October 2023.</div></section>`;
  }
  function paint() {
    stopSpeech();
    $('#restartButton').hidden = state.view === 'home';
    root.innerHTML = state.view === 'home' ? homeHtml() : state.view === 'final' ? finalHtml() : missionHtml();
    bind();
  }
  function bind() {
    $$('[data-route]').forEach(b=>b.addEventListener('click',()=>{state.route=b.dataset.route;const val=$('#nameField')?.value;state.name=val??state.name;paint()}));
    $('#nameField')?.addEventListener('input',e=>{state.name=e.target.value.slice(0,32)});
    $('#startBtn')?.addEventListener('click',()=>{state.idx=0;state.selected=null;state.answers={};state.reflection='';state.view='decision';paint();toTop()});
    $$('[data-choice]').forEach(b=>b.addEventListener('click',()=>{if(state.view!=='decision')return;state.selected=Number(b.dataset.choice);paint();}));
    $('#commitBtn')?.addEventListener('click',()=>{if(state.selected===null)return;state.answers[chapter().id]=state.selected;state.view='discussion';paint();bringDecisionIntoView()});
    $('#revealBtn')?.addEventListener('click',()=>{state.view='revealed';paint();bringDecisionIntoView()});
    $('#nextBtn')?.addEventListener('click',()=>{if(state.idx===chapters().length-1)state.view='final';else{state.idx++;state.selected=null;state.view='decision';}paint();toTop()});
    $('#toggleMap')?.addEventListener('click',()=>{state.mapPaused=!state.mapPaused;$('#visualMap')?.classList.toggle('paused',state.mapPaused);$('#toggleMap').textContent=state.mapPaused?'▶ Play map':'Ⅱ Pause map';$('#toggleMap').setAttribute('aria-pressed',String(state.mapPaused));});
    $$('[data-adviser]').forEach(b=>b.addEventListener('click',()=>listenTo(Number(b.dataset.adviser))));
    $('#reflection')?.addEventListener('input',e=>{state.reflection=e.target.value});
    $('#exportBtn')?.addEventListener('click',exportDebrief);
    $('#printBtn')?.addEventListener('click',()=>window.print());
    $('#playAgain')?.addEventListener('click',restart);
  }
  function toTop(){window.scrollTo({top:0,behavior:'auto'});root.focus({preventScroll:true});}
  function bringDecisionIntoView(){if(window.innerWidth<930)$('.decisionPanel')?.scrollIntoView({block:'start',behavior:'smooth'});}
  function stopSpeech(){if('speechSynthesis' in window)try{window.speechSynthesis.cancel()}catch(e){}}
  function listenTo(n) {
    const b=$(`[data-adviser="${n}"]`);
    if(!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      b?.setAttribute('title','Spoken briefings are not supported in this browser');
      b?.setAttribute('aria-label','Audio not supported in this browser');return;
    }
    const d=command(); const item=[d.defence,d.military,d.diplomacy][n];
    stopSpeech();
    const voice=new SpeechSynthesisUtterance(`${['Defence Minister','IDF Chief of Staff','Diplomatic adviser'][n]}. ${item[1]}`);
    voice.lang='en-GB'; voice.rate=0.94;voice.pitch=1;voice.volume=1;
    if(b){b.classList.add('isSpeaking');b.setAttribute('aria-label','Playing briefing');}
    voice.onend=()=>{b?.classList.remove('isSpeaking');b?.setAttribute('aria-label','Listen to briefing')};
    voice.onerror=voice.onend;
    window.speechSynthesis.speak(voice);
  }
  function restart(){if(state.view!=='home'&&!window.confirm('Restart? Your recorded decisions will be cleared.'))return;state={...state,view:'home',idx:0,selected:null,answers:{},reflection:''};paint();toTop()}
  function exportDebrief(){const lines=['THE GAZA DILEMMA | STANDWITHUS UK EXPLORE','Historical leadership simulation: 2005 to May 2023',`Prime Minister: ${state.name||'Not entered'}`,`Mode: ${state.route==='quick'?'Quick Mission':'Full Briefing'}`,'',...chapters().flatMap(d=>[`${d.year} | ${d.phase}`,`Your decision: ${d.options[state.answers[d.id]].label}`,`Historical outcome: ${d.reality}`,'']),'FINAL RECOMMENDATION:',state.reflection||'No recommendation recorded','','The advisers’ comments were fictional teaching dialogue, not historical quotations.','Historical outcomes are unaffected by player choices.'];const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='gaza_dilemma_cabinet_debrief.txt';document.body.appendChild(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1000)}
  function showModal(type) {
    let title, eyebrow, html;
    if(type==='how'){
      title='How to play';eyebrow='CONTROL ROOM BRIEFING';html=`<div class="guideText"><div class="guideCallout"><strong>You are the Prime Minister.</strong> The cabinet is waiting for your decision.</div><ol><li>Look at the map and read the short intelligence briefing.</li><li>Read or listen to your three advisers.</li><li>Choose one of three responses and lock it in.</li><li>Discuss your choice. What could go wrong?</li><li>Press <strong>Reveal what really happened</strong>, then continue.</li></ol><p><strong>Quick Mission:</strong> 6 decisions for a shorter lesson. <strong>Full Briefing:</strong> 10 decisions from 2005 to May 2023.</p><p>You can use keys 1, 2 and 3 to select a decision. Maps are schematic and animated, not precise military records. You can pause them. Each speaker button reads the simulated advice aloud using your browser's voice, when supported.</p><div class="guideCallout">There are no right answer scores. The historical outcome is the same whichever option you select. Every adviser's comments are fictional teaching dialogue, not an actual quotation.</div></div>`;
    } else if(type==='teacher') {
      title='Educator guide';eyebrow='STANDWITHUS UK · EXPLORE';html=`<div class="guideText"><div class="guideCallout"><strong>Main question:</strong> How should Israel protect its citizens from threats originating in Gaza whilst limiting civilian harm and setting clear boundaries for the use of force?</div><h3>Lesson plan</h3><p><strong>5 minutes:</strong> Introduce the 2005 disengagement and the first rocket attacks, which started before 2005.</p><p><strong>15 to 25 minutes:</strong> Run the Quick Mission. Read or play adviser recommendations and ask students to vote.</p><p><strong>5 minutes:</strong> Debrief. Can a successful military operation deliver lasting security?</p><h3>Debrief prompts</h3><ul><li>What is the immediate danger to Israeli civilians?</li><li>What objective would define success?</li><li>What information is still missing?</li><li>How could military action place civilians on either side at risk?</li><li>When might a limited response be preferable to an expanded campaign?</li><li>What would be the political consequences of taking more territory?</li></ul><h3>Historical accuracy</h3><p>Gilad Shalit was captured on <strong>25 June 2006</strong>, not 2005. Hamas won Palestinian legislative elections in 2006 and took control of Gaza after fighting Fatah in June 2007. Rocket attacks predated disengagement and did not rise every single year. The game ends in May 2023, before the 7 October attacks and subsequent war.</p><p>Two original operation cards require corrections: Israeli deaths in 2012 included two soldiers and four civilians, not six soldiers. In 2014, UN figures record 67 Israeli soldiers and six civilians killed in Israel, not 73 soldiers. Palestinian and militant casualty classifications are contested; avoid presenting estimates as unquestioned facts.</p><h3>About the advisers</h3><p>The named Defence Ministers and IDF Chiefs of Staff held their real offices at the times shown. Their opinions and recommendations in the game are <strong>invented teaching dialogue</strong>, not quotations or verified positions. Noa, the diplomatic adviser, is an entirely fictional role play character. Refer to the Sources section for officeholder lists.</p><h3>Humanitarian considerations</h3><p>Hamas authorities seized UN humanitarian supplies in a documented February 2009 incident; they were later returned. Some armed groups have used ordinary materials, including pipes, to produce rockets. These cases do not mean all supplies were diverted. Students should distinguish documented cases from wider claims and consider how civilians depend on essential goods.</p><p>International humanitarian law requires distinction, proportionality and feasible precautions in attack. These duties apply even when the objective is military. The historical reveals include sources and longer explanations for additional context.</p><h3>Original reference cards</h3><div class="archiveCards"><a href="reference_cards/2006_summer_rains.jpg" target="_blank">2006 Summer Rains ↗</a><a href="reference_cards/2008_cast_lead.jpg" target="_blank">2008 Cast Lead ↗</a><a href="reference_cards/2012_pillar_of_defence.jpg" target="_blank">2012 Pillar of Defence ↗</a><a href="reference_cards/2014_protective_edge.jpg" target="_blank">2014 Protective Edge ↗</a></div></div>`;
    } else {
      title='Sources';eyebrow='HISTORICAL REFERENCE LIBRARY';html=`<div class="guideText"><p>The game uses historical sources to document dates, operations and officeholders. The cabinet conversations are fictionalised for teaching. The map animations are schematic.</p><div class="sourceList">${Object.values(SOURCES).map(s=>`<a class="sourceItem" target="_blank" rel="noopener noreferrer" href="${safe(s.url)}">${safe(s.label)} ↗</a>`).join('')}</div></div>`;
    }
    $('#modalTitle').textContent=title;$('#modalEyebrow').textContent=eyebrow;$('#modalBody').innerHTML=html;dialog.showModal();
  }
  $('#howButton').addEventListener('click',()=>showModal('how'));
  $('#teacherButton').addEventListener('click',()=>showModal('teacher'));
  $('#sourcesButton').addEventListener('click',()=>showModal('sources'));
  $('#closeDialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  $('#goHome').addEventListener('click',()=>{if(state.view!=='home')restart();else toTop()});
  $('#restartButton').addEventListener('click',restart);
  document.addEventListener('keydown',event=>{if(dialog.open||state.view!=='decision'||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||''))return;const n=Number(event.key)-1;if(n>=0&&n<3){state.selected=n;paint();}});
  window.addEventListener('pagehide',stopSpeech);
  paint();
})();
