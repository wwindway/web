const tableBody = document.querySelector('#table-body');
const statusMessage = document.querySelector('#status-message');
const topSaveButton = document.querySelector('#top-save-btn');
const formPanel = document.querySelector('#form-panel');
const postForm = document.querySelector('#post-form');
const titleInput = document.querySelector('#post-title');
const contentInput = document.querySelector('#post-content');
const dateInput = document.querySelector('#post-date');
const titleError = document.querySelector('#title-error');
const detailPanel = document.querySelector('#detail-panel');
const detailTitle = document.querySelector('#detail-title');
const detailContent = document.querySelector('#detail-content');
const detailDate = document.querySelector('#detail-date');
const detailViews = document.querySelector('#detail-views');
const deletePostButton = document.querySelector('#delete-post-btn');
let storageReady = true;
let bbs = [];
let selectedPostIndex = null;
let searchTerm = '';

document.querySelector('.searchbtn').onclick = function() {
  searchTerm = document.querySelector('#search').value.trim().toLowerCase();
  list();
}

topSaveButton.onclick = function() {
  formPanel.style.display = 'block';
}

document.querySelector('.close-form-btn1').onclick = function() {
  formPanel.style.display = 'none';
}



document.querySelector('.close-detail-btn2').onclick = function() {
  detailPanel.style.display = 'none';
  detailPanel.classList.add('hidden');
}

deletePostButton.onclick = function() {
  if (selectedPostIndex !== null) {
    del(selectedPostIndex);
  }
}

function insert(){
  if (!titleInput.value.trim() || !contentInput.value.trim()) {
    alert('제목과 내용을 입력해 주세요.');
    return;
  }

  bbs.push([
    titleInput.value,
    contentInput.value,
    dateInput.value,
    0
  ]);
  titleInput.value = '';
  contentInput.value = '';
  formPanel.style.display = 'none';
  list();
}

document.querySelector('.insert').onclick = insert;

function list(){
  tableBody.textContent = '';
  const posts = bbs
    .map((post, index) => ({ post, index }))
    .filter(({ post }) => post[0].toLowerCase().includes(searchTerm));

  if (posts.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.textContent = bbs.length === 0 ? '등록된 글이 없습니다.' : '검색 결과가 없습니다.';
    tableBody.appendChild(emptyState);
    return;
  }

  posts.map(({ post, index: postIndex }, displayIndex) => {
    const row = document.createElement('div');
    row.className = 'table-row-btn';

    const rowIndex = document.createElement('span');
    rowIndex.className = 'row-index';
    rowIndex.textContent = displayIndex + 1;

    const title = document.createElement('span');
    title.className = 'row-title';
    title.textContent = post[0];

    const date = document.createElement('span');
    date.className = 'row-date';
    date.textContent = post[2];

    const views = document.createElement('span');
    views.className = 'row-views';
    views.textContent = post[3];

    row.append(rowIndex, title, date, views);
    tableBody.appendChild(row);
    row.addEventListener('click', function() {
      detail(postIndex);
    });
  });
}

list();


function detail(index){
  selectedPostIndex = index;
  bbs[index][3]++;
  detailTitle.textContent = bbs[index][0];
  detailContent.textContent = bbs[index][1];
  detailDate.textContent = bbs[index][2];
  detailViews.textContent = bbs[index][3];
  formPanel.style.display = 'none';
  detailPanel.classList.remove('hidden');
  detailPanel.style.display = 'block';
  list();
}

function del(index){
  bbs.splice(index, 1);
  selectedPostIndex = null;
  detailPanel.style.display = 'none';
  detailPanel.classList.add('hidden');
  list();
}
