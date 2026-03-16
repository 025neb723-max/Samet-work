/**
 * Nepal Survey Dashboard — Application Logic
 * Renders the dashboard with search, filter, sort, chart, table,
 * category breakdown, dark mode, CSV export, and scroll-to-top.
 */

(function () {
  "use strict";

  // --- State ---
  var activeTab = "preferred";
  var sortField = "rank";
  var sortDirection = "asc";
  var searchQuery = "";
  var categoryFilter = "all";
  var trendFilter = "all";

  // --- DOM References ---
  var statsBar = document.getElementById("stats-bar");
  var searchInput = document.getElementById("search-input");
  var categorySelect = document.getElementById("category-filter");
  var trendSelect = document.getElementById("trend-filter");
  var tabPreferred = document.getElementById("tab-preferred");
  var tabNotPreferable = document.getElementById("tab-not-preferable");
  var chartTitle = document.getElementById("chart-title");
  var barChart = document.getElementById("bar-chart");
  var tableTitle = document.getElementById("table-title");
  var tableBody = document.getElementById("table-body");
  var showingCount = document.getElementById("showing-count");
  var footerNote = document.getElementById("footer-note");
  var tableHeaders = document.querySelectorAll("#data-table thead th");
  var categoryGrid = document.getElementById("category-grid");
  var themeToggle = document.getElementById("theme-toggle");
  var exportBtn = document.getElementById("export-csv");
  var scrollTopBtn = document.getElementById("scroll-top");

  // --- Helpers ---
  function formatNumber(n) {
    return n.toLocaleString("en-US");
  }

  /** Safe text setter - avoids innerHTML for user-visible text */
  function setText(el, text) {
    el.textContent = text;
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

  function rankDisplay(rank) {
    if (rank === 1) return '<span class="rank-medal rank-gold">🥇</span>';
    if (rank === 2) return '<span class="rank-medal rank-silver">🥈</span>';
    if (rank === 3) return '<span class="rank-medal rank-bronze">🥉</span>';
    return rank;
  }

  // --- Dark Mode ---
  function initTheme() {
    var saved = localStorage.getItem("nepal-survey-theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setText(themeToggle, "☀️");
    }
  }

  themeToggle.addEventListener("click", function () {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      setText(themeToggle, "🌙");
      localStorage.setItem("nepal-survey-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      setText(themeToggle, "☀️");
      localStorage.setItem("nepal-survey-theme", "dark");
    }
  });

  // --- Scroll to Top ---
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- CSV Export ---
  exportBtn.addEventListener("click", function () {
    var data = getSortedData(getFilteredData());
    var type = activeTab === "preferred" ? "Preferred" : "Not_Preferable";
    var csv = "Rank,Name,Category,Score,Votes,Trend\n";
    data.forEach(function (item) {
      csv +=
        item.rank +
        ',"' +
        item.name.replace(/"/g, '""') +
        '",' +
        item.category +
        "," +
        item.score +
        "," +
        item.votes +
        "," +
        item.trend +
        "\n";
    });
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "nepal_survey_top50_" + type + ".csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

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

  function renderCategoryBreakdown() {
    var data = getCurrentData();
    var counts = {};
    data.forEach(function (item) {
      if (!counts[item.category]) {
        counts[item.category] = 0;
      }
      counts[item.category]++;
    });

    var cats = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a];
    });
    var maxCount = Math.max.apply(null, cats.map(function (c) { return counts[c]; }));
    var barClass = activeTab === "preferred" ? "preferred" : "not-preferable";
    var countClass = activeTab === "preferred" ? "" : "danger";

    categoryGrid.innerHTML = "";
    cats.forEach(function (cat) {
      var pct = (counts[cat] / maxCount) * 100;
      var card = document.createElement("div");
      card.className = "category-card";
      card.innerHTML =
        '<div class="category-card-name">' + cat + "</div>" +
        '<div class="category-card-count ' + countClass + '">' + counts[cat] + "</div>" +
        '<div class="category-card-bar"><div class="category-card-fill ' + barClass + '" style="width:' + pct + '%"></div></div>';
      categoryGrid.appendChild(card);
    });
  }

  function renderChart() {
    var type = activeTab === "preferred" ? "Preferred" : "Not Preferable";
    setText(chartTitle, "Top 10 " + type + " — Score Overview");

    var data = getFilteredData().slice(0, 10);
    var barClass = activeTab === "preferred" ? "preferred" : "not-preferable";
    var maxScore = 100;

    barChart.innerHTML = "";

    if (data.length === 0) {
      var emptyMsg = document.createElement("p");
      emptyMsg.style.cssText = "color:var(--text-secondary);text-align:center;padding:24px;";
      setText(emptyMsg, "No items match the current filters.");
      barChart.appendChild(emptyMsg);
      return;
    }

    data.forEach(function (item) {
      var pct = (item.score / maxScore) * 100;
      var row = document.createElement("div");
      row.className = "bar-row";

      var label = document.createElement("div");
      label.className = "bar-label";
      label.title = item.name;
      setText(label, item.name);

      var track = document.createElement("div");
      track.className = "bar-track";
      var fill = document.createElement("div");
      fill.className = "bar-fill " + barClass;
      fill.style.width = pct + "%";
      track.appendChild(fill);

      var value = document.createElement("div");
      value.className = "bar-value";
      setText(value, String(item.score));

      row.appendChild(label);
      row.appendChild(track);
      row.appendChild(value);
      barChart.appendChild(row);
    });
  }

  function renderTable() {
    var type = activeTab === "preferred" ? "Preferred" : "Not Preferable";
    var filtered = getFilteredData();
    var sorted = getSortedData(filtered);
    var scoreClass =
      activeTab === "preferred" ? "score-preferred" : "score-not-preferable";
    var fillClass =
      activeTab === "preferred" ? "preferred" : "not-preferable";

    setText(
      tableTitle,
      filtered.length === 50
        ? "All 50 " + type + " Items"
        : filtered.length + " " + type + " Items (filtered)"
    );

    tableBody.innerHTML = "";

    sorted.forEach(function (item) {
      var tr = document.createElement("tr");

      // Rank
      var tdRank = document.createElement("td");
      tdRank.className = "rank-cell";
      tdRank.innerHTML = rankDisplay(item.rank);

      // Name
      var tdName = document.createElement("td");
      tdName.className = "name-cell";
      setText(tdName, item.name);

      // Category
      var tdCat = document.createElement("td");
      tdCat.className = "category-cell";
      var badge = document.createElement("span");
      badge.className = "category-badge";
      setText(badge, item.category);
      tdCat.appendChild(badge);

      // Score with mini bar
      var tdScore = document.createElement("td");
      tdScore.className = "score-cell " + scoreClass;
      var scoreWrapper = document.createElement("div");
      scoreWrapper.className = "score-bar-wrapper";
      var scoreText = document.createElement("span");
      setText(scoreText, String(item.score));
      var miniBar = document.createElement("div");
      miniBar.className = "score-mini-bar";
      var miniFill = document.createElement("div");
      miniFill.className = "score-mini-fill " + fillClass;
      miniFill.style.width = item.score + "%";
      miniBar.appendChild(miniFill);
      scoreWrapper.appendChild(scoreText);
      scoreWrapper.appendChild(miniBar);
      tdScore.appendChild(scoreWrapper);

      // Votes
      var tdVotes = document.createElement("td");
      tdVotes.className = "votes-cell";
      setText(tdVotes, formatNumber(item.votes));

      // Trend
      var tdTrend = document.createElement("td");
      tdTrend.className = trendClass(item.trend);
      setText(
        tdTrend,
        trendIcon(item.trend) +
          " " +
          item.trend.charAt(0).toUpperCase() +
          item.trend.slice(1)
      );

      tr.appendChild(tdRank);
      tr.appendChild(tdName);
      tr.appendChild(tdCat);
      tr.appendChild(tdScore);
      tr.appendChild(tdVotes);
      tr.appendChild(tdTrend);
      tableBody.appendChild(tr);
    });

    setText(
      showingCount,
      "Showing " + sorted.length + " of 50 " + type.toLowerCase() + " items"
    );
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
    renderCategoryBreakdown();
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
    th.setAttribute("tabindex", "0");
    th.setAttribute("role", "columnheader");
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
    th.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        th.click();
      }
    });
  });

  // --- Footer ---
  setText(
    footerNote,
    "Last updated: " +
      surveyStats.lastUpdated +
      " · " +
      formatNumber(surveyStats.totalRespondents) +
      " respondents across " +
      surveyStats.regionsCount +
      " districts"
  );

  // --- Init ---
  initTheme();
  renderStats();
  renderCategoryOptions();
  renderAll();
})();
