// ========= 假資料庫 (Hardcoded Data) =========
// 圖片已更新為使用本地 imgs/ 資料夾
const fakeDatabase = [
    {
        id: 1,
        name: "人參 (Ginseng)",
        image: "imgs/Ginseng.jpg", // <--- 已修改
        description: "人參是著名的中藥材，主要功效為大補元氣、固脫生津、安神益智。常用於體虛欲脫、肢冷脈微、脾虛食少、肺虛喘咳、津傷口渴、內熱消渴等症。",
    },
    {
        id: 2,
        name: "當歸 (Angelica)",
        image: "imgs/Angelica.jpg", // <--- 已修改
        description: "當歸的功效為補血活血、調經止痛、潤腸通便。常用於血虛萎黃、眩暈心悸、月經不調、經閉痛經、虛寒腹痛、腸燥便秘、風濕痹痛、跌打損傷、癰疽瘡瘍。",
    },
    {
        id: 3,
        name: "枸杞 (Goji Berry)",
        image: "imgs/Goji.jpg", // <--- 已修改
        description: "枸杞能滋補肝腎、益精明目。常用於虛勞精虧、腰膝痠痛、眩暈耳鳴、內熱消渴、血虛萎黃、目昏不明。",
    },
    {
        id: 4,
        name: "黃耆 (Astragalus)",
        image: "imgs/Astragalus.jpg", // <--- 已修改
        description: "黃耆能補氣升陽、固表止汗、利水消腫、生津養血、行滯通痹、托毒排膿、斂瘡生肌。常用於氣虛乏力、食少便溏、中氣下陷、久瀉脫肛、便血崩漏、表虛自汗等。",
    }
];
// ============================================


/**
 * 功能：載入藥材格狀 (用於 index.html)
 */
function loadHerbGrid() {
    const grid = document.getElementById('herb-grid');
    if (!grid) return; // 如果頁面上沒有這個 ID，就跳出

    grid.innerHTML = ''; // 清空
    fakeDatabase.forEach(herb => {
        // 建立一個連結 (<a>)，它是一個卡片
        const cardLink = document.createElement('a');
        cardLink.className = 'herb-card';
        // 關鍵：使用 URL 參數 (query string) 來傳遞 ID
        cardLink.href = `details.html?id=${herb.id}`;

        // 卡片內容
        cardLink.innerHTML = `
            <img src="${herb.image}" alt="${herb.name}">
            <h3>${herb.name}</h3>
        `;
        
        grid.appendChild(cardLink);
    });
}

/**
 * 功能：載入單一藥材資訊 (用於 details.html)
 */
function loadHerbDetails() {
    const container = document.getElementById('herb-details-container');
    if (!container) return; // 如果頁面上沒有這個 ID，就跳出

    // 1. 取得 URL 中的 id 參數
    const params = new URLSearchParams(window.location.search);
    const herbId = params.get('id'); // 取得 'id' 的值，例如 '2'

    // 2. 在假資料庫中尋找
    // 注意：params.get('id') 拿到的是字串，herb.id 是數字，所以用 ==
    const herb = fakeDatabase.find(h => h.id == herbId);

    // 3. 顯示內容
    if (herb) {
        document.title = herb.name; // 更新網頁標題
        
        // <--- 已修改：移除了 .replace('300x200', '600x400')
        container.innerHTML = `
            <img src="${herb.image}" alt="${herb.name}"> 
            <h2>${herb.name}</h2>
            <p>${herb.description.replace(/\n/g, '<br>')}</p>
        `;
    } else {
        container.innerHTML = '<h2>找不到藥材資訊</h2><p>請返回首頁。</p>';
    }
}