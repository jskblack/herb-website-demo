// ========= 假資料庫 (Hardcoded Data) =========
// (此部分與前一版相同，保持 images 陣列)
const fakeDatabase = [
    {
        id: 1,
        name: "人參 (Ginseng)",
        images: ["imgs/Ginseng1.jpg", "imgs/Ginseng2.jpg", "imgs/Ginseng3.jpg"],
        description: "人參是著名的中藥材...",
    },
    {
        id: 2,
        name: "當歸 (Angelica)",
        images: ["imgs/Angelica.jpg"],
        description: "当归的功效为...",
    },
    {
        id: 3,
        name: "枸杞 (Goji Berry)",
        images: ["imgs/Goji.jpg"],
        description: "枸杞能滋补肝肾...",
    },
    {
        id: 4,
        name: "黃耆 (Astragalus)",
        images: ["imgs/Astragalus.jpg"],
        description: "黃耆能補氣升陽...",
    }
];
// ============================================


/**
 * 功能：載入藥材格狀 (用於 index.html)
 * (此功能不變)
 */
function loadHerbGrid() {
    const grid = document.getElementById('herb-grid');
    if (!grid) return; 

    grid.innerHTML = ''; 
    fakeDatabase.forEach(herb => {
        const cardLink = document.createElement('a');
        cardLink.className = 'herb-card';
        cardLink.href = `details.html?id=${herb.id}`;
        cardLink.innerHTML = `
            <img src="${herb.images[0]}" alt="${herb.name}">
            <h3>${herb.name}</h3>
        `;
        grid.appendChild(cardLink);
    });
}


/**
 * 功能：載入單一藥材資訊 (用於 details.html)
 * (v--v---v--- 已大幅修改 ---v---v---v)
 */
function loadHerbDetails() {
    // 1. 取得藥材資料
    const params = new URLSearchParams(window.location.search);
    const herbId = params.get('id');
    const herb = fakeDatabase.find(h => h.id == herbId);

    const container = document.getElementById('herb-details-container');
    if (!container || !herb) {
        if (container) container.innerHTML = '<h2>找不到藥材資訊</h2>';
        return;
    }

    document.title = herb.name;
    const totalImages = herb.images.length;
    const firstImage = herb.images[0];

    // --- 2. 建立「頁面上」的內容 (預覽圖 + 按鈕 + 描述) ---
    container.innerHTML = `
        <img src="${firstImage}" alt="${herb.name} (預覽)" class="main-image-preview">
        
        ${totalImages > 1 ? '<button id="open-gallery-btn" class="btn">點我看完整圖片集</button>' : ''}
        
        <h2>${herb.name}</h2>
        <p>${herb.description.replace(/\n/g, '<br>')}</p>
    `;

    // --- 3. 建立「Modal 中」的滑動相簿 ---
    const modalSlider = document.getElementById('modal-slider');
    if (!modalSlider) return; // 防呆

    // 建立所有 slide HTML
    const slidesHtml = herb.images.map((imgSrc, index) => `
        <div class="slide" style="flex-shrink: 0; width: 100%;">
            <img src="${imgSrc}" alt="${herb.name} 圖片 ${index + 1}">
        </div>
    `).join('');
    
    modalSlider.innerHTML = slidesHtml; // 注入 Modal

    // --- 4. 綁定 Modal 的事件 (開啟/關閉) ---
    const galleryModal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementById('gallery-close-btn');
    
    // 只有在按鈕存在時 (圖片>1)，才綁定開啟事件
    if (totalImages > 1) {
        const openBtn = document.getElementById('open-gallery-btn');
        openBtn.addEventListener('click', () => {
            galleryModal.style.display = 'flex';
        });
    }

    // 關閉按鈕
    closeBtn.addEventListener('click', () => {
        galleryModal.style.display = 'none';
    });

    // 點擊 Modal 背景關閉
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
        }
    });

    // --- 5. 啟動「Modal 中」的滑動功能 ---
    const modalPrevBtn = document.getElementById('modal-prev-btn');
    const modalNextBtn = document.getElementById('modal-next-btn');
    let currentSlide = 0;

    // 只有一張圖時，隱藏 Modal 中的左右按鈕
    if (totalImages <= 1) {
        modalPrevBtn.style.display = 'none';
        modalNextBtn.style.display = 'none';
    }

    function updateModalSliderPosition() {
        modalSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    modalNextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalImages;
        updateModalSliderPosition();
    });

    modalPrevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalImages) % totalImages;
        updateModalSliderPosition();
    });
}