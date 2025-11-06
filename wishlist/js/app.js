// Postman Mock Server 주소 - 여기에 여러분의 Mock Server URL을 붙여넣으세요!
// 예: https://[YOUR-MOCK-ID].mock.pstmn.io/items
const API_URL = 'https://[YOUR-MOCK-SERVER-ID].mock.pstmn.io/items'; // <<===== 이 부분을 Postman Mock Server URL로 변경하세요!

// API_URL에 placeholder가 포함되어 있으면 '연결 안 됨(Demo 모드)'으로 간주
const isApiConnected = !API_URL.includes('[YOUR-MOCK-SERVER-ID]');

if (isApiConnected) {
    console.log("✅ API mode: Connected (서버와 통신합니다)");
} else {
    console.warn("⚠️ API mode: Disconnected (Demo 모드로 동작합니다). 데이터는 새로고침 시 사라집니다.");
}

const itemForm = document.getElementById('item-form');
const itemNameInput = document.getElementById('item-name');
const itemPriceInput = document.getElementById('item-price');
const itemImageInput = document.getElementById('item-image');
const itemCategoryInput = document.getElementById('item-category');
const itemDescriptionInput = document.getElementById('item-description');
const itemLinkInput = document.getElementById('item-link');
const itemList = document.getElementById('item-list');

// --- Helper 함수: 화면에 찜 목록 아이템을 추가하는 함수 (변경 없음) ---
function addItemToDOM(item) {
    const placeholderItem = document.querySelector('.placeholder-item');
    if (placeholderItem) {
        placeholderItem.remove();
    }

    const li = document.createElement('li');
    li.dataset.id = item.id;

    const defaultImageUrl = 'https://via.placeholder.com/60?text=No+Image';
    const imageUrl = item.image && item.image.startsWith('http') ? item.image : defaultImageUrl;

    const categoryMap = {
        'electronics': '💻 전자제품',
        'fashion': '👕 패션의류',
        'books': '📚 도서',
        'living': '🏠 생활용품',
        'other': 'ETC 기타'
    };
    const categoryText = categoryMap[item.category] || item.category;
    const categoryHTML = item.category ? `<span class="item-category">${categoryText}</span>` : '';
    const descriptionHTML = item.description ? `<p class="item-description">${item.description}</p>` : '';
    const linkButtonHTML = item.link && item.link.startsWith('http')
        ? `<a href="${item.link}" target="_blank" class="link-btn">구매 링크</a>`
        : '';

    li.innerHTML = `
        <img src="${imageUrl}" alt="${item.name}" class="item-thumbnail">
        <div class="item-info">
            ${categoryHTML}
            <h3>${item.name}</h3>
            <p>${item.price.toLocaleString()}원</p>
            ${descriptionHTML}
        </div>
        <div class="item-actions">
            ${linkButtonHTML}
            <button class="delete-btn" data-id="${item.id}">삭제</button>
        </div>
    `;

    itemList.appendChild(li);
}

// --- 1. (GET) 페이지 로드 시: 서버에서 찜 목록 가져오기 (수정됨) ---
async function fetchItems() {
    if (!isApiConnected) {
        console.log("Demo Mode: Skipping initial data fetch.");
        return; // API가 연결 안 됐으면 실행 중단
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const items = await response.json();

        const placeholderItem = document.querySelector('.placeholder-item');
        if (items.length === 0) {
            if (!placeholderItem) {
                const newPlaceholder = document.createElement('li');
                newPlaceholder.className = 'placeholder-item';
                newPlaceholder.innerHTML = '<p>아직 찜한 상품이 없어요! 위에서 추가해보세요 😊</p>';
                itemList.appendChild(newPlaceholder);
            }
        } else {
            if (placeholderItem) placeholderItem.remove();
            items.forEach(item => addItemToDOM(item));
        }

    } catch (error) {
        console.error("찜 목록을 불러오는 중 오류 발생:", error);
    }
}


// --- 2. (POST) 폼 제출 시: 새 상품 서버에 추가하기 ---
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newItem = {
        name: itemNameInput.value,
        price: parseInt(itemPriceInput.value),
        category: itemCategoryInput.value,
        description: itemDescriptionInput.value,
        link: itemLinkInput.value,
        image: itemImageInput.value
    };

    if (isApiConnected) {
        // --- 1. API 연결 모드 ---
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const addedItem = await response.json();
            addItemToDOM(addedItem);
        } catch (error) {
            console.error("상품 추가 중 오류 발생:", error);
            alert("상품을 추가하지 못했습니다. Mock Server URL 또는 응답 형식을 확인해주세요.");
        }
    } else {
        // --- 2. Demo (Offline) 모드 ---
        console.log("Demo Mode: Adding item to local view only.");
        // Demo 모드에서는 삭제 기능을 위해 임시 ID를 생성 (현재 시간을 ID로 사용)
        const tempItem = { ...newItem, id: String(Date.now()) };
        addItemToDOM(tempItem);
    }

    // 폼 초기화 (공통 로직)
    itemNameInput.value = '';
    itemPriceInput.value = '';
    itemImageInput.value = '';
    itemCategoryInput.value = '';
    itemDescriptionInput.value = '';
    itemLinkInput.value = '';
});

// --- 3. (DELETE) 삭제 버튼 클릭 시: 서버에서 상품 삭제하기 ---
itemList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const liToRemove = e.target.closest('li');
        const itemId = liToRemove.dataset.id;

        if (!confirm(`"${liToRemove.querySelector('h3').textContent}" 상품을 정말 삭제하시겠습니까?`)) {
            return;
        }

        let isDeleteSuccessful = false; // 삭제 성공 여부 플래그

        if (isApiConnected) {
            // --- 1. API 연결 모드 ---
            try {
                const response = await fetch(`${API_URL}/${itemId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                isDeleteSuccessful = true; // API 삭제 성공
            } catch (error) {
                console.error("상품 삭제 중 오류 발생:", error);
                alert("상품 삭제 중 오류가 발생했습니다. Mock Server URL을 확인해주세요.");
                isDeleteSuccessful = false; // API 삭제 실패
            }
        } else {
            // --- 2. Demo (Offline) 모드 ---
            console.log("Demo Mode: Removing item from local view only.");
            isDeleteSuccessful = true; // 로컬 삭제는 항상 '성공'으로 간주
        }

        // 삭제가 성공했을 때만 화면에서 제거
        if (isDeleteSuccessful) {
            liToRemove.remove(); // 화면에서 해당 <li> 제거

            // 모든 아이템이 삭제되었다면 플레이스홀더 다시 표시
            if (itemList.children.length === 0) {
                const newPlaceholder = document.createElement('li');
                newPlaceholder.className = 'placeholder-item';
                newPlaceholder.innerHTML = '<p>아직 찜한 상품이 없어요! 위에서 추가해보세요 😊</p>';
                itemList.appendChild(newPlaceholder);
            }
        }
    }
});


// 페이지 로드 시 찜 목록 불러오기
fetchItems();