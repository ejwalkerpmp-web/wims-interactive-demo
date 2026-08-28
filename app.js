(function () {
  'use strict';

  var COLORS = {
    review: '#c97a3d',
    evidence: '#d19a4a',
    attention: '#b8663a',
    monitored: '#4fa8ab',
    pending: '#8a97a3',
  };

  var STATUS_TEXT = {
    review: 'Review needed',
    evidence: 'Evidence required',
    attention: 'Attention needed',
    monitored: 'Monitored',
    pending: 'Decision pending',
  };

  var SCENARIOS = {
    rcp: {
      label: 'RCP Replacement',
      domains: [
        { name: 'Knowledge continuity', severity: 'review' },
        { name: 'Qualified workforce', severity: 'evidence' },
        { name: 'Interface readiness', severity: 'attention' },
        { name: 'Supply-chain confidence', severity: 'monitored' },
        { name: 'Work-package clarity', severity: 'review' },
        { name: 'Governance readiness', severity: 'pending' },
      ],
    },
    turbine: {
      label: 'Turbine Work',
      domains: [
        { name: 'Knowledge continuity', severity: 'monitored' },
        { name: 'Qualified workforce', severity: 'review' },
        { name: 'Interface readiness', severity: 'evidence' },
        { name: 'Supply-chain confidence', severity: 'attention' },
        { name: 'Work-package clarity', severity: 'pending' },
        { name: 'Governance readiness', severity: 'review' },
      ],
    },
    sg: {
      label: 'Steam Generator Replacement',
      domains: [
        { name: 'Knowledge continuity', severity: 'evidence' },
        { name: 'Qualified workforce', severity: 'attention' },
        { name: 'Interface readiness', severity: 'review' },
        { name: 'Supply-chain confidence', severity: 'pending' },
        { name: 'Work-package clarity', severity: 'monitored' },
        { name: 'Governance readiness', severity: 'evidence' },
      ],
    },
  };

  var cassette = document.getElementById('cassette');
  var scenarioLabel = document.getElementById('scenario-label');
  var statusList = document.getElementById('status-list');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));

  function buildConic(domains) {
    var step = 360 / domains.length;
    var stops = domains.map(function (d, i) {
      var start = (i * step).toFixed(2) + 'deg';
      var end = ((i + 1) * step).toFixed(2) + 'deg';
      return COLORS[d.severity] + ' ' + start + ' ' + end;
    });
    return 'conic-gradient(' + stops.join(', ') + ')';
  }

  function renderScenario(key) {
    var scenario = SCENARIOS[key];
    if (!scenario) return;

    cassette.style.background = buildConic(scenario.domains);
    scenarioLabel.textContent = scenario.label;

    statusList.innerHTML = '';
    scenario.domains.forEach(function (d) {
      var row = document.createElement('div');
      row.className = 'status-row status-fade';
      row.innerHTML =
        '<span class="dot" style="background:' + COLORS[d.severity] + '" aria-hidden="true"></span>' +
        '<span class="domain">' + d.name + '</span>' +
        '<span class="status">' + STATUS_TEXT[d.severity] + '</span>';
      statusList.appendChild(row);
    });

    tabs.forEach(function (t) {
      t.setAttribute('aria-selected', String(t.dataset.scenario === key));
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      renderScenario(tab.dataset.scenario);
    });
  });

  renderScenario('rcp');

  // ===== Request Demonstration Access form =====
  var form = document.getElementById('demo-form');
  var confirmPanel = document.getElementById('confirm-panel');

  function setInvalid(fieldEl, invalid) {
    if (!fieldEl) return;
    fieldEl.classList.toggle('invalid', invalid);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstInvalid = null;
    var ok = true;

    ['firstName', 'lastName', 'workEmail', 'organization', 'title', 'seniority', 'orgType', 'interest'].forEach(
      function (name) {
        var input = form.elements[name];
        var fieldEl = input.closest('.field');
        var valid = input.checkValidity() && input.value.trim() !== '';
        setInvalid(fieldEl, !valid);
        if (!valid) {
          ok = false;
          firstInvalid = firstInvalid || input;
        }
      }
    );

    var consent = form.elements['consent'];
    var consentError = document.getElementById('consent-error');
    if (!consent.checked) {
      ok = false;
      consentError.style.display = 'block';
      firstInvalid = firstInvalid || consent;
    } else {
      consentError.style.display = 'none';
    }

    if (!ok) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    form.style.display = 'none';
    confirmPanel.classList.add('visible');
    confirmPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
