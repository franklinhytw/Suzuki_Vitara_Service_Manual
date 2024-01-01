function setUI(lang) {
	if (lang=="du") {
		strUI_btnBook = "Bladwijzers";
		strUI_btnDtcSym = "DTC / Symptoom";
		strUI_btnService = "Onderhoudsgegevens (Uitleesapparaat)";
		strUI_btnTtm = "Gereedschap / Aanhaalmoment / Materiaal";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptoom";
		strUI_btnServ = "Onderhoudsgegevens";
		strUI_btnSpec = "Specificatie";
		strUI_btnScan = "Uitleesapparaat";
		strUI_btnTool = "Gereedschap";
		strUI_btnTorq = "Aanhaalmoment";
		strUI_btnMat = "Materiaal";
		strUI_strGoSearch = 'Ga naar "Zoeken"';
		strUI_strGoNavi = 'Terug naar "Indexlijst"';
		strUI_strGoSearchDtc = 'Ga naar "Zoeken"';
		strUI_strGoNaviDtc = 'Terug naar "Indexlijst"';
		strUI_strGoSearchSym = 'Ga naar "Zoeken"';
		strUI_strGoNaviSym = 'Terug naar "Indexlijst"';
		strUI_iconUndo = "Terug naar de laatste bladzijde";
		strUI_iconPrev = "Terug";
		strUI_iconNext = "Volgende";
		strUI_iconPrint = "afdrukken";
		strUI_iconReturn = "voorpagina";
		strUI_iconHelp = "help";
		parent.CTL.document.ctl.err1.value = 'Ga terug naar "Bladwijzers" voor gebruik van deze functie.';

		parent.TOP.document.getElementById('btnDtcSym').style.width = "100px";
		parent.TOP.document.getElementById('btnService').style.width = "240px";
		parent.TOP.document.getElementById('btnTool').style.width = "240px";
	}
	else if (lang=="fr") {
		strUI_btnBook = "Signets";
		strUI_btnDtcSym = "DTC/Symptôme";
		strUI_btnService = "Données d'entretien (Outil de balayage)";
		strUI_btnTtm = "Outil / Couple / Matériel";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptôme";
		strUI_btnServ = "Données d'entretien";
		strUI_btnSpec = "Spécifications";
		strUI_btnScan = "Outil de balayage";
		strUI_btnTool = "Outil";
		strUI_btnTorq = "Couple";
		strUI_btnMat = "Matériel";
		strUI_strGoSearch = 'Aller à "Recherche"';
		strUI_strGoNavi = 'Retour à "Liste d\'index"';
		strUI_strGoSearchDtc = 'Aller à "Recherche"';
		strUI_strGoNaviDtc = 'Retour à "Liste d\'index"';
		strUI_strGoSearchSym = 'Aller à "Recherche"';
		strUI_strGoNaviSym = 'Retour à "Liste d\'index"';
		strUI_iconUndo = "Retour à la dernière page";
		strUI_iconPrev = "Précédent";
		strUI_iconNext = "Suivant";
		strUI_iconPrint = "imprimer";
		strUI_iconReturn = "page avant";
		strUI_iconHelp = "aide";
		parent.CTL.document.ctl.err1.value = 'Revenir à "Signets" pour utiliser cette fonction.';
		
		parent.TOP.document.getElementById('btnService').style.width = "220px";
		parent.TOP.document.getElementById('btnTool').style.width = "140px";
	}
	else if (lang=="ge") {
		strUI_btnBook = "Inhalt";
		strUI_btnDtcSym = "DTC / Symptom";
		strUI_btnService = "Einstelldaten (Diagnosegerät)";
		strUI_btnTtm = "Werkzeug / Anzugsdrehmoment / Material";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptom";
		strUI_btnServ = "Einstelldaten";
		strUI_btnSpec = "Spezifikation";
		strUI_btnScan = "Diagnosegerät";
		strUI_btnTool = "Werkzeug";
		strUI_btnTorq = "Anzugsdrehmoment";
		strUI_btnMat = "Material";
		strUI_strGoSearch = 'Zu "Suche" wechseln';
		strUI_strGoNavi = 'Zurück zu "Indexliste"';
		strUI_strGoSearchDtc = 'Zu "Suche" wechseln';
		strUI_strGoNaviDtc = 'Zurück zu "Indexliste"';
		strUI_strGoSearchSym = 'Zu "Suche" wechseln';
		strUI_strGoNaviSym = 'Zurück zu "Indexliste"';
		strUI_iconUndo = "Zurück zur letzten Seite";
		strUI_iconPrev = "Zurück";
		strUI_iconNext = "Weiter";
		strUI_iconPrint = "drucken";
		strUI_iconReturn = "Erste Seite";
		strUI_iconHelp = "Hilfe";
		parent.CTL.document.ctl.err1.value = 'Zurück zu "Inhalt" um diese Funktion zu benutzen.';

		parent.TOP.document.getElementById('btnService').style.width = "170px";
		parent.TOP.document.getElementById('btnTool').style.width = "240px";
		parent.NAVI_TOP.document.getElementById('btnTool').parentNode.style.width = "85px";
		parent.NAVI_TOP.document.getElementById('btnTorq').parentNode.style.width = "130px";
		parent.NAVI_TOP.document.getElementById('btnMat').parentNode.style.width = "85px";
	}
	else if (lang=="gk") {
		strUI_btnBook = "Σελιδοδείκτες";
		strUI_btnDtcSym = "DTC / Σύμπτωμα";
		strUI_btnService = "Δεδομένα Συντήρησης (Διαγνωστικό Εργαλείο)";
		strUI_btnTtm = "Εργαλείο / Ροπή / Υλικά";
		strUI_btnDtc = "DTC (ΚΩΔΙΚΟΙ ΒΛΑΒΩΝ)";
		strUI_btnSym = "Σύμπτωμα";
		strUI_btnServ = "Δεδομένα Συντήρησης";
		strUI_btnSpec = "Προδιαγραφές";
		strUI_btnScan = "Διαγνωστικό Εργαλείο";
		strUI_btnTool = "Εργαλείο";
		strUI_btnTorq = "Ροπή";
		strUI_btnMat = "Υλικά";
		strUI_strGoSearch = 'Πηγαίνετε στο "Αναζήτηση"';
		strUI_strGoNavi = 'Πίσω στο "Λίστα Ευρετηρίου"';
		strUI_strGoSearchDtc = 'Πηγαίνετε στο "Αναζήτηση"';
		strUI_strGoNaviDtc = 'Πίσω στο "Λίστα Ευρετηρίου"';
		strUI_strGoSearchSym = 'Πηγαίνετε στο "Αναζήτηση"';
		strUI_strGoNaviSym = 'Πίσω στο "Λίστα Ευρετηρίου"';
		strUI_iconUndo = "Πίσω στην τελευταία σελίδα";
		strUI_iconPrev = "Пροηγούμενο";
		strUI_iconNext = "Еπόμενο";
		strUI_iconPrint = "εκτύπωση";
		strUI_iconReturn = "εμπρός σελίδα";
		strUI_iconHelp = "βοήθεια";
		parent.CTL.document.ctl.err1.value = 'Επιστρέψτε στο "Σελιδοδείκτες" για να χρησιμοποιήσετε αυτή τη λειτουργία.';

		parent.TOP.document.getElementById('btnDtcSym').style.width = "100px";
		parent.TOP.document.getElementById('btnService').style.width = "250px";
		parent.NAVI_TOP.document.getElementById('btnDtc').parentNode.style.width = "150px";
	}
	else if (lang=="hr") {
		strUI_btnBook = "Sadržaj";
		strUI_btnDtcSym = "DTC / Simptom";
		strUI_btnService = "Servisni podaci (Alat za skeniranje)";
		strUI_btnTtm = "Alat / Moment pritezanja / Materijal";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Simptom";
		strUI_btnServ = "Servisni podaci";
		strUI_btnSpec = "Specifikacije";
		strUI_btnScan = "Alat za skeniranje";
		strUI_btnTool = "Alat";
		strUI_btnTorq = "Moment pritezanja";
		strUI_btnMat = "Materijal";
		strUI_strGoSearch = 'Idi na pretraživanje';
		strUI_strGoNavi = 'Natrag na kazalo';
		strUI_strGoSearchDtc = 'Idi na pretraživanje';
		strUI_strGoNaviDtc = 'Natrag na kazalo';
		strUI_strGoSearchSym = 'Idi na pretraživanje';
		strUI_strGoNaviSym = 'Natrag na kazalo';
		strUI_iconUndo = "Natrag na zadnju stranicu";
		strUI_iconPrev = "Prethodno";
		strUI_iconNext = "Sljedeće";
		strUI_iconPrint = "ispiši";
		strUI_iconReturn = "prva stranica";
		strUI_iconHelp = "pomoć";
		parent.CTL.document.ctl.err1.value = 'Vratite se na sadržaj za korištenje ove funkcije.';

//		parent.TOP.document.getElementById('btnDtcSym').style.width = "170px";
		parent.TOP.document.getElementById('btnService').style.width = "200px";
		parent.TOP.document.getElementById('btnTool').style.width = "190px";
	}
	else if (lang=="hu") {
		strUI_btnBook = "Kedvencek";
		strUI_btnDtcSym = "DTC (Diagnosztikai Hibakód) / Hibaszimptómák";
		strUI_btnService = "Szervizadatok (Vizsgálóberendezés)";
		strUI_btnTtm = "Eszközök/ Nyomaték / Anyagok";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Hibajelenség";
		strUI_btnServ = "Szervizadatok";
		strUI_btnSpec = "Beállítás";
		strUI_btnScan = "Vizsgálóberendezés";
		strUI_btnTool = "Eszközök";
		strUI_btnTorq = "Nyomaték";
		strUI_btnMat = "Anyagok";
		strUI_strGoSearch = 'Keresés';
		strUI_strGoNavi = 'Vissza a tartalomjegyzékhez';
		strUI_strGoSearchDtc = 'Keresés';
		strUI_strGoNaviDtc = 'Vissza a tartalomjegyzékhez';
		strUI_strGoSearchSym = 'Keresés';
		strUI_strGoNaviSym = 'Vissza a tartalomjegyzékhez';
		strUI_iconUndo = "Vissza az előző oldalra";
		strUI_iconPrev = "Előző";
		strUI_iconNext = "Következő";
		strUI_iconPrint = "Nyomtatás";
		strUI_iconReturn = "Főoldal";
		strUI_iconHelp = "Súgó";
		parent.CTL.document.ctl.err1.value = 'Térjen vissza a Kedvencek-hez, hogy használni tudja ezt a funkciót.';

		parent.TOP.document.getElementById('btnDtcSym').style.width = "170px";
//		parent.TOP.document.getElementById('btnService').style.width = "170px";
		parent.TOP.document.getElementById('btnTool').style.width = "170px";
	}
	else if (lang=="id") {
		strUI_btnBook = "Penanda halaman";
		strUI_btnDtcSym = "DTC / Gejala";
		strUI_btnService = "Data Servis (Scan Tool)";
		strUI_btnTtm = "Tool / Momen / Material";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Gejala";
		strUI_btnServ = "Data Servis";
		strUI_btnSpec = "Spesifikasi";
		strUI_btnScan = "Scan Tool";
		strUI_btnTool = "Tool";
		strUI_btnTorq = "Momen";
		strUI_btnMat = "Material";
		strUI_strGoSearch = 'Lihat "Pencarian"';
		strUI_strGoNavi = 'Kembali ke "Daftar Index"';
		strUI_strGoSearchDtc = 'Lihat "Pencarian"';
		strUI_strGoNaviDtc = 'Kembali ke "Daftar Index"';
		strUI_strGoSearchSym = 'Lihat "Pencarian"';
		strUI_strGoNaviSym = 'Kembali ke "Daftar Index"';
		strUI_iconUndo = "Kembali ke halaman terakhir";
		strUI_iconPrev = "Kembali";
		strUI_iconNext = "Maju";
		strUI_iconPrint = "Cetak";
		strUI_iconReturn = "Halaman depan";
		strUI_iconHelp = "Bantuan";
		parent.CTL.document.ctl.err1.value = 'Kembali ke "Penanda Halaman" untuk menggunakan fungsi ini.';
		
		parent.TOP.document.getElementById('btnBook').style.width = "110px";
	}
	else if (lang=="it") {
		strUI_btnBook = "Segnalibro";
		strUI_btnDtcSym = "DTC / Sintomi";
		strUI_btnService = "Dati di servizio (Strumento di diagnosi)";
		strUI_btnTtm = "Attrezzatura / Coppie di serraggio / Materiali";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Sintomi";
		strUI_btnServ = "Dati di servizio";
		strUI_btnSpec = "Dati tecnici";
		strUI_btnScan = "Strumento di diagnosi";
		strUI_btnTool = "Attrezzatura";
		strUI_btnTorq = "Coppie di serraggio";
		strUI_btnMat = "Materiali";
		strUI_strGoSearch = 'Vai a "Ricerca"';
		strUI_strGoNavi = 'Torna a "Indice"';
		strUI_strGoSearchDtc = 'Vai a "Ricerca"';
		strUI_strGoNaviDtc = 'Torna a "Indice"';
		strUI_strGoSearchSym = 'Vai a "Ricerca"';
		strUI_strGoNaviSym = 'Torna a "Indice"';
		strUI_iconUndo = "Torna alla pagina precedente";
		strUI_iconPrev = "Precedente";
		strUI_iconNext = "Successivo";
		strUI_iconPrint = "stampa";
		strUI_iconReturn = "prima pagina";
		strUI_iconHelp = "guida";
		parent.CTL.document.ctl.err1.value = 'Per fare uso di questa funzione, usare i "Segnalibro".';

		parent.TOP.document.getElementById('btnService').style.width = "220px";
		parent.TOP.document.getElementById('btnTool').style.width = "220px";
	}
	else if (lang=="jp") {
		strUI_btnBook = "目次";
		strUI_btnDtcSym = "DTC / 症状別故障診断";
		strUI_btnService = "サービスデータ (故障診断機)";
		strUI_btnTtm = "特殊工具 / 締付トルク / 指定材料";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "症状別故障診断";
		strUI_btnServ = "サービスデータ";
		strUI_btnSpec = "仕様";
		strUI_btnScan = "故障診断機";
		strUI_btnTool = "特殊工具";
		strUI_btnTorq = "締付トルク";
		strUI_btnMat = "指定材料";
		strUI_strGoSearch = '検索画面へ';
		strUI_strGoNavi = '目次に戻る';
		strUI_strGoSearchDtc = '検索画面へ';
		strUI_strGoNaviDtc = '目次に戻る';
		strUI_strGoSearchSym = '検索画面へ';
		strUI_strGoNaviSym = '目次に戻る';
		strUI_iconUndo = "元に戻る";
		strUI_iconPrev = "一つ戻る";
		strUI_iconNext = "一つ進む";
		strUI_iconPrint = "印刷";
		strUI_iconReturn = "Topへ";
		strUI_iconHelp = "ヘルプ";
		parent.CTL.document.ctl.err1.value = "目次に戻ってから行ってください。";

		parent.TOP.document.getElementById('btnDtcSym').style.width = "130px";
		parent.TOP.document.getElementById('btnService').style.width = "170px";
		parent.TOP.document.getElementById('btnTool').style.width = "170px";
	}
	else if (lang=="pl") {
		strUI_btnBook = "Zakładki";
		strUI_btnDtcSym = "Kody DTC / Objawy";
		strUI_btnService = "Dane serwisowe (tester)";
		strUI_btnTtm = "Narzędzia / Momenty dokręcenia / Materiały";
		strUI_btnDtc = "Kody DTC";
		strUI_btnSym = "Objawy";
		strUI_btnServ = "Dane serwisowe";
		strUI_btnSpec = "Dane techniczne";
		strUI_btnScan = "Tester";
		strUI_btnTool = "Narzędzia";
		strUI_btnTorq = "Momenty dokręcenia";
		strUI_btnMat = "Materiały";
		strUI_strGoSearch = 'Przejdź do „Szukaj”';
		strUI_strGoNavi = 'Powrót do „Lista”';
		strUI_strGoSearchDtc = 'Przejdź do „Szukaj”';
		strUI_strGoNaviDtc = 'Powrót do „Lista”';
		strUI_strGoSearchSym = 'Przejdź do „Szukaj”';
		strUI_strGoNaviSym = 'Powrót do „Lista”';
		strUI_iconUndo = "Do poprzednio wybranej strony";
		strUI_iconPrev = "Poprzednia";
		strUI_iconNext = "Następna";
		strUI_iconPrint = "drukuj";
		strUI_iconReturn = "pierwsza strona";
		strUI_iconHelp = "pomoc";
		parent.CTL.document.ctl.err1.value = 'Funkcja wymaga powrotu do „Zakładki”.';

//		parent.TOP.document.getElementById('btnBook').style.width = "70px";
		parent.TOP.document.getElementById('btnDtcSym').style.width = "110px";
		parent.TOP.document.getElementById('btnService').style.width = "140px";
		parent.TOP.document.getElementById('btnTool').style.width = "240px";
	}
	else if (lang=="ru") {
		strUI_btnBook = "Закладки";
		strUI_btnDtcSym = "Диагностический код неисправности / Признак";
		strUI_btnService = "Сервисные данные (средство сканирования)";
		strUI_btnTtm = "Инструмент / момент затяжки / компонент";
		strUI_btnDtc = "Диагностические коды неисправностей";
		strUI_btnSym = "Признак";
		strUI_btnServ = "Сервисные данные";
		strUI_btnSpec = "Спецификация";
		strUI_btnScan = "Средство сканирования";
		strUI_btnTool = "Средство";
		strUI_btnTorq = "Момент затяжки";
		strUI_btnMat = "Компонент";
		strUI_strGoSearch = 'Перейти к "Страница Поиска"';
		strUI_strGoNavi = 'Назад к "Перечень"';
		strUI_strGoSearchDtc = 'Перейти к "Страница Поиска"';
		strUI_strGoNaviDtc = 'Назад к "Перечень"';
		strUI_strGoSearchSym = 'Перейти к "Страница Поиска"';
		strUI_strGoNaviSym = 'Назад к "Перечень"';
		strUI_iconUndo = "Назад на предыдущую страницу";
		strUI_iconPrev = "Назад";
		strUI_iconNext = "Далее";
		strUI_iconPrint = "печать";
		strUI_iconReturn = "начальная страница";
		strUI_iconHelp = "справка";
		parent.CTL.document.ctl.err1.value = 'Для использования этой функции вернитесь на страницу "Закладки".';

//		parent.TOP.document.getElementById('btnBook').style.width = "70px";
		parent.TOP.document.getElementById('btnDtcSym').style.width = "220px";
		parent.TOP.document.getElementById('btnService').style.width = "180px";
		parent.TOP.document.getElementById('btnTool').style.width = "180px";
		parent.NAVI_TOP.document.getElementById('btnDtc').style.width = "180px";
		parent.document.getElementById('frames_navi_rows').rows = "90px,*";
	}
	else if (lang=="sl") {
		strUI_btnBook = "Záložky";
		strUI_btnDtcSym = "DTC / Symptóm";
		strUI_btnService = "Prevádzkové údaje (Skenovací nástroj)";
		strUI_btnTtm = "Nástroj / Krútiaci moment / Materiál";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptóm";
		strUI_btnServ = "Prevádzkové údaje";
		strUI_btnSpec = "Špecifikácie";
		strUI_btnScan = "Skenovací nástroj";
		strUI_btnTool = "Nástroj";
		strUI_btnTorq = "Krútiaci moment";
		strUI_btnMat = "Materiál";
		strUI_strGoSearch = 'Choď na "Vyhľadávanie"';
		strUI_strGoNavi = 'Späť na "Zoznam indexov"';
		strUI_strGoSearchDtc = 'Choď na "Vyhľadávanie"';
		strUI_strGoNaviDtc = 'Späť na "Zoznam indexov"';
		strUI_strGoSearchSym = 'Choď na "Vyhľadávanie"';
		strUI_strGoNaviSym = 'Späť na "Zoznam indexov"';
		strUI_iconUndo = "Späť na predchádzajúcu stranu";
		strUI_iconPrev = "Späť";
		strUI_iconNext = "Dopredu";
		strUI_iconPrint = "tlač";
		strUI_iconReturn = "titulná strana";
		strUI_iconHelp = "nápoveda";
		parent.CTL.document.ctl.err1.value = 'Ak chcete použiť túto funkciu, vráťte sa na "Záložky" (Záložky).';

		parent.TOP.document.getElementById('btnService').style.width = "220px";
		parent.TOP.document.getElementById('btnTool').style.width = "200px";
	}
	else if (lang=="sp") {
		strUI_btnBook = "CONTENIDO";
		strUI_btnDtcSym = "DTC / Síntoma";
		strUI_btnService = "Datos de servicio (Herramienta de escaneado)";
		strUI_btnTtm = "Herramienta / Par / Material";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Síntoma";
		strUI_btnServ = "Datos de servicio";
		strUI_btnSpec = "Especificación";
		strUI_btnScan = "Herramienta de escaneado";
		strUI_btnTool = "Herramienta";
		strUI_btnTorq = "Par";
		strUI_btnMat = "Material";
		strUI_strGoSearch = 'Vaya a "Buscar"';
		strUI_strGoNavi = 'Retroceda a "Lista de índices"';
		strUI_strGoSearchDtc = 'Vaya a "Buscar"';
		strUI_strGoNaviDtc = 'Retroceda a "Lista de índices"';
		strUI_strGoSearchSym = 'Vaya a "Buscar"';
		strUI_strGoNaviSym = 'Retroceda a "Lista de índices"';
		strUI_iconUndo = "Volver a la página anterior";
		strUI_iconPrev = "Anterior";
		strUI_iconNext = "Siguiente";
		strUI_iconPrint = "imprimir";
		strUI_iconReturn = "página inicial";
		strUI_iconHelp = "ayuda";
		parent.CTL.document.ctl.err1.value = 'Vuelva a "CONTENIDO" para utilizar esta función.';

		parent.TOP.document.getElementById('btnService').style.width = "260px";
		parent.TOP.document.getElementById('btnTool').style.width = "160px";
	}
	else if (lang=="th") {
		strUI_btnBook = "คั่นหน้าหนังสือ";
		strUI_btnDtcSym = "รหัส DTC / อาการปัญหา";
		strUI_btnService = "ข้อมูลบริการ (เครื่องมือ สแกน)";
		strUI_btnTtm = "เครื่องมือ / แรงบิด / วัสดุ";
		strUI_btnDtc = "รหัส DTC";
		strUI_btnSym = "อาการปัญหา";
		strUI_btnServ = "ข้อมูลบริการ";
		strUI_btnSpec = "ค่าจำเพาะ (สเปค)";
		strUI_btnScan = "เครื่องมือสแกน";
		strUI_btnTool = "เครื่องมือ";
		strUI_btnTorq = "แรงบิด";
		strUI_btnMat = "วัสดุ";
		strUI_strGoSearch = 'ไปที่ "การค้นหา"';
		strUI_strGoNavi = 'กลับไปที่ "รายการดัชนี"';
		strUI_strGoSearchDtc = 'ไปที่ "การค้นหา"';
		strUI_strGoNaviDtc = 'กลับไปที่ "รายการดัชนี"';
		strUI_strGoSearchSym = 'ไปที่ "การค้นหา"';
		strUI_strGoNaviSym = 'กลับไปที่ "รายการดัชนี"';
		strUI_iconUndo = "กลับไปที่หน้าสุดท้าย";
		strUI_iconPrev = "ก่อนหน้า";
		strUI_iconNext = "ต่อไป";
		strUI_iconPrint = "พิมพ์";
		strUI_iconReturn = "หน้าแรก";
		strUI_iconHelp = "ช่วยเหลือ";
		parent.CTL.document.ctl.err1.value = 'กลับไปที่ "คั่นหน้าหนังสือ" เพื่อใช้ฟังก์นี้';

		parent.TOP.document.getElementById('btnDtcSym').style.width = "124px";
		parent.TOP.document.getElementById('btnService').style.width = "156px";
	}
	else {
		strUI_btnBook = "Bookmarks";
		strUI_btnDtcSym = "DTC / Symptom";
		strUI_btnService = "Service Data (Scan Tool)";
		strUI_btnTtm = "Tool / Torque / Material";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptom";
		strUI_btnServ = "Service Data";
		strUI_btnSpec = "Specification";
		strUI_btnScan = "Scan Tool";
		strUI_btnTool = "Tool";
		strUI_btnTorq = "Torque";
		strUI_btnMat = "Material";
		strUI_strGoSearch = 'Go to "Search"';
		strUI_strGoNavi = 'Back to "Index List"';
		strUI_strGoSearchDtc = 'Go to "Search"';
		strUI_strGoNaviDtc = 'Back to "Index List"';
		strUI_strGoSearchSym = 'Go to "Search"';
		strUI_strGoNaviSym = 'Back to "Index List"';
		strUI_iconUndo = "Back to last page";
		strUI_iconPrev = "Previous";
		strUI_iconNext = "Next";
		strUI_iconPrint = "print";
		strUI_iconReturn = "front page";
		strUI_iconHelp = "help";
		parent.CTL.document.ctl.err1.value = 'Return to "Bookmarks" to use this function.';
	}

	parent.TOP.document.getElementById('btnBook').innerHTML = strUI_btnBook;
	parent.TOP.document.getElementById('btnDtcSym').innerHTML = strUI_btnDtcSym;
	parent.TOP.document.getElementById('btnService').innerHTML = strUI_btnService;
	parent.TOP.document.getElementById('btnTool').innerHTML = strUI_btnTtm;
	parent.NAVI_TOP.document.getElementById('btnDtc').innerHTML = strUI_btnDtc;
	parent.NAVI_TOP.document.getElementById('btnSym').innerHTML = strUI_btnSym;
	parent.NAVI_TOP.document.getElementById('btnServ').innerHTML = strUI_btnServ;
	parent.NAVI_TOP.document.getElementById('btnSpec').innerHTML = strUI_btnSpec;
	parent.NAVI_TOP.document.getElementById('btnScan').innerHTML = strUI_btnScan;
	parent.NAVI_TOP.document.getElementById('btnTool').innerHTML = strUI_btnTool;
	parent.NAVI_TOP.document.getElementById('btnTorq').innerHTML = strUI_btnTorq;
	parent.NAVI_TOP.document.getElementById('btnMat').innerHTML = strUI_btnMat;
	parent.NAVI_TOP.document.getElementById('strGoSearch').innerHTML = strUI_strGoSearch;
	parent.NAVI_TOP.document.getElementById('strGoNavi').innerHTML = strUI_strGoNavi;
	parent.NAVI_TOP.document.getElementById('strGoSearchDtc').innerHTML = strUI_strGoSearchDtc;
	parent.NAVI_TOP.document.getElementById('strGoNaviDtc').innerHTML = strUI_strGoNaviDtc;
	parent.NAVI_TOP.document.getElementById('strGoSearchSym').innerHTML = strUI_strGoSearchSym;
	parent.NAVI_TOP.document.getElementById('strGoNaviSym').innerHTML = strUI_strGoNaviSym;
	parent.TOP.document.getElementById('iconUndo').title = strUI_iconUndo;
	parent.TOP.document.getElementById('iconPrev').title = strUI_iconPrev;
	parent.TOP.document.getElementById('iconNext').title = strUI_iconNext;
	parent.TOP.document.getElementById('iconPrint').title = strUI_iconPrint;
	parent.TOP.document.getElementById('iconReturn').title = strUI_iconReturn;
	parent.TOP.document.getElementById('iconHelp').title = strUI_iconHelp;

	parent.TOP.xmlloader.transRuleMap["suzuki_all.xsl"] // 故障診断連携ボタン多国語化
		= new TranslateRegexpRule("button", 
								  {"jp":
								   {"DTC Check": "DTCの表示",
									"DTC clearance": "DTCの消去",
									"Utility" : "ユーティリティ",
									"Active test": "アクティブテスト"
								   }
								  });
}

function setUI_xref() {
lang=parent.opener.parent.CTL.document.ctl.lang.value;
	if (lang=="du") {
		strUI_iconUndo = "Terug naar de laatste bladzijde";
		strUI_iconPrint = "afdrukken";
		strUI_iconClose = "sluiten";
		strUI_iconHelp = "help";
	}
	else if (lang=="fr") {
		strUI_iconUndo = "Retour à la dernière page";
		strUI_iconPrint = "imprimer";
		strUI_iconClose = "fermer";
		strUI_iconHelp = "aide";
	}
	else if (lang=="ge") {
		strUI_iconUndo = "Zurück zur letzten Seite";
		strUI_iconPrint = "drucken";
		strUI_iconClose = "schließen";
		strUI_iconHelp = "Hilfe";
	}
	else if (lang=="gk") {
		strUI_iconUndo = "Πίσω στην τελευταία σελίδα";
		strUI_iconPrint = "εκτύπωση";
		strUI_iconClose = "κλείσιμο";
		strUI_iconHelp = "βοήθεια";
	}
	else if (lang=="hr") {
		strUI_iconUndo = "Natrag na zadnju stranicu";
		strUI_iconPrint = "ispiši";
		strUI_iconClose = "zatvori";
		strUI_iconHelp = "pomoć";
	}
	else if (lang=="hu") {
		strUI_iconUndo = "Vissza az előző oldalra";
		strUI_iconPrint = "Nyomtatás";
		strUI_iconClose = "Bezárás";
		strUI_iconHelp = "Súgó";
	}
	else if (lang=="id") {
		strUI_iconUndo = "Kembali ke halaman terakhir";
		strUI_iconPrint = "Cetak";
		strUI_iconClose = "Tutup";
		strUI_iconHelp = "Bantuan";
	}
	else if (lang=="it") {
		strUI_iconUndo = "Torna alla pagina precedente";
		strUI_iconPrint = "stampa";
		strUI_iconClose = "chiudi";
		strUI_iconHelp = "guida";
	}
	else if (lang=="jp") {
		strUI_iconUndo = "元に戻る";
		strUI_iconPrint = "印刷";
		strUI_iconClose = "閉じる";
		strUI_iconHelp = "ヘルプ";
	}
	else if (lang=="pl") {
		strUI_iconUndo = "Do poprzednio wybranej strony";
		strUI_iconPrint = "drukuj";
		strUI_iconClose = "zamknij";
		strUI_iconHelp = "pomoc";
	}
	else if (lang=="ru") {
		strUI_iconUndo = "Назад на предыдущую страницу";
		strUI_iconPrint = "печать";
		strUI_iconClose = "закрыть";
		strUI_iconHelp = "справка";
	}
	else if (lang=="sl") {
		strUI_iconUndo = "Späť na predchádzajúcu stranu";
		strUI_iconPrint = "tlač";
		strUI_iconClose = "zavrieť";
		strUI_iconHelp = "nápoveda";
	}
	else if (lang=="sp") {
		strUI_iconUndo = "Volver a la página anterior";
		strUI_iconPrint = "imprimir";
		strUI_iconClose = "cerrar";
		strUI_iconHelp = "ayuda";
	}
	else if (lang=="th") {
		strUI_iconUndo = "กลับไปที่หน้าสุดท้าย";
		strUI_iconPrint = "พิมพ์";
		strUI_iconClose = "ปิด";
		strUI_iconHelp = "ช่วยเหลือ";
	}
	else {
		strUI_iconUndo = "Back to last page";
		strUI_iconPrint = "print";
		strUI_iconClose = "close";
		strUI_iconHelp = "help";
	}
		parent.XREFTOP.document.getElementById('iconUndo').title = strUI_iconUndo;
		parent.XREFTOP.document.getElementById('iconPrint').title = strUI_iconPrint;
		parent.XREFTOP.document.getElementById('iconClose').title = strUI_iconClose;
		parent.XREFTOP.document.getElementById('iconHelp').title = strUI_iconHelp;
}

function setUI_prereqs() {
lang=parent.opener.parent.CTL.document.ctl.lang.value;
	if (lang=="du") {
		strUI_iconClose = "sluiten";
	}
	else if (lang=="fr") {
		strUI_iconClose = "fermer";
	}
	else if (lang=="ge") {
		strUI_iconClose = "schließen";
	}
	else if (lang=="gk") {
		strUI_iconClose = "κλείσιμο";
	}
	else if (lang=="hr") {
		strUI_iconClose = "zatvori";
	}
	else if (lang=="hu") {
		strUI_iconClose = "Bezárás";
	}
	else if (lang=="id") {
		strUI_iconClose = "Tutup";
	}
	else if (lang=="it") {
		strUI_iconClose = "chiudi";
	}
	else if (lang=="jp") {
		strUI_iconClose = "閉じる";
	}
	else if (lang=="pl") {
		strUI_iconClose = "zamknij";
	}
	else if (lang=="ru") {
		strUI_iconClose = "закрыть";
	}
	else if (lang=="sl") {
		strUI_iconClose = "zavrieť";
	}
	else if (lang=="sp") {
		strUI_iconClose = "cerrar";
	}
	else if (lang=="th") {
		strUI_iconClose = "ปิด";
	}
	else {
		strUI_iconClose = "close";
	}
		parent.PRETOP.document.getElementById('iconClose').title = strUI_iconClose;
}

function getUI_strNoMatch(lang) {
	if (lang=="du") {
		strOut = "Geen overeenkomsten gevonden.";
	}
	else if (lang=="fr") {
		strOut = "Aucun résultat trouvé.";
	}
	else if (lang=="ge") {
		strOut = "Keine Übereinstimmungen gefunden.";
	}
	else if (lang=="gk") {
		strOut = "Δε βρέθηκαν αποτελέσματα.";
	}
	else if (lang=="hr") {
		strOut = "Nema rezultata pretraživanja.";
	}
	else if (lang=="hu") {
		strOut = "Nincs találat.";
	}
	else if (lang=="id") {
		strOut = "Tidak cocok.";
	}
	else if (lang=="it") {
		strOut = "Nessun risultato trovato";
	}
	else if (lang=="jp") {
		strOut = "見つかりませんでした。";
	}
	else if (lang=="pl") {
		strOut = "Nie znaleziono żadnej pozycji.";
	}
	else if (lang=="ru") {
		strOut = "Совпадений не найдено.";
	}
	else if (lang=="sl") {
		strOut = "Nenájdená žiadna zhoda.";
	}
	else if (lang=="sp") {
		strOut = "No se han encontrado resultados.";
	}
	else if (lang=="th") {
		strOut = "ไม่พบที่ตรงกัน";
	}
	else {
		strOut = "No matches found.";
	}
	return strOut;
}

function getUI_btnPrev(lang) {
	if (lang=="du") {
		strOut = "Vorige...";
	}
	else if (lang=="fr") {
		strOut = "Préc...";
	}
	else if (lang=="ge") {
		strOut = "Zurück...";
	}
	else if (lang=="gk") {
		strOut = "Προηγ...";
	}
	else if (lang=="hr") {
		strOut = "Preth...";
	}
	else if (lang=="hu") {
		strOut = "Előző...";
	}
	else if (lang=="id") {
		strOut = "Sebelumnya...";
	}
	else if (lang=="it") {
		strOut = "Prec...";
	}
	else if (lang=="jp") {
		strOut = "前へ";
	}
	else if (lang=="pl") {
		strOut = "Poprz...";
	}
	else if (lang=="ru") {
		strOut = "Назад...";
	}
	else if (lang=="sl") {
		strOut = "Predchádzajúce...";
	}
	else if (lang=="sp") {
		strOut = "Anterior";
	}
	else if (lang=="th") {
		strOut = "ก่อนหน้า...";
	}
	else {
		strOut = "Prev...";
	}
	return strOut;
}

function getUI_btnNext(lang) {
	if (lang=="du") {
		strOut = "Volgende...";
	}
	else if (lang=="fr") {
		strOut = "Suiv...";
	}
	else if (lang=="ge") {
		strOut = "Weiter...";
	}
	else if (lang=="gk") {
		strOut = "Επόμενο...";
	}
	else if (lang=="hr") {
		strOut = "Sljed...";
	}
	else if (lang=="hu") {
		strOut = "Következő...";
	}
	else if (lang=="id") {
		strOut = "Selanjutnya...";
	}
	else if (lang=="it") {
		strOut = "Succ...";
	}
	else if (lang=="jp") {
		strOut = "次へ";
	}
	else if (lang=="pl") {
		strOut = "Nast...";
	}
	else if (lang=="ru") {
		strOut = "Далее...";
	}
	else if (lang=="sl") {
		strOut = "Nasledujúce...";
	}
	else if (lang=="sp") {
		strOut = "Siguiente";
	}
	else if (lang=="th") {
		strOut = "ต่อไป...";
	}
	else {
		strOut = "Next...";
	}
	return strOut;
}

function getUI_strShowCurrentHits(lang,first,last,intHits) {
	if (lang=="du") {
		strOut = " (" + first + " - " + last + " van " + intHits + " treffers weergegeven) ";
	}
	else if (lang=="fr") {
		strOut = " (" + "affiche " + first + " - " + last + " de " + intHits + " résultats) ";
	}
	else if (lang=="ge") {
		strOut = " (" + "Zeigt " + first + " - " + last + " von " + intHits + " Treffern an) ";
	}
	else if (lang=="gk") {
		strOut = " (" + "Εμφάνιση " + first + " - " + last + " από τα " + intHits + " αποτελέσματα) ";
	}
	else if (lang=="hr") {
		strOut = " (" + "Pokazuje " + first + " - " + last + " od " + intHits + " rezultata) ";
	}
	else if (lang=="hu") {
		strOut = " (" + intHits + " találatból " + first + " - " + last + " megjelenítése) ";
	}
	else if (lang=="id") {
		strOut = " (" + "Menampilkan " + first + " - " + last + " dari " + intHits + ") ";
	}
	else if (lang=="it") {
		strOut = " (" + "Mostrare " + first + " - " + last + " dei " + intHits + " risultati) ";
	}
	else if (lang=="jp") {
		strOut = " (" + intHits + "件中 " + first + " - " + last + "件目) ";
	}
	else if (lang=="pl") {
		strOut = " (" + "Pokazane " + first + " - " + last + " spośród " + intHits + " znalezionych) ";
	}
	else if (lang=="ru") {
		strOut = " (" + "Отображение " + first + " - " + last + " " + intHits + " совпадений) ";
	}
	else if (lang=="sl") {
		strOut = " (" + "Zobrazenie " + first + " - " + last + " z " + intHits + " nájdených) ";
	}
	else if (lang=="sp") {
		strOut = " (" + "Muestra " + first + " - " + last + " de los resultados " + intHits + ") ";
	}
	else if (lang=="th") {
		strOut = " (" + "แสดง " + first + " - " + last + " ของ " + intHits + " กระทบ) ";
	}
	else {
		strOut = " (" + "Showing " + first + " - " + last + " of " + intHits + " hits) ";
	}
	return strOut;
}

function getUI_strSection(lang) {
	if (lang=="du") {
		strOut = "Hoofdstuk";
	}
	else if (lang=="fr") {
		strOut = "Section";
	}
	else if (lang=="ge") {
		strOut = "Abschnitt";
	}
	else if (lang=="gk") {
		strOut = "Κεφάλαιο";
	}
	else if (lang=="hr") {
		strOut = "Poglavlje";
	}
	else if (lang=="hu") {
		strOut = "Fejezet";
	}
	else if (lang=="id") {
		strOut = "Bab";
	}
	else if (lang=="it") {
		strOut = "Sezione";
	}
	else if (lang=="jp") {
		strOut = "セクション";
	}
	else if (lang=="pl") {
		strOut = "Sekcja";
	}
	else if (lang=="ru") {
		strOut = "Раздел";
	}
	else if (lang=="sl") {
		strOut = "Časť";
	}
	else if (lang=="sp") {
		strOut = "Sección";
	}
	else if (lang=="th") {
		strOut = "หมวด";
	}
	else {
		strOut = "Section";
	}
	return strOut;
}

function getUI_strPrintAlert(lang) {
	if (lang=="du") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="fr") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="ge") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="gk") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="hr") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="hu") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="id") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="it") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="jp") {
		strOut = "印刷用にイラストサイズを最適化しています。\n印刷が終了したら、ウィンドウを閉じてください。";
	}
	else if (lang=="pl") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="ru") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="sl") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="sp") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else if (lang=="th") {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	else {
		strOut = "Image is being adjusted for printing.\nAfter printing is completed, please close the window.";
	}
	return strOut;
}
