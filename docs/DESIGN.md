# 設計實作 v0.2

日夜是內容世界，不是僅改色。日 #f4f1ea／墨綠，夜 #202327／暖銅。共用品牌、導覽、字級系統。
主視覺以 CSS 軌道與球體表現邏輯及光；夜面為 CSS 光影策展佔位，沒有外部圖片。
手機 800px 以下單欄；320px、390px、768px、1440px 均需人工測試。
採用 reduced-motion 規則、原生 dialog、focus-visible、跳至內容入口。對比及螢幕閱讀器尚未實測。
以 #build／#observe 分享模式；使用者明確 hash 優先於 localStorage。hash 的 #work／#about 為共用頁內導覽。
無 JS 時預設日面可讀；互動與案例 dialog 需 JS，這是已知漸進增強缺口。
