/**
 * Nepal Survey Dashboard — Application Logic
 * Renders the dashboard with search, filter, sort, chart, and table features.
 */

(function () {
  "use strict";

  // --- State ---
  let activeTab = "preferred"; // "preferred" | "not-preferable"
  let sortField = "rank";
  let sortDirection = "asc";
  let searchQuery = "";
  let categoryFilter = "all";
  let trendFilter = "all";

  // --- DOM References ---
  const statsBar = document.getElementById("stats-bar");
  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-filter");
  const trendSelect = document.getElementById("trend-filter");
  const tabPreferred = document.getElementById("tab-preferred");
  const tabNotPreferable = document.getElementById("tab-not-preferable");
  const chartTitle = document.getElementById("chart-title");
  const barChart = document.getElementById("bar-chart");
  const tableTitle = document.getElementById("table-title");
  const tableBody = document.getElementById("table-body");
  const showingCount = document.getElementById("showing-count");
  const footerNote = document.getElementById("footer-note");
  const tableHeaders = document.querySelectorAll("#data-table thead th");

  // --- Helpers ---
  function formatNumber(n) {
    return n.toLocaleString("en-US");
  }

  function getCurrentData() {
    return activeTab === "preferred" ? preferredData : notPreferableData;
  }

  function getFilteredData() {
    var data = getCurrentData();
    return data.filter(function (item) {
      var matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
        item.category.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
      var matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      var matchesTrend = trendFilter === "all" || item.trend === trendFilter;
      return matchesSearch && matchesCategory && matchesTrend;
    });
  }

  function getSortedData(data) {
    var sorted = data.slice();
    sorted.sort(function (a, b) {
      var valA = a[sortField];
      var valB = b[sortField];
      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      var cmp = valA < valB ? -1 : valA > valB ? 1 : 0;
      return sortDirection === "asc" ? cmp : -cmp;
    });
    return sorted;
  }

  function trendIcon(trend) {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "→";
  }

  function trendClass(trend) {
    return "trend-" + trend;
  }

  // --- Render Functions ---

  function renderStats() {
    statsBar.innerHTML =
      '<div class="container" style="display:flex;justify-content:center;flex-wrap:wrap;gap:24px;">' +
      '<div class="stat-item"><div class="stat-value">' +
      formatNumber(surveyStats.totalRespondents) +
      '</div><div class="stat-label">Respondents</div></div>' +
      '<div class="stat-item"><div class="stat-value">' +
      surveyStats.provincesCount +
      '</div><div class="stat-label">Provinces</div></div>' +
      '<div class="stat-item"><div class="stat-value">' +
      surveyStats.regionsCount +
      '</div><div class="stat-label">Districts</div></div>' +
      '<div class="stat-item"><div class="stat-value">' +
      surveyStats.marginOfError +
      '</div><div class="stat-label">Margin of Error</div></div>' +
      '<div class="stat-item"><div class="stat-value">' +
      surveyStats.surveyPeriod +
      '</div><div class="stat-label">Survey Period</div></div>' +
      "</div>";
  }

  function renderCategoryOptions() {
    var categories = {};
    preferredData.forEach(function (d) {
      categories[d.category] = true;
    });
    notPreferableData.forEach(function (d) {
      categories[d.category] = true;
    });
    var sorted = Object.keys(categories).sort();
    categorySelect.innerHTML = '<option value="all">All Categories</option>';
    sorted.forEach(function (cat) {
      var opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  function renderChart() {
    var type = activeTab === "preferred" ? "Preferred" : "Not Preferable";
    chartTitle.textContent = "Top 10 " + type + " — Score Overview";

    var data = getFilteredData().slice(0, 10);
    var barClass = activeTab === "preferred" ? "preferred" : "not-preferable";
    var maxScore = 100;

    barChart.innerHTML = "";

    if (data.length === 0) {
      barChart.innerHTML =
        '<p style="color:var(--gray-500);text-align:center;padding:24px;">No items match the current filters.</p>';
      return;
    }

    data.forEach(function (item) {
      var pct = (item.score / maxScore) * 100;
      var row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML =
        '<div class="bar-label" title="' +
        item.name +
        '">' +
        item.name +
        "</div>" +
        '<div class="bar-track"><div class="bar-fill ' +
        barClass +
        '" style="width:' +
        pct +
        '%"></div></div>' +
        '<div class="bar-value">' +
        item.score +
        "</div>";
      barChart.appendChild(row);
    });
  }

  function renderTable() {
    var type = activeTab === "preferred" ? "Preferred" : "Not Preferable";
    var filtered = getFilteredData();
    var sorted = getSortedData(filtered);
    var scoreClass =
      activeTab === "preferred" ? "score-preferred" : "score-not-preferable";

    tableTitle.textContent =
      filtered.length === 50
        ? "All 50 " + type + " Items"
        : filtered.length + " " + type + " Items (filtered)";

    tableBody.innerHTML = "";

    sorted.forEach(function (item) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="rank-cell">' +
        item.rank +
        "</td>" +
        '<td class="name-cell">' +
        item.name +
        "</td>" +
        '<td class="category-cell"><span class="category-badge">' +
        item.category +
        "</span></td>" +
        '<td class="score-cell ' +
        scoreClass +
        '">' +
        item.score +
        "</td>" +
        '<td class="votes-cell">' +
        formatNumber(item.votes) +
        "</td>" +
        '<td class="' +
        trendClass(item.trend) +
        '">' +
        trendIcon(item.trend) +
        " " +
        item.trend.charAt(0).toUpperCase() +
        item.trend.slice(1) +
        "</td>";
      tableBody.appendChild(tr);
    });

    showingCount.textContent =
      "Showing " + sorted.length + " of 50 " + type.toLowerCase() + " items";
  }

  function updateSortIndicators() {
    tableHeaders.forEach(function (th) {
      th.classList.remove("sort-asc", "sort-desc");
      if (th.dataset.sort === sortField) {
        th.classList.add(sortDirection === "asc" ? "sort-asc" : "sort-desc");
      }
    });
  }

  function renderAll() {
    renderChart();
    renderTable();
    updateSortIndicators();
  }

  // --- Event Handlers ---

  tabPreferred.addEventListener("click", function () {
    activeTab = "preferred";
    tabPreferred.classList.add("active");
    tabPreferred.setAttribute("aria-selected", "true");
    tabNotPreferable.classList.remove("active");
    tabNotPreferable.setAttribute("aria-selected", "false");
    sortField = "rank";
    sortDirection = "asc";
    renderAll();
  });

  tabNotPreferable.addEventListener("click", function () {
    activeTab = "not-preferable";
    tabNotPreferable.classList.add("active");
    tabNotPreferable.setAttribute("aria-selected", "true");
    tabPreferred.classList.remove("active");
    tabPreferred.setAttribute("aria-selected", "false");
    sortField = "rank";
    sortDirection = "asc";
    renderAll();
  });

  searchInput.addEventListener("input", function () {
    searchQuery = searchInput.value.trim();
    renderAll();
  });

  categorySelect.addEventListener("change", function () {
    categoryFilter = categorySelect.value;
    renderAll();
  });

  trendSelect.addEventListener("change", function () {
    trendFilter = trendSelect.value;
    renderAll();
  });

  tableHeaders.forEach(function (th) {
    th.addEventListener("click", function () {
      var field = th.dataset.sort;
      if (!field) return;
      if (sortField === field) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortField = field;
        sortDirection = "asc";
      }
      renderAll();
    });
  });

  // --- Footer ---
  footerNote.textContent =
    "Last updated: " +
    surveyStats.lastUpdated +
    " · " +
    formatNumber(surveyStats.totalRespondents) +
    " respondents across " +
    surveyStats.regionsCount +
    " districts";

  // --- Init ---
  renderStats();
  renderCategoryOptions();
  renderAll();
})();
