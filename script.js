// ========= 假資料庫 (Hardcoded Data) =========
// 圖片已更新為使用 "images" 陣列
const fakeDatabase = [
    {
        id: 1,
        name: "人參 (Ginseng)",
        images: [
            "imgs/Ginseng1.jpg", 
            "imgs/Ginseng2.jpg", 
            "imgs/Ginseng3.jpg"
        ],
        description: "人參是著名的中藥材，主要功效為大補元氣、固脫生津、安神益智。常用於體虛欲脫、肢冷脈微、脾虛食少、肺虛喘咳、津傷口渴、內熱消渴等症。",
    },
    {
        id: 2,
        name: "當歸 (Angelica)",
        images: ["imgs/Angelica.jpg"], // 保持陣列結構，即使只有一張
        description: "當歸的功效為補血活血、調經止痛、潤腸通便。常用於血虛萎黃、眩暈心悸、月經不調、經閉痛經、虛寒腹痛、腸燥便秘、風濕痹痛、跌打損傷、癰疽瘡瘍。",
    },
    {
        id: 3,
        name: "枸杞 (Goji Berry)",
        images: ["imgs/Goji.jpg"], // 保持陣列結構
        description: "枸杞能滋補肝腎、益精明目。常用於虛勞精虧、腰膝痠痛、眩暈耳鳴、內熱消渴、血虛萎黃、目昏不明。",
    },
    {
        id: 4,
        name: "黃耆 (Astragalus)",
        images: ["imgs/Astragalus.jpg"], // 保持陣列結構
        description: "黃耆能補氣升陽、固表止汗、利水消腫、生津養血、行滯通痹、托毒排膿、斂瘡生肌。常用於氣虛乏力、食少便溏、中氣下陷、久瀉脫肛、便血崩漏、表虛自汗等。",
    }
];
// ============================================


/**
 * 功能：載入藥材格狀 (用於 index.html)
 * (此功能不變，但會自動抓取 images 陣列中的第一張圖)
 */
function loadHerbGrid() {
    const grid = document.getElementById('herb-grid');
    if (!grid) return; 

    grid.innerHTML = ''; 
    fakeDatabase.forEach(herb => {
        const cardLink = document.createElement('a');
        cardLink.className = 'herb-card';
        cardLink.href = `details.html?id=${herb.id}`;

        // 自動抓取 images 陣列的 [0] (第一張) 當作縮圖
        cardLink.innerHTML = `
            <img src="${herb.images[0]}" alt="${herb.name}">
            <h3>${herb.name}</h3>
        `;
        
        grid.appendChild(cardLink);
    });
}

/**
 * 功能：載入單一藥材資訊 (用於 details.html)
 * (此功能已大幅修改，以支援相簿和燈箱)
 */
function loadHerbDetails() {
    const container = document.getElementById('herb-details-container');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const herbId = params.get('id');
    const herb = fakeDatabase.find(h => h.id == herbId);

    if (herb) {
        document.title = herb.name; 
        
        // --- 1. 建立相簿 HTML 結構 ---
        const slidesHtml = herb.images.map((imgSrc, index) => `
            <div class="slide" style="flex-shrink: 0; width: 100%;">
                <img src="${imgSrc}" alt="${herb.name} 圖片 ${index + 1}" class="gallery-img">
            </div>
        `).join(''); 

        container.innerHTML = `
            <div class="gallery-container">
                <div class="slider">
                    ${slidesHtml}
                </div>
                <button class="slide-btn prev" id="prev-btn">&lt;</button>
                <button class="slide-btn next" id="next-btn">&gt;</button>
            </div>

            <h2>${herb.name}</h2>
            <p>${herb.description.replace(/\n/g, '<br>')}</p>
        `;
        
        // --- 2. 啟動相簿滑動功能 ---
        const slider = container.querySelector('.slider');
        const slides = container.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        let currentSlide = 0;
        const totalSlides = slides.length;

        // 只有一張圖時，隱藏按鈕
        if (totalSlides <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        // v--v---v--- 已修正 (移除多餘的 '\') ---v---v---v
        // 更新滑動位置的函數
        function updateSliderPosition() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        // ^--^---^--- 已修正 (移除多餘的 '\') ---^---^---^

        // 綁定按鈕事件
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSliderPosition();
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSliderPosition();
        });

        // --- 3. 啟動燈箱 (Lightbox) 放大功能 ---
        const lightbox = document.getElementById('lightbox-modal');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('close-btn');
        
        // 幫 "每一張" 圖片綁定點擊事件
        container.querySelectorAll('.gallery-img').forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex'; // 顯示燈箱
                lightboxImg.src = img.src; // 將點擊的圖片 src 放入燈箱
            });
        });

        // 關閉按鈕
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // 點擊燈箱背景也可以關閉
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // 確保是點擊背景，而非圖片
                lightbox.style.display = 'none';
            }
        });

    } else {
        container.innerHTML = '<h2>找不到藥材資訊</h2><p>請返回首頁。</p>';
    }
}