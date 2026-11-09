/* The Gaza Dilemma | historical episodes and source references.
   Choices and prospective assessments are fictional cabinet deliberations.
   Reveal panels describe verified history, not counterfactual outcomes. */
window.GAZA_SOURCES = {
  disengagement: {label:'Israeli government: Disengagement from Gaza, 2005',url:'https://www.gov.il/en/pages/israel-s-disengagement-from-gaza-and-north-samaria'},
  rockets: {label:'Israeli government: Rocket threat from Gaza, 2000 to 2007',url:'https://www.gov.il/en/pages/rocket-threat-from-the-gaza-strip-2000-2007'},
  crs: {label:'Congressional Research Service: Hamas background and timeline',url:'https://www.everycrsreport.com/reports/R41514.html'},
  summer: {label:'Israel Ministry of Defence: 2006 and Operation Summer Rains',url:'https://archives.mod.gov.il/sites/English/theTimeAxis/Pages/2006.aspx'},
  shalit: {label:'IDF: Gilad Shalit returns home, October 2011',url:'https://www.idf.il/en/mini-sites/wars-and-operations/gilad-shalit-exchange/'},
  cast: {label:'IDF: Operation Cast Lead',url:'https://www.idf.il/en/mini-sites/wars-and-operations/operation-cast-lead/'},
  pillar: {label:'IDF: Operation Pillar of Defence',url:'https://www.idf.il/en/mini-sites/wars-and-operations/operation-pillar-of-defence/operation-pillar-of-defense/'},
  pillarUN: {label:'UN OCHA: 2012 Gaza hostilities assessment',url:'https://www.un.org/unispal/document/auto-insert-193680/'},
  protective: {label:'UN OCHA: Key figures on the 2014 hostilities',url:'https://www.ochaopt.org/content/key-figures-2014-hostilities'},
  protectiveUN: {label:'UN commission: 2014 hostilities and military objectives',url:'https://www.un.org/unispal/document/auto-insert-185919/'},
  guardian: {label:'IDF: Operation Guardian of the Walls',url:'https://www.idf.il/28664'},
  dawn: {label:'IDF: Operation Breaking Dawn, August 2022',url:'https://www.idf.il/en/articles/2022/everything-you-missed-on-operation-breaking-dawn/'},
  arrow: {label:'IDF: Operation Shield and Arrow, May 2023',url:'https://www.idf.il/en/mini-sites/operation-shield-and-arrow/summary-of-operation-shield-and-arrow/'},
  aid: {label:'UNRWA: Confiscation of food and blankets, February 2009',url:'https://www.unrwa.org/newsroom/press-releases/unrwa-suspends-imports-gaza-following-aid-confiscation'},
  aidreturn: {label:'UN OCHA: Confiscated aid returned, February 2009',url:'https://www.ochaopt.org/sites/default/files/ocha_opt_gaza_humanitarian_situation_report_2009_02_09_english.pdf'},
  pipes: {label:'Reuters: Civilian materials and locally made rockets, 2021',url:'https://www.euronews.com/2021/05/23/us-israel-palestinians-rockets-insight'},
  law: {label:'International Committee of the Red Cross: Rules governing protection of civilians',url:'https://www.icrc.org/en/law-and-policy/conduct-hostilities-and-protection-civilians'}
};
window.GAZA_SCENARIOS = [
  {
    id:'2005',year:'2005',phase:'THE WITHDRAWAL',title:'You have left Gaza. What happens next?',
    subtitle:'The disengagement is complete. But the rockets have not stopped.',
    tags:['Border security','Withdrawal'],image:null,
    brief:'Israel has removed its soldiers and settlements from Gaza. Many Israelis hope the move will improve security. Rockets were already being fired from Gaza before 2005, and attacks continue after the withdrawal.',
    intel:[['SECURITY','Communities close to Gaza face repeated alarms.'],['POLITICS','Some Israelis support withdrawal. Others fear it will create new dangers.'],['CONSTRAINT','You cannot promise that withdrawal alone will stop attacks.']],
    dilemma:'Your first priority as Prime Minister?',
    options:[
      {label:'Build stronger civilian protection',detail:'Invest in shelters, early warnings and border defence.',category:'Defence',consider:'This directly protects communities. It may reduce casualties but does not remove the groups launching rockets.'},
      {label:'Authorise limited responses',detail:'Respond to launch activity with focused security action.',category:'Targeted action',consider:'This may disrupt immediate attacks. Mistakes or escalation could endanger civilians on both sides.'},
      {label:'Seek regional security arrangements',detail:'Ask Egypt and international partners to press armed groups to halt attacks.',category:'Diplomacy',consider:'Pressure may help create quieter periods. Enforcement is uncertain when armed groups do not accept the arrangement.'}
    ],
    discuss:'If Israel has withdrawn from Gaza, what security responsibility does it still have towards citizens under rocket fire?',
    realityTitle:'What actually happened',
    reality:'Israel completed its withdrawal of military forces and settlers from Gaza in 2005. Rocket attacks had begun earlier and continued afterwards. The political situation inside Gaza then changed dramatically.',
    takeaway:'A territorial withdrawal does not by itself guarantee that attacks across the border will end.',
    sources:['disengagement','rockets','crs']
  },
  {
    id:'2006',year:'2006',phase:'SUMMER RAINS',title:'A soldier is captured across the border',
    subtitle:'Gilad Shalit is taken into Gaza. Rockets continue to fall.',
    tags:['Hostage','Ground operation'],image:'summer_rains.jpg',credit:'IDF paratroopers during Summer Rains. Photograph: IDF. Supplied teaching card.',
    brief:'On 25 June 2006, armed militants attack an Israeli position near Kerem Shalom. Two soldiers are killed and Gilad Shalit is captured and taken to Gaza. You must consider how to bring him home and protect communities from rocket fire.',
    intel:[['SECURITY','A captured soldier may be held in an unknown location.'],['PUBLIC','Families want the soldier returned. Border communities demand protection.'],['CONSTRAINT','A large operation may put civilians and the captive at risk.']],
    dilemma:'How do you respond?',
    options:[
      {label:'Prioritise negotiations',detail:'Work through intermediaries to secure Shalit’s return.',category:'Diplomacy',consider:'Talks may open a route to his release, but could take years and may not stop rocket launches.'},
      {label:'Order focused military pressure',detail:'Strike identified armed infrastructure while seeking information on the captive.',category:'Targeted action',consider:'This may disrupt militant activity. Reliable intelligence and protection of civilians remain essential.'},
      {label:'Launch a broader operation',detail:'Use ground forces alongside other measures to pressure armed groups.',category:'Major operation',consider:'Ground action can reach areas other methods cannot. It also creates high risks for soldiers, the captive and civilians.'}
    ],
    discuss:'Is recovering one captive soldier enough reason to begin a major military campaign?',
    realityTitle:'Operation Summer Rains',
    reality:'Israel launched Operation Summer Rains on 28 June 2006, using air and ground operations. Gilad Shalit was not recovered during the campaign. He remained captive until a prisoner exchange in 2011.',
    takeaway:'Military pressure did not resolve the hostage crisis. The question of how far to go remained open.',
    sources:['summer','shalit']
  },
  {
    id:'2007',year:'2007',phase:'HAMAS TAKES CONTROL',title:'A new authority rules Gaza',
    subtitle:'Hamas defeats Fatah forces and consolidates its control.',
    tags:['Hamas','Tunnels and resources'],image:null,
    brief:'After winning the 2006 Palestinian legislative election, Hamas takes control of Gaza in June 2007 following violent fighting with Fatah. Israel fears further rocket attacks, weapons smuggling and the growth of tunnel networks. Gaza’s population still needs food, water and building supplies.',
    intel:[['SECURITY','Armed groups are developing weapons and tunnel capabilities.'],['CIVILIANS','Ordinary Gaza residents depend on essential goods and services.'],['CONSTRAINT','Some materials have civilian uses and possible military uses.']],
    dilemma:'How do you restrict weapons without harming ordinary families?',
    options:[
      {label:'Tighten controls on dual use goods',detail:'Increase inspections while maintaining essential humanitarian supply.',category:'Defence',consider:'Controls may limit some military supplies, but delays and restrictions can disrupt civilian life.'},
      {label:'Target smuggling networks',detail:'Focus intelligence and security pressure on armed infrastructure.',category:'Targeted action',consider:'Focused operations may disrupt smuggling. Intelligence is imperfect and people nearby may be endangered.'},
      {label:'Use regional diplomatic pressure',detail:'Work with Egypt and other partners to reduce weapons transfers.',category:'Diplomacy',consider:'Joint action may reduce smuggling without broad restrictions. Results depend on cooperation and enforcement.'}
    ],
    discuss:'How do you distinguish materials needed for civilian life from materials that might be diverted to weapons or tunnels?',
    realityTitle:'Hamas consolidates control',
    reality:'Hamas took control of Gaza in June 2007. Israel and Egypt subsequently maintained restrictions on movement and goods, while Israel pursued measures against rockets and smuggling. Tunnel networks and military capabilities developed further in the years that followed.',
    takeaway:'Stopping weapons transfers and protecting access to civilian essentials can pull policy in different directions. Claims about diversion need evidence in each case.',
    sources:['disengagement','crs','rockets']
  },
  {
    id:'2008',year:'2008',phase:'CAST LEAD',title:'Rocket fire intensifies',
    subtitle:'After a fragile truce breaks down, southern Israeli towns face barrages.',
    tags:['Rocket attacks','Military escalation'],image:'cast_lead.jpg',credit:'Israeli armoured vehicles during Operation Cast Lead. Photograph: Nati Shohat, Flash90. Supplied teaching card.',
    brief:'By December 2008, the fragile ceasefire has collapsed amid clashes and rocket fire. The government must decide whether to keep seeking a truce or launch a larger military campaign aimed at rocket capabilities and Hamas infrastructure.',
    intel:[['SECURITY','Rocket fire is disrupting everyday life in southern Israel.'],['MILITARY','Air strikes may not reach every threat. Ground forces could be required.'],['CONSTRAINT','Fighting in a crowded territory creates serious risks for civilians.']],
    dilemma:'How far should Israel go to suppress rocket fire?',
    options:[
      {label:'Try a renewed ceasefire',detail:'Seek an arrangement through Egyptian mediation.',category:'Diplomacy',consider:'A renewed truce may reduce immediate danger, but without enforcement rockets could resume.'},
      {label:'Conduct focused air operations',detail:'Attack verified military objectives with civilian precautions.',category:'Targeted action',consider:'Focused action may limit the scale of fighting, but may leave parts of the rocket network intact.'},
      {label:'Prepare a major campaign',detail:'Combine air operations with a possible ground entry.',category:'Major operation',consider:'A larger campaign can degrade more infrastructure. It increases risks to civilians and Israeli soldiers.'}
    ],
    discuss:'What would count as a successful operation: stopping attacks for months, for years, or removing Hamas entirely?',
    realityTitle:'Operation Cast Lead',
    reality:'Israel launched Operation Cast Lead on 27 December 2008. Ground forces entered Gaza in January 2009. The operation ended on 18 January. Hamas suffered military losses, but remained in control of Gaza and rocket attacks were not ended permanently. In February 2009, UNRWA reported two seizures of its food and other aid supplies by Hamas authorities. UN OCHA reported that the supplies were returned days later.',
    takeaway:'An operation can disrupt an immediate threat without eliminating the organisation responsible for it.',
    sources:['cast','crs','aid','aidreturn']
  },
  {
    id:'2011',year:'2011',phase:'THE PRISONER EXCHANGE',title:'Five years later, Shalit is still captive',
    subtitle:'A proposed prisoner exchange is on your desk.',
    tags:['Hostage negotiation','Difficult compromise'],image:'summer_rains.jpg',credit:'2006 photograph of IDF troops. Photograph: IDF. Supplied teaching card.',
    brief:'Gilad Shalit has been held in Gaza since June 2006. Negotiators have worked for years to reach a deal. A proposed exchange would bring him home but require Israel to release a large number of Palestinian prisoners.',
    intel:[['PUBLIC','Shalit’s family and supporters demand his return.'],['SECURITY','Releasing prisoners may create future security risks.'],['CONSTRAINT','Rejecting a deal may leave the soldier in captivity indefinitely.']],
    dilemma:'Would you agree to a prisoner exchange?',
    options:[
      {label:'Accept the exchange',detail:'Secure Shalit’s return despite significant security concerns.',category:'Diplomacy',consider:'A captive soldier comes home. You must consider the possible future consequences of prisoner releases.'},
      {label:'Continue negotiating',detail:'Seek different terms before agreeing.',category:'Diplomacy',consider:'You may secure better terms, or lose an opportunity to bring Shalit home.'},
      {label:'Reject the proposed terms',detail:'Maintain a tougher position on prisoner releases.',category:'Defence',consider:'This may avoid some security risks, but places a heavy burden on the captive and his family.'}
    ],
    discuss:'Does a government have a duty to bring a captive soldier home at almost any price?',
    realityTitle:'Gilad Shalit returns home',
    reality:'On 18 October 2011, Israel completed an exchange in which Gilad Shalit returned home. Israel released 1,027 Palestinian prisoners as part of the agreement. The deal prompted intense debate inside Israel about security and responsibility towards soldiers.',
    takeaway:'Not every important security dilemma is resolved through military force.',
    sources:['shalit']
  },
  {
    id:'2012',year:'2012',phase:'PILLAR OF DEFENCE',title:'Rockets reach further into Israel',
    subtitle:'A major escalation raises the question of another ground invasion.',
    tags:['Air operation','Iron Dome'],image:'pillar_defence.jpg',credit:'Rocket damage in Ashdod, November 2012. Photograph: Gili Yaari, Flash90. Supplied teaching card.',
    brief:'Rocket fire threatens southern and central Israel. The Iron Dome system can intercept some rockets heading towards populated areas, but it cannot eliminate the threat. The cabinet must decide whether a campaign should remain focused or expand.',
    intel:[['SECURITY','More Israeli cities are within rocket range.'],['DEFENCE','Iron Dome offers protection, but not a complete solution.'],['CONSTRAINT','Ground operations bring greater dangers for civilians and troops.']],
    dilemma:'Do you send the army into Gaza?',
    options:[
      {label:'Keep the campaign air focused',detail:'Use air operations and missile defence without a ground entry.',category:'Targeted action',consider:'This limits exposure of ground troops, but some threats may survive.'},
      {label:'Authorise a ground operation',detail:'Send forces to confront armed infrastructure directly.',category:'Major operation',consider:'Ground forces may reach more sites, but the expected cost in lives and escalation is greater.'},
      {label:'Press for a rapid ceasefire',detail:'Use Egyptian mediation while maintaining civilian defences.',category:'Diplomacy',consider:'A ceasefire can reduce immediate harm, but may leave the underlying capabilities untouched.'}
    ],
    discuss:'If missile defence saves lives, does it make a major offensive less necessary?',
    realityTitle:'Operation Pillar of Defence',
    reality:'Israel launched Operation Pillar of Defence on 14 November 2012, targeting Hamas and other armed groups. There was no Israeli ground invasion. The eight day operation ended with an Egyptian brokered ceasefire on 21 November. Two Israeli soldiers and four Israeli civilians were killed during the hostilities.',
    takeaway:'Military restraint can mean limiting the scale of an operation, not simply doing nothing.',
    sources:['pillar','pillarUN']
  },
  {
    id:'2014',year:'2014',phase:'PROTECTIVE EDGE',title:'The tunnel threat comes into focus',
    subtitle:'Rocket barrages and cross border tunnels raise the stakes.',
    tags:['Assault tunnels','Civilian protection'],image:'protective_edge.jpg',credit:'Funeral for three murdered Israeli teenagers, July 2014. Photograph: Yonatan Sindel, Flash90. Supplied teaching card.',
    brief:'After the murder of three Israeli teenagers in the West Bank and a wider cycle of violence, rocket fire escalates from Gaza. Israel identifies tunnels extending towards its territory. The government must decide how to deal with an underground threat while fighting in populated areas.',
    intel:[['SECURITY','Cross border tunnels may enable attacks on Israeli communities.'],['MILITARY','Ground troops may be needed to locate and dismantle tunnels.'],['CONSTRAINT','Large scale combat risks serious civilian loss and destruction in Gaza.']],
    dilemma:'What should be the limits of a ground operation?',
    options:[
      {label:'Limit the mission to tunnels',detail:'Authorise a defined ground mission, then seek a ceasefire.',category:'Targeted action',consider:'A narrower aim may reduce escalation. Some armed capabilities are likely to remain.'},
      {label:'Expand the campaign against Hamas',detail:'Pursue broader military degradation beyond the tunnel network.',category:'Major operation',consider:'This may damage more military infrastructure, but brings much higher risks and an uncertain political end state.'},
      {label:'Seek a ceasefire before entering',detail:'Prioritise mediation while strengthening border security.',category:'Diplomacy',consider:'This may spare civilian lives in the short term. Tunnel threats could remain unresolved.'}
    ],
    discuss:'Where is the boundary between removing a specific military threat and attempting to remove the organisation that created it?',
    realityTitle:'Operation Protective Edge',
    reality:'Israel launched Operation Protective Edge on 8 July 2014 and began a ground operation on 17 July focused in part on tunnels. A ceasefire took hold on 26 August. UN reporting records 67 Israeli soldiers and six civilians in Israel killed, alongside 2,251 Palestinians, including 1,462 civilians. Hamas remained in power.',
    takeaway:'The costs of a prolonged operation can be immense. Civilian protection and clearly defined military aims are central to the decision.',
    sources:['protective','protectiveUN','law']
  },
  {
    id:'2021',year:'2021',phase:'GUARDIAN OF THE WALLS',title:'Rockets target Jerusalem and central Israel',
    subtitle:'Another major confrontation erupts.',
    tags:['Air campaign','Diplomatic pressure'],image:null,
    brief:'Amid tensions in Jerusalem, Hamas fires rockets towards the city on 10 May 2021. Thousands more are launched during the ensuing fighting. Israel seeks to damage Hamas and Palestinian Islamic Jihad military capabilities while protecting civilians and ending the escalation.',
    intel:[['SECURITY','Large barrages put millions of Israelis on alert.'],['MILITARY','Armed infrastructure is often in densely populated areas.'],['CONSTRAINT','Longer fighting increases civilian harm and international pressure.']],
    dilemma:'How do you seek a durable end to the fighting?',
    options:[
      {label:'Use targeted strikes and clear limits',detail:'Focus on verified military objectives and review each strike.',category:'Targeted action',consider:'A more limited approach may reduce some risks, but does not guarantee a lasting halt to attacks.'},
      {label:'Expand the offensive',detail:'Seek greater damage to Hamas military capabilities.',category:'Major operation',consider:'Broader action may cause greater military disruption, alongside greater civilian and diplomatic costs.'},
      {label:'Move quickly towards mediation',detail:'Seek a ceasefire alongside continued defence of Israeli communities.',category:'Diplomacy',consider:'A ceasefire can halt immediate violence, but does not remove the underlying conflict.'}
    ],
    discuss:'If Israel damages a rocket network but another war follows years later, was the operation a success?',
    realityTitle:'Operation Guardian of the Walls',
    reality:'Operation Guardian of the Walls lasted from 10 to 21 May 2021. Hamas and Palestinian Islamic Jihad launched thousands of rockets at Israel; the IDF struck armed infrastructure in Gaza. A ceasefire ended the operation. Gaza’s armed organisations were weakened but not removed. Reporting in 2021 also described how armed groups used ordinary materials, including pipes, to manufacture rockets.',
    takeaway:'An operational achievement is not always the same as a lasting political solution.',
    sources:['guardian','pipes','law']
  },
  {
    id:'2022',year:'2022',phase:'BREAKING DAWN',title:'A threat from Palestinian Islamic Jihad',
    subtitle:'Not every escalation begins with Hamas.',
    tags:['Palestinian Islamic Jihad','Limited campaign'],image:null,
    brief:'In August 2022, Israeli intelligence assesses an imminent threat from Palestinian Islamic Jihad following the arrest of one of its leaders in the West Bank. Israel must decide whether to act before an attack, while trying to prevent Hamas from entering the fighting.',
    intel:[['SECURITY','Israeli border communities face an assessed imminent threat.'],['POLITICS','Hamas and Palestinian Islamic Jihad are distinct organisations.'],['CONSTRAINT','An expanded confrontation could draw in more armed factions.']],
    dilemma:'How narrowly should Israel define the target?',
    options:[
      {label:'Limit action to Islamic Jihad',detail:'Focus the response on the organisation linked to the threat.',category:'Targeted action',consider:'A narrow target set may help avoid a wider conflict. It cannot guarantee other groups stay out.'},
      {label:'Prepare for a wider campaign',detail:'Be ready to act against additional armed groups if fighting expands.',category:'Major operation',consider:'This may deter involvement by other groups, but could also widen the conflict.'},
      {label:'Give mediation more time',detail:'Maintain defensive measures while partners seek de escalation.',category:'Diplomacy',consider:'This may avert hostilities. The assessed immediate threat may continue during the talks.'}
    ],
    discuss:'Why might Israel choose to confront one armed group while avoiding a wider war with Hamas?',
    realityTitle:'Operation Breaking Dawn',
    reality:'Israel launched Operation Breaking Dawn on 5 August 2022 against Palestinian Islamic Jihad. The operation lasted three days. Hamas did not join the fighting in a major way, and an Egyptian mediated ceasefire took effect on 7 August.',
    takeaway:'Defining a narrower adversary can be an important strategic choice.',
    sources:['dawn']
  },
  {
    id:'2023',year:'2023',phase:'SHIELD AND ARROW',title:'The cycle has still not ended',
    subtitle:'More rockets. Another cabinet decision. It is May 2023.',
    tags:['Leadership','The limits of force'],image:null,
    brief:'After rocket attacks by Palestinian Islamic Jihad, Israel considers another limited operation. You have now seen almost two decades of decisions involving defence, military action and mediation. The immediate threat matters, but so does the longer term picture.',
    intel:[['SECURITY','A fresh round of rockets threatens Israeli towns.'],['MILITARY','Armed groups have rebuilt some capabilities after earlier operations.'],['CONSTRAINT','No single military decision can guarantee permanent security.']],
    dilemma:'What is the clearest objective for this operation?',
    options:[
      {label:'Reduce the immediate threat',detail:'Use a narrowly focused operation to stop attacks.',category:'Targeted action',consider:'This is a limited, measurable aim. It may not prevent renewed attacks in the future.'},
      {label:'Seek deeper military degradation',detail:'Target a broader set of military capabilities.',category:'Major operation',consider:'The goal is more ambitious. Civilian and escalation risks may rise, without certainty of lasting results.'},
      {label:'Prioritise a ceasefire arrangement',detail:'Use diplomacy and defensive measures to halt the exchange of fire.',category:'Diplomacy',consider:'This may stop fighting sooner but does not remove armed capabilities.'}
    ],
    discuss:'If the threat returns after successive campaigns, where should Israel draw the line between deterrence, defence and eliminating armed groups?',
    realityTitle:'Operation Shield and Arrow',
    reality:'Israel launched Operation Shield and Arrow on 9 May 2023 against Palestinian Islamic Jihad leaders and infrastructure. A ceasefire took effect on 13 May. The game ends here, before the attacks of 7 October 2023 and the war that followed.',
    takeaway:'Israel’s recurring dilemma was not simply whether to use force, but what force could realistically achieve and at what cost.',
    sources:['arrow','law']
  }
];
