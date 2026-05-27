(function () {
  'use strict';

  // ===== 最終更新日 (本日付) を動的挿入 =====
  var today = new Date();
  var dateEl = document.getElementById('js-today');
  if (dateEl) {
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    dateEl.textContent = y + '年' + m + '月' + d + '日';
  }

  // ===== UTMパラメータをアフィリエイトリンクへ引き継ぎ =====
  try {
    var params = new URLSearchParams(window.location.search);
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'yclid'];
    var utmString = '';
    utmKeys.forEach(function (k) {
      if (params.get(k)) {
        utmString += (utmString ? '&' : '') + k + '=' + encodeURIComponent(params.get(k));
      }
    });
    if (utmString) {
      document.querySelectorAll('a[rel*="sponsored"]').forEach(function (a) {
        var href = a.getAttribute('href') || '';
        if (!/^https?:/.test(href)) return;
        var sep = href.indexOf('?') >= 0 ? '&' : '?';
        a.setAttribute('href', href + sep + utmString);
      });
    }
  } catch (e) { /* noop */ }

  // ===== CTAクリックイベント計測 (dataLayerがある場合のみ) =====
  document.querySelectorAll('[data-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'cta_click',
          cta_location: el.getAttribute('data-cta')
        });
      }
    });
  });

  // ===== スクロール深度計測 =====
  var depthsTriggered = {};
  function onScroll() {
    var h = document.documentElement;
    var scrolled = (h.scrollTop + window.innerHeight) / h.scrollHeight * 100;
    [25, 50, 75, 100].forEach(function (p) {
      if (scrolled >= p && !depthsTriggered[p]) {
        depthsTriggered[p] = true;
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
          window.dataLayer.push({ event: 'scroll_depth', depth: p });
        }
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== 離脱モーダル (exit-intent) =====
  var modal = document.getElementById('exit-modal');
  if (!modal) return;

  var shown = false;
  var sessionKey = 'exit_modal_shown';
  try {
    if (sessionStorage.getItem(sessionKey)) {
      shown = true;
    }
  } catch (e) {}

  function openModal() {
    if (shown) return;
    shown = true;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    try { sessionStorage.setItem(sessionKey, '1'); } catch (e) {}
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'exit_modal_shown' });
    }
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // 閉じる動作
  modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // PC: マウスがビューポート上端を超えた瞬間
  document.addEventListener('mouseout', function (e) {
    if (e.clientY <= 0 && !e.relatedTarget && !e.toElement) {
      // 一定時間スクロールしてから出すほうがCV濃度が上がる
      if (window.scrollY > 300) openModal();
    }
  });

  // SP: 戻るボタン押下を擬似検知 (history.pushStateで一段挟む)
  if ('ontouchstart' in window) {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', function () {
      if (!shown) {
        history.pushState(null, '', location.href);
        openModal();
      }
    });
  }

  // ※ 滞在時間ベースのポップアップは無効化済み（exit-intent のみで発火）
})();
