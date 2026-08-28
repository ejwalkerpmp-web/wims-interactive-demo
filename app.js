/* ===== WIMS Demonstrator — app.js =====
   All displayed values are PRECOMPUTED illustrative outputs from synthetic clean-room
   inputs. The browser performs NO WIMI calculation, threshold logic, or scoring.
   Architecture shown; calculation engine protected.
*/
'use strict';

/* ---- precomputed synthetic data (clean-room) ---- */
const DATA = {
  cases: [
    {
      key: 'rcp', name: 'RCP Replacement', type: 'Generic PWR Reactor Coolant Pump Replacement',
      wimi: 73.3, confidence: 86, p50: 13.4, p80: 14.9, p90: 15.9,
      band: { label: 'Conditionally ready', status: 'warn' },
      lost: 2.5, saved: 2.1, roi: 8.4, wimiDelta: 9.3, afterTail: 0.4,
      dimensions: [
        { name: 'Design Maturity', score: 82, comp: 84, status: 'good' }, { name: 'Configuration Certainty', score: 73, comp: 80, status: 'warn' },
        { name: 'Constructability', score: 68, comp: 77, status: 'warn' }, { name: 'Supply Chain', score: 71, comp: 79, status: 'warn' },
        { name: 'Workforce Readiness', score: 78, comp: 82, status: 'warn' }, { name: 'Tooling / Mock-up', score: 64, comp: 75, status: 'bad' },
        { name: 'Logistics / Lift', score: 76, comp: 81, status: 'warn' }, { name: 'Procedure / Work Package', score: 70, comp: 78, status: 'warn' },
        { name: 'Testing / Commissioning', score: 80, comp: 83, status: 'good' }, { name: 'OE / Repetition', score: 90, comp: 88, status: 'good' },
        { name: 'Interface Maturity', score: 67, comp: 77, status: 'warn' }, { name: 'Schedule Margin', score: 62, comp: 74, status: 'bad' },
      ],
      drivers: [
        ['Schedule margin', 'Current contingency below target', 'High'],
        ['Tooling / mock-up', 'Installation tooling not fully demonstrated', 'High'],
        ['Interface certainty', 'Critical tolerance validation incomplete', 'High'],
        ['Procedure quality', 'Configuration controls require final validation', 'Medium'],
        ['Critical spares', 'Contingency inventory incomplete', 'Medium'],
      ],
      oe: [
        ['RCP seal failure', 'Seal / configuration / cooling', 'Medium', 'NRC public OE'],
        ['Motor bearing lubrication degradation', 'Bearing / lubrication / vibration', 'High', 'NRC public OE'],
        ['Seal damage during maintenance evolution', 'Procedure / configuration / human performance', 'High', 'NRC public OE'],
        ['Shaft degradation detected by vibration', 'Shaft / vibration monitoring', 'Medium', 'NRC public OE'],
      ],
      oeStats: { indexed: 247, high: 61, signatures: 7 },
      gates: [
        ['Gate 1 — Concept', 'PASS'], ['Gate 2 — Scope Definition', 'PASS'],
        ['Gate 3 — Engineering Readiness', 'PASS WITH CONDITIONS'],
        ['Gate 4 — Installation Readiness', 'HOLD'],
        ['Gate 5 — Execution', 'NOT OPEN'], ['Gate 6 — Return to Service', 'NOT OPEN'],
      ],
      intervention: { name: 'Mock-up + tolerance verification + procedure freeze', cost: 250000, newWimi: 82.6, newP90: 13.8, vpd: 1000000 },
      distBase: [12,28,52,74,88,96,90,78,62,48,38,30,24,20,17,15],
      distAfter: [26,58,82,94,88,72,54,40,30,23,18,14,11,9,8,7],
      sensitivity: [
        { vpd: 500000, roi: 4.2 }, { vpd: 750000, roi: 6.3 }, { vpd: 1000000, roi: 8.4 },
        { vpd: 1250000, roi: 10.5 }, { vpd: 1500000, roi: 12.6 }, { vpd: 1750000, roi: 14.7 },
        { vpd: 2000000, roi: 16.8 }, { vpd: 2250000, roi: 18.9 }, { vpd: 2500000, roi: 21.0 }, { vpd: 3000000, roi: 25.2 },
      ],
    },
    {
      key: 'turbine', name: 'Major Turbine Modification', type: 'Generic Nuclear Turbine / Generator Modification',
      wimi: 68.7, confidence: 82, p50: 22.8, p80: 26.4, p90: 29.6,
      band: { label: 'Conditionally ready', status: 'warn' },
      lost: 6.8, saved: 5.5, roi: 11.0, wimiDelta: 11.7, afterTail: 1.3,
      dimensions: [
        { name: 'Design Maturity', score: 74, comp: 78, status: 'warn' }, { name: 'Configuration Certainty', score: 66, comp: 74, status: 'warn' },
        { name: 'Constructability', score: 63, comp: 73, status: 'warn' }, { name: 'Supply Chain', score: 69, comp: 76, status: 'warn' },
        { name: 'Workforce Readiness', score: 76, comp: 79, status: 'warn' }, { name: 'Tooling / Mock-up', score: 61, comp: 72, status: 'bad' },
        { name: 'Logistics / Lift', score: 65, comp: 74, status: 'warn' }, { name: 'Procedure / Work Package', score: 68, comp: 75, status: 'warn' },
        { name: 'Testing / Commissioning', score: 72, comp: 77, status: 'warn' }, { name: 'OE / Repetition', score: 79, comp: 81, status: 'warn' },
        { name: 'Interface Maturity', score: 60, comp: 71, status: 'bad' }, { name: 'Schedule Margin', score: 58, comp: 70, status: 'bad' },
      ],
      drivers: [
        ['Interface maturity', 'Multiple mechanical/electrical/BOP interfaces', 'High'],
        ['Heavy lift logistics', 'Crane path and laydown dependencies', 'High'],
        ['Schedule margin', 'Critical path contains low-float activities', 'High'],
        ['Tooling readiness', 'Special tooling qualification incomplete', 'Medium'],
        ['Commissioning', 'Integrated test sequence not fully matured', 'Medium'],
      ],
      oe: [
        ['Generator rotor replacement experience', 'Heavy component / alignment', 'High', 'Public industry OE'],
        ['Turbine train alignment lessons', 'Alignment / metrology', 'High', 'Public industry OE'],
        ['Crane and laydown constraints', 'Logistics / constructability', 'High', 'Public industry OE'],
        ['Post-maintenance vibration issues', 'Testing / commissioning', 'Medium', 'Public industry OE'],
      ],
      oeStats: { indexed: 164, high: 44, signatures: 9 },
      gates: [
        ['Gate 1 — Concept', 'PASS'], ['Gate 2 — Scope Definition', 'PASS'],
        ['Gate 3 — Engineering Readiness', 'HOLD'],
        ['Gate 4 — Installation Readiness', 'NOT OPEN'],
        ['Gate 5 — Execution', 'NOT OPEN'], ['Gate 6 — Return to Service', 'NOT OPEN'],
      ],
      intervention: { name: '3D interface closure + lift simulation + integrated test plan', cost: 600000, newWimi: 80.4, newP90: 24.1, vpd: 1200000 },
      distBase: [10,22,40,60,74,82,88,80,66,52,40,32,26,22,19,16],
      distAfter: [24,52,74,86,80,66,50,38,28,22,17,13,10,8,7,6],
      sensitivity: [
        { vpd: 500000, roi: 4.6 }, { vpd: 750000, roi: 6.9 }, { vpd: 1000000, roi: 9.2 },
        { vpd: 1200000, roi: 11.0 }, { vpd: 1500000, roi: 13.8 }, { vpd: 1750000, roi: 16.0 },
        { vpd: 2000000, roi: 18.3 }, { vpd: 2250000, roi: 20.6 }, { vpd: 2500000, roi: 22.9 }, { vpd: 3000000, roi: 27.5 },
      ],
    },
    {
      key: 'sg', name: 'Steam Generator Replacement', type: 'Generic PWR Steam Generator Replacement',
      wimi: 60.9, confidence: 79, p50: 47.5, p80: 55.8, p90: 61.9,
      band: { label: 'Execution risk elevated', status: 'risk' },
      lost: 14.4, saved: 9.2, roi: 7.7, wimiDelta: 14.9, afterTail: 5.2,
      dimensions: [
        { name: 'Design Maturity', score: 69, comp: 74, status: 'warn' }, { name: 'Configuration Certainty', score: 58, comp: 69, status: 'bad' },
        { name: 'Constructability', score: 55, comp: 67, status: 'bad' }, { name: 'Supply Chain', score: 57, comp: 68, status: 'bad' },
        { name: 'Workforce Readiness', score: 70, comp: 75, status: 'warn' }, { name: 'Tooling / Mock-up', score: 52, comp: 66, status: 'bad' },
        { name: 'Logistics / Lift', score: 56, comp: 68, status: 'bad' }, { name: 'Procedure / Work Package', score: 62, comp: 71, status: 'bad' },
        { name: 'Testing / Commissioning', score: 65, comp: 72, status: 'warn' }, { name: 'OE / Repetition', score: 76, comp: 78, status: 'warn' },
        { name: 'Interface Maturity', score: 53, comp: 66, status: 'bad' }, { name: 'Schedule Margin', score: 48, comp: 64, status: 'bad' },
      ],
      drivers: [
        ['Schedule margin', 'Long critical path and outage coupling', 'High'],
        ['Supply chain', 'Long-lead component and specialty tooling dependencies', 'High'],
        ['Constructability', 'Large-component routing and containment interfaces', 'High'],
        ['Interface maturity', 'Piping/support/tolerance closure incomplete', 'High'],
        ['Workforce readiness', 'Specialty craft depth and sequencing risk', 'Medium'],
      ],
      oe: [
        ['Steam generator replacement campaigns', 'Large component replacement / repetition', 'High', 'Public industry OE'],
        ['Heavy-lift containment access', 'Logistics / temporary works', 'High', 'Public industry OE'],
        ['Piping fit-up and weld sequencing', 'Interface / constructability', 'High', 'Public industry OE'],
        ['Post-modification testing', 'Testing / startup', 'Medium', 'Public industry OE'],
      ],
      oeStats: { indexed: 312, high: 83, signatures: 12 },
      gates: [
        ['Gate 1 — Concept', 'PASS'], ['Gate 2 — Scope Definition', 'PASS WITH CONDITIONS'],
        ['Gate 3 — Engineering Readiness', 'HOLD'],
        ['Gate 4 — Installation Readiness', 'NOT OPEN'],
        ['Gate 5 — Execution', 'NOT OPEN'], ['Gate 6 — Return to Service', 'NOT OPEN'],
      ],
      intervention: { name: 'Full-scale constructability + interface closure + supply-chain assurance', cost: 1800000, newWimi: 75.8, newP90: 52.7, vpd: 1500000 },
      distBase: [8,16,30,48,62,72,80,74,62,50,40,33,28,24,21,18],
      distAfter: [20,44,66,78,72,58,44,34,26,20,16,13,10,8,7,6],
      sensitivity: [
        { vpd: 500000, roi: 2.6 }, { vpd: 750000, roi: 3.8 }, { vpd: 1000000, roi: 5.1 },
        { vpd: 1250000, roi: 6.4 }, { vpd: 1500000, roi: 7.7 }, { vpd: 1750000, roi: 8.9 },
        { vpd: 2000000, roi: 10.2 }, { vpd: 2250000, roi: 11.5 }, { vpd: 2500000, roi: 12.8 }, { vpd: 3000000, roi: 15.3 },
      ],
    },
  ],
  fleet: {
    avgWimi: 67.7,
    totalExp: 32.3,   // $M modeled tail exposure
    totalRet: 22.5,   // $M potentially retireable
  },
};

/* ---- tiny helpers (presentation only — no protected computation) ---- */
const $ = (s, r = document) => r.querySelector(s);
const money = (n) => n >= 1000 ? '$' + (n / 1000).toFixed(2) + 'M' : '$' + (n).toFixed(0) + 'k';
const moneyShort = (n) => '$' + n.toFixed(1) + 'M';
const sevBadge = (s) => s === 'High' ? 'h' : s === 'Medium' ? 'm' : 'l';
const gateClass = (g) => g.includes('PASS WITH') ? 'cond' : g === 'PASS' ? 'pass' : g === 'HOLD' ? 'hold' : 'closed';
const statText = s => s==='ready'?'Ready':s==='warn'?'Conditional':s==='risk'?'Elevated':'Low';

let current = DATA.cases[0];

/* ---- tab switching ---- */
function setupTabs() {
  const tabs = document.querySelectorAll('.tabs .tab');
  const screens = document.querySelectorAll('.screen');
  const switchTo = (target) => {
    tabs.forEach(t => { const on = t.dataset.s === target; t.classList.toggle('active', on); t.setAttribute('aria-selected', on); });
    screens.forEach(s => s.classList.toggle('active', s.id === target));
    document.querySelectorAll('.bottom-nav .tab').forEach(t => t.classList.toggle('active', t.dataset.s === target));
    window.scrollTo({ top: $('#demo').offsetTop - 8, behavior: 'smooth' });
  };
  tabs.forEach(t => t.addEventListener('click', () => switchTo(t.dataset.s)));
  // inject mobile bottom nav
  const icons = {
    overview: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
    readiness: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
    oe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    tail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/></svg>',
    action: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/></svg>',
  };
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.setAttribute('aria-label', 'Demonstrator views');
  ['overview','readiness','oe','tail','action'].forEach(id => {
    const b = document.createElement('button');
    b.className = 'tab' + (id === 'overview' ? ' active' : '');
    b.dataset.s = id;
    b.innerHTML = icons[id] + '<span>' + ({overview:'Overview',readiness:'Readiness',oe:'OE',tail:'Tail',action:'Gate & ROI'}[id]) + '</span>';
    b.addEventListener('click', () => switchTo(id));
    nav.appendChild(b);
  });
  document.body.appendChild(nav);
}

/* ---- renderers ---- */
function renderAll() {
  renderOverview();
  renderReadiness();
  renderOE();
  renderTail();
  renderAction();
}

function renderOverview() {
  const p = current;
  $('#overview').innerHTML = `
    <div class="grid g4">
      <div class="card kpi"><div class="label">WIMI</div><div class="metric ${p.band.status}">${p.wimi.toFixed(1)}</div><span class="status-tag ${p.band.status}">${p.band.label}</span></div>
      <div class="card kpi"><div class="label">Evidence Confidence</div><div class="metric">${p.confidence}%</div><div class="bar"><i style="width:${p.confidence}%"></i></div></div>
      <div class="card kpi"><div class="label">Tail Exposure (P90−P50)</div><div class="metric bad">${p.lost.toFixed(1)} d</div><div class="small">Illustrative modeled schedule tail</div></div>
      <div class="card kpi"><div class="label">Tail Retireable</div><div class="metric good">${p.saved.toFixed(1)} d</div><div class="small">Illustrative intervention</div></div>
    </div>
    <div class="grid g2 mt-lg">
      <div class="card"><h2>Schedule Certainty</h2><table class="tbl"><tr><th>P50</th><th>P80</th><th>P90</th></tr><tr><td class="metric sm">${p.p50}</td><td class="metric sm">${p.p80}</td><td class="metric sm bad">${p.p90}</td></tr><tr><td class="small">days</td><td class="small">days</td><td class="small">days</td></tr></table><div class="small mt">Illustrative modeled distribution; right tail = execution uncertainty.</div></div>
      <div class="card"><h2>Executive Signal</h2><div class="callout">Primary install-margin erosion is driven by <b>${p.drivers[0][0]}</b>, <b>${p.drivers[1][0]}</b>, and <b>${p.drivers[2][0]}</b>. An illustrative intervention before the next Walker Gate is shown to move WIMI from <b>${p.wimi.toFixed(1)}</b> to <b>${p.intervention.newWimi.toFixed(1)}</b>.</div></div>
    </div>
    <div class="card mt-lg"><h2>Top Execution Drivers</h2>${driverTable(p)}</div>`;
}

function driverTable(p) {
  return `<table class="tbl"><tr><th>Driver</th><th>Current Finding</th><th>Priority</th></tr>${p.drivers.map(x => `<tr><td>${x[0]}</td><td>${x[1]}</td><td><span class="badge ${sevBadge(x[2])}">${x[2]}</span></td></tr>`).join('')}</table>`;
}

function renderReadiness() {
  const p = current;
  const rows = p.dimensions.map(d => `<div class="dimrow"><span class="dname">${d.name}</span><span class="dval">${d.score}</span><div class="bar"><i class="${d.status}" style="width:${d.score}%"></i></div></div>`).join('');
  const compRows = p.dimensions.map(d => `<div class="dimrow"><span class="dname">${d.name}</span><span class="dval">${d.comp}%</span><div class="bar"><i style="width:${d.comp}%"></i></div></div>`).join('');
  $('#readiness').innerHTML = `
    <div class="sub">Execution-readiness profile across ${p.dimensions.length} dimensions. Scores and confidence are illustrative synthetic outputs.</div>
    <div class="grid g2">
      <div class="card"><h2>Dimension Scores</h2>${rows}</div>
      <div class="card"><h2>Evidence Completeness</h2>${compRows}<div class="small mt">Illustrative completeness per dimension.</div></div>
    </div>`;
}

function renderOE() {
  const p = current;
  $('#oe').innerHTML = `
    <div class="sub">Public-industry operating-experience signatures mapped to this synthetic case.</div>
    <div class="grid g4">
      <div class="card kpi"><div class="label">OE Records Indexed</div><div class="metric gold">${p.oeStats.indexed}</div></div>
      <div class="card kpi"><div class="label">High-Applicability</div><div class="metric">${p.oeStats.high}</div></div>
      <div class="card kpi"><div class="label">Risk Signatures</div><div class="metric">${p.oeStats.signatures}</div></div>
      <div class="card kpi"><div class="label">Challenge Findings</div><div class="metric">${p.drivers.length}</div></div>
    </div>
    <div class="grid g2 mt-lg">
      <div class="card"><h2>Mapped OE Themes</h2><table class="tbl"><tr><th>OE Theme</th><th>Signature</th><th>Appl.</th></tr>${p.oe.map(x => `<tr><td>${x[0]}</td><td>${x[1]}</td><td><span class="badge ${sevBadge(x[2])}">${x[2]}</span></td></tr>`).join('')}</table></div>
      <div class="card"><h2>Independent Challenge Findings</h2>${p.drivers.map((x,i) => `<div class="callout" style="margin-bottom:10px"><b>Finding ${String(i+1).padStart(2,'0')} — ${x[0]}</b><br><span class="small">${x[1]}</span><br><span class="badge ${sevBadge(x[2])}">${x[2]} consequence potential</span></div>`).join('')}</div>
    </div>
    <div class="callout mt-lg"><b>Management challenge screen:</b> findings are surfaced as evidence questions for project leadership — not automated decisions. WIMI remains an execution-readiness evidence signal, not a safety certification or regulatory determination.</div>`;
}

function renderTail() {
  const p = current;
  const chart = (arr, cls) => `<div class="chart-wrap"><div class="chart">${arr.map((h,i) => `<div class="col ${cls}" style="height:${h}%"><span>${i===7?'P50':i===10?'P80':i===13?'P90':''}</span></div>`).join('')}</div></div>`;
  $('#tail').innerHTML = `
    <div class="sub">Schedule Tail Exposure Simulator — visualizes the illustrative distribution and the effect of retiring uncertainty. "Cutting the dragon tail" retires the right-hand execution tail.</div>
    <div class="grid g2">
      <div class="card"><h2>Baseline Distribution</h2>${chart(p.distBase,'base')}<div class="chart-legend"><span><i style="background:var(--gold)"></i>Baseline</span></div></div>
      <div class="card"><h2>After Intervention</h2>${chart(p.distAfter,'after')}<div class="chart-legend"><span><i style="background:var(--ready)"></i>After intervention</span></div></div>
    </div>
    <div class="card mt-lg"><h2>Cutting the Tail</h2><table class="tbl"><tr><th>Measure</th><th>Baseline</th><th>After Intervention</th><th>Change</th></tr>
      <tr><td>P90 duration</td><td>${p.p90} d</td><td>${p.intervention.newP90} d</td><td class="good">−${p.saved.toFixed(1)} d</td></tr>
      <tr><td>WIMI</td><td>${p.wimi.toFixed(1)}</td><td>${p.intervention.newWimi.toFixed(1)}</td><td class="good">+${p.wimiDelta.toFixed(1)}</td></tr>
      <tr><td>Tail exposure (P90−P50)</td><td>${p.lost.toFixed(1)} d</td><td>${p.afterTail.toFixed(1)} d</td><td class="good">−${p.saved.toFixed(1)} d</td></tr>
    </table><div class="small mt">Illustrative modeled distribution; synthetic clean-room values only.</div></div>`;
}

function renderAction() {
  const p = current;
  const f = DATA.fleet;
  const gateRows = p.gates.map(g => `<tr><td>${g[0]}</td><td><span class="gate-pill ${gateClass(g[1])}">${g[1]}</span></td></tr>`).join('');
  // sensitivity slider bound to precomputed stops
  const stops = p.sensitivity;
  const minV = stops[0].vpd, maxV = stops[stops.length-1].vpd;
  $('#action').innerHTML = `
    <div class="grid g2">
      <div class="card"><h2>Walker Gate Status</h2><table class="tbl"><tr><th>Gate</th><th>Status</th></tr>${gateRows}</table><div class="small mt">Gates from concept through return-to-service.</div></div>
      <div class="card"><h2>Recommended Intervention</h2><div class="callout"><b>${p.intervention.name}</b></div>
        <table class="tbl mt"><tr><th>Measure</th><th>Value</th></tr>
          <tr><td>Illustrative mitigation cost</td><td>${money(p.intervention.cost)}</td></tr>
          <tr><td>Configured outage value/day</td><td>${money(p.intervention.vpd)}</td></tr>
          <tr><td>P90 days removed</td><td>${p.saved.toFixed(1)} d</td></tr>
        </table>
        <div class="label mt">Install Margin ROI</div><div class="roi-big">${p.roi.toFixed(1)}<span>×</span></div>
      </div>
    </div>
    <div class="card mt-lg"><h2>Economic Sensitivity</h2>
      <label class="small">Value per outage day: <b id="dayVal">${money(p.intervention.vpd)}</b></label>
      <input id="daySlider" class="slider" type="range" min="${minV}" max="${maxV}" step="${(maxV-minV)/60}" value="${p.intervention.vpd}">
      <div class="slider-row"><span>${money(minV)}</span><span id="roiLive" class="metric gold xs">${p.roi.toFixed(1)}×</span><span>${money(maxV)}</span></div>
      <div class="small mt">ROI is shown as an illustrative multiple from precomputed synthetic stops — no calculation engine is exposed.</div>
    </div>
    <div class="card mt-lg"><h2>Fleet / CNO Portfolio View</h2>
      <div class="grid g4">
        <div class="card kpi"><div class="label">Projects Assessed</div><div class="metric">${DATA.cases.length}</div></div>
        <div class="card kpi"><div class="label">Average WIMI</div><div class="metric warn">${f.avgWimi.toFixed(1)}</div></div>
        <div class="card kpi"><div class="label">Modeled Tail Exposure</div><div class="metric bad">${moneyShort(f.totalExp)}</div></div>
        <div class="card kpi"><div class="label">Potentially Retireable</div><div class="metric good">${moneyShort(f.totalRet)}</div></div>
      </div>
      <table class="tbl mt"><tr><th>Project</th><th>WIMI</th><th>Tail (P90−P50)</th><th>ROI</th></tr>
        ${DATA.cases.map(c => `<tr><td>${c.name}</td><td class="heat-cell">${c.wimi.toFixed(1)}</td><td>${c.lost.toFixed(1)} d</td><td class="heat-cell">${c.roi.toFixed(1)}×</td></tr>`).join('')}
      </table>
      <div class="callout mt"><b>CNO signal:</b> fleet leadership can see where capital and outage exposure are concentrated and which interventions create the highest certainty return — before execution commitments are made.</div>
    </div>`;
  // wire slider to precomputed stops (presentation only)
  const slider = $('#daySlider'), out = $('#roiLive'), val = $('#dayVal');
  slider.addEventListener('input', () => {
    const v = +slider.value;
    let best = stops[0];
    for (const s of stops) if (Math.abs(s.vpd - v) < Math.abs(best.vpd - v)) best = s;
    val.textContent = money(best.vpd);
    out.textContent = best.roi.toFixed(1) + '×';
  });
}

/* ---- case selector ---- */
function setupSelector() {
  const sel = $('#projectSel');
  sel.innerHTML = DATA.cases.map((c, i) => `<option value="${i}">${c.name}</option>`).join('');
  sel.addEventListener('change', () => { current = DATA.cases[+sel.value]; renderAll(); });
}

/* ---- boot ---- */
document.addEventListener('DOMContentLoaded', () => {
  setupSelector();
  setupTabs();
  renderAll();
});
