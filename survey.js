/**
 * Nepal Survey Form — Multi-step form logic
 * Handles form navigation, validation, checkbox generation, and submission.
 */

(function () {
  "use strict";

  // --- Dark Mode ---
  var themeToggle = document.getElementById("theme-toggle");
  var saved = localStorage.getItem("nepal-survey-theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  }
  themeToggle.addEventListener("click", function () {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.textContent = "🌙";
      localStorage.setItem("nepal-survey-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle.textContent = "☀️";
      localStorage.setItem("nepal-survey-theme", "dark");
    }
  });

  // --- Preference options from the data ---
  var prefFood = preferredData.filter(function (d) {
    return d.category === "Food";
  });
  var prefPlaces = preferredData.filter(function (d) {
    return d.category === "Nature" || d.category === "Natural Landmark";
  });
  var prefCulture = preferredData.filter(function (d) {
    return d.category === "Culture" || d.category === "Festival" || d.category === "Heritage";
  });
  var prefAdventure = preferredData.filter(function (d) {
    return d.category === "Adventure" || d.category === "Tourism";
  });

  // --- Issue options from the data ---
  var issueInfra = notPreferableData.filter(function (d) {
    return d.category === "Infrastructure" || d.category === "Technology";
  });
  var issueEnv = notPreferableData.filter(function (d) {
    return d.category === "Environment" || d.category === "Health" || d.category === "Disaster";
  });
  var issueGov = notPreferableData.filter(function (d) {
    return d.category === "Governance" || d.category === "Economy";
  });
  var issueSociety = notPreferableData.filter(function (d) {
    return d.category === "Society" || d.category === "Education";
  });

  function populateCheckboxes(containerId, items, prefix) {
    var container = document.getElementById(containerId);
    if (!container) return;
    items.forEach(function (item) {
      var label = document.createElement("label");
      label.className = "checkbox-label";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.name = prefix;
      cb.value = item.name;
      var text = document.createTextNode(" " + item.name);
      label.appendChild(cb);
      label.appendChild(text);
      container.appendChild(label);
    });
  }

  populateCheckboxes("pref-food", prefFood, "preference");
  populateCheckboxes("pref-places", prefPlaces, "preference");
  populateCheckboxes("pref-culture", prefCulture, "preference");
  populateCheckboxes("pref-adventure", prefAdventure, "preference");
  populateCheckboxes("issue-infra", issueInfra, "issue");
  populateCheckboxes("issue-env", issueEnv, "issue");
  populateCheckboxes("issue-gov", issueGov, "issue");
  populateCheckboxes("issue-society", issueSociety, "issue");

  // --- Step Navigation ---
  var currentStep = 1;
  var steps = [
    document.getElementById("step-1"),
    document.getElementById("step-2"),
    document.getElementById("step-3")
  ];
  var stepLabels = [
    document.getElementById("step-label-1"),
    document.getElementById("step-label-2"),
    document.getElementById("step-label-3")
  ];
  var progressFill = document.getElementById("progress-fill");

  function showStep(n) {
    steps.forEach(function (s, i) {
      s.style.display = i === n - 1 ? "block" : "none";
    });
    stepLabels.forEach(function (l, i) {
      l.className = "progress-step";
      if (i < n - 1) l.classList.add("completed");
      if (i === n - 1) l.classList.add("active");
    });
    progressFill.style.width = (n / 3) * 100 + "%";
    currentStep = n;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- Validation Helpers ---
  function showError(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add("show");
  }

  function hideError(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove("show");
  }

  function getCheckedValues(name) {
    var checked = document.querySelectorAll('input[name="' + name + '"]:checked');
    var values = [];
    checked.forEach(function (cb) {
      values.push(cb.value);
    });
    return values;
  }

  function getRadioValue(name) {
    var selected = document.querySelector('input[name="' + name + '"]:checked');
    return selected ? selected.value : "";
  }

  // --- Step 1 Validation ---
  function validateStep1() {
    var nameInput = document.getElementById("full-name");
    var emailInput = document.getElementById("email");
    var valid = true;

    hideError("name-error");
    hideError("email-error");
    nameInput.classList.remove("error");
    emailInput.classList.remove("error");

    if (!nameInput.value.trim()) {
      showError("name-error");
      nameInput.classList.add("error");
      nameInput.focus();
      valid = false;
    }

    if (emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      showError("email-error");
      emailInput.classList.add("error");
      if (valid) emailInput.focus();
      valid = false;
    }

    return valid;
  }

  // --- Step 2 Validation ---
  function validateStep2() {
    hideError("pref-error");
    var prefs = getCheckedValues("preference");
    if (prefs.length < 3) {
      showError("pref-error");
      return false;
    }
    return true;
  }

  // --- Step 3 Validation ---
  function validateStep3() {
    hideError("issue-error");
    var issues = getCheckedValues("issue");
    if (issues.length < 3) {
      showError("issue-error");
      return false;
    }
    return true;
  }

  // --- Navigation Buttons ---
  document.getElementById("next-to-2").addEventListener("click", function () {
    if (validateStep1()) showStep(2);
  });

  document.getElementById("back-to-1").addEventListener("click", function () {
    showStep(1);
  });

  document.getElementById("next-to-3").addEventListener("click", function () {
    if (validateStep2()) showStep(3);
  });

  document.getElementById("back-to-2").addEventListener("click", function () {
    showStep(2);
  });

  // --- Form Submission ---
  document.getElementById("survey-form").addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateStep3()) return;

    var responseData = {
      name: document.getElementById("full-name").value.trim(),
      email: document.getElementById("email").value.trim(),
      ageGroup: document.getElementById("age-group").value,
      province: document.getElementById("province").value,
      travelFrequency: getRadioValue("travel-frequency"),
      preferences: getCheckedValues("preference"),
      issues: getCheckedValues("issue"),
      comments: document.getElementById("additional-comments").value.trim(),
      submittedAt: new Date().toISOString()
    };

    // Store in sessionStorage for thank you page
    sessionStorage.setItem("nepal-survey-response", JSON.stringify(responseData));

    // Store in localStorage as running list of all responses
    var allResponses = [];
    var stored = localStorage.getItem("nepal-survey-responses");
    if (stored) {
      try {
        allResponses = JSON.parse(stored);
      } catch (err) {
        allResponses = [];
      }
    }
    allResponses.push(responseData);
    localStorage.setItem("nepal-survey-responses", JSON.stringify(allResponses));

    // Redirect to thank you page
    window.location.href = "thankyou.html";
  });

  // --- Init ---
  showStep(1);
})();
