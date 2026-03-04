// assets/js/terms-search.js
(() => {
  const input = document.getElementById("termSearch");
  const result = document.getElementById("searchResult");
  const links = Array.from(document.querySelectorAll(".term-link"));
  const sections = Array.from(document.querySelectorAll("section.section"));

  if (!input) return;

  const normalize = (s) =>
    (s || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/　+/g, ""); // 全角スペースも除去

  const update = () => {
    const q = normalize(input.value);

    // 空なら全表示
    if (!q) {
      links.forEach((a) => (a.style.display = ""));
      sections.forEach((sec) => (sec.style.display = ""));
      if (result) result.textContent = "全件表示中";
      return;
    }

    let hit = 0;

    // リンク表示/非表示
    links.forEach((a) => {
      const text = normalize(a.textContent);
      const show = text.includes(q);
      a.style.display = show ? "" : "none";
      if (show) hit++;
    });

    // セクション内に1つも表示リンクがなければセクションごと隠す
    sections.forEach((sec) => {
      const visibleLinks = sec.querySelectorAll('.term-link:not([style*="display: none"])');
      sec.style.display = visibleLinks.length ? "" : "none";
    });

    if (result) result.textContent = `「${input.value}」：${hit}件ヒット`;
  };

  input.addEventListener("input", update);

  // URLに ?q= があれば自動検索（便利）
  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  if (q) {
    input.value = q;
    update();
    input.focus();
  } else {
    if (result) result.textContent = "全件表示中";
  }
})();
