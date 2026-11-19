# GitHub Pages 部署

## 目前架構

這是純靜態部署，只有 site/ 會公開。沒有 Astro 建置、npm 套件或 lockfile；不要假設已有完整網站。index.html 為公開的建置中頁面，robots noindex 不是存取控制。私人儲存庫不代表網站內容私人。

## 必要設定

1. 確認帳號方案支援私人儲存庫 GitHub Pages；不支援時停止，不要自行公開儲存庫。
2. 在 Settings → Pages → Build and deployment → Source 選擇 GitHub Actions。此提交不會修改 Pages 設定。
3. 確認 Actions 可使用 workflow 中的官方 actions，且 github-pages environment 允許 main 部署。
4. 設定完成後到 Actions → Deploy to GitHub Pages → Run workflow。之後 main 上 site/ 或 workflow 的變更會自動觸發。

使用 GitHub 提供的 GITHUB_TOKEN 與 OIDC，不需自行放入 PAT、FTP 密碼或 SSH 金鑰。

## 驗證

先確認 build 與 deploy jobs 均成功，再打開 deploy environment 的 page_url。預期預設網址為 https://chrixtal.github.io/chris-day-night/，但應以實際部署輸出為準；此文件不代表網站已上線。檢查手機版、原部落格連結與中文顯示。

## 未來整合 Astro

建立並驗證 package.json、套件 lockfile、固定 Node 版本、build 指令，以及 Astro 的 site 和 base 設定；預設專案 Pages 路徑需要考慮 /chris-day-night/。在 build job 加入安裝與建置，把 artifact 路徑改成 dist，並調整 push paths 或移除路徑過濾。不應同時維護兩份獨立網站內容。

## 安全與回復

不要把內部文件、原始私人照片、環境變數或憑證放入 site/。此 workflow 不綁定自訂網域，不更改 WordPress，不發布 pull request。暫停時可 Disable workflow；回復公開內容時，revert 對應的 site/ 提交並重新部署。無法透過現有連接器讀取 Actions 執行結果時，必須標為尚未驗證，不宣稱部署成功。

官方參考：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
