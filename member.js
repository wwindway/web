  const memberListEl = document.getElementById('member-list');
  const registerFormEl = document.getElementById('register-form');
  const submitBtn = registerFormEl.querySelector('button[type="submit"]');
  const searchTierEl = document.getElementById('searchtier');
  let selectedIndex = null;
  let selectedTier = null;
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  closeModalBtn.addEventListener('click', () => {
    registerFormEl.style.display = 'none';
  });
  const saveBtn = document.getElementById('save-btn');
  saveBtn.addEventListener('click', () => {
    selectedIndex = null;
    registerFormEl.reset();
    submitBtn.textContent = '등록';
    registerFormEl.style.display = 'block';
    registerFormEl.style.position = 'fixed';
  });
  const nameInput = document.getElementById('member-name');
  const addressInput = document.getElementById('member-address');
  const emailInput = document.getElementById('member-email');
  const ageInput = document.getElementById('member-age');
  const statusSelect = document.getElementById('member-status');
  const tierButtons = document.querySelectorAll('.tier-option');
  const errorEl = document.getElementById('form-error');
  const toastEl = document.getElementById('toast');

  const member = [];
  member[0] ={
    name:'홍길동' ,
    addr : '서울시 노원구' ,
    email : 'aaaa@aaaa.com',
    age : 20,
    tiger : 'VIP',
    status : '온라인',
  }

  //  CRUD
  // create 입력
  const Create = ()=>{
    member.push({
      name: nameInput.value.trim(),
      addr: addressInput.value.trim(),
      email: emailInput.value.trim(),
      age: Number(ageInput.value),
      tiger: document.querySelector('.tiger').value,
      status: statusSelect.value,
    });
    List();
  }

  registerFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    if (selectedIndex === null) {
      Create();
    } else {
      Update();
    }
  });
  // read(List) 읽기
  const List = ()=>{
    memberListEl.replaceChildren();

    const visibleMembers = member
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => selectedTier === null || item.tiger === selectedTier);

    visibleMembers.map(({ item, index }, displayIndex) => {
      const row = document.createElement('div');
      row.className = 'table-row';

      const values = [displayIndex + 1, item.name, item.addr, item.email, item.age, item.tiger, item.status];
      values.forEach((value, column) => {
        const cell = document.createElement('span');
        cell.textContent = value;
        if (column === 1) {
          const nameButton = document.createElement('button');
          nameButton.type = 'button';
          nameButton.className = 'status-toggle';
          nameButton.textContent = value;
          nameButton.addEventListener('click', () => Read(index));
          cell.replaceChildren(nameButton);
        }
        if (column === 3) cell.className = 'email-cell';
        if (column === 6) cell.className = 'align-right';
        row.appendChild(cell);
      });

      memberListEl.appendChild(row);
    });
  }

  List();

  document.querySelector('.searchbtn').addEventListener('click', () => {
    selectedTier = searchTierEl.value;
    List();
  });

  const Read = (index)=>{
    const item = member[index];
    if (!item) return;
    selectedIndex = index;
    submitBtn.textContent = '수정';

    nameInput.value = item.name;
    addressInput.value = item.addr;
    emailInput.value = item.email;
    ageInput.value = item.age;
    document.querySelector('.tiger').value = item.tiger;
    statusSelect.value = item.status;

    registerFormEl.style.display = 'block';
    registerFormEl.style.position = 'fixed';
    registerFormEl.style.visibility = 'visible';
    nameInput.focus();
  }
  // update 수정
  const Update = ()=>{
    if (selectedIndex === null || !member[selectedIndex]) return;

    member[selectedIndex] = {
      ...member[selectedIndex],
      name: nameInput.value.trim(),
      addr: addressInput.value.trim(),
      email: emailInput.value.trim(),
      age: Number(ageInput.value),
      tiger: document.querySelector('.tiger').value,
      status: statusSelect.value,
    };
    List();
    registerFormEl.style.display = 'none';
  }
  // delete 삭제
 const Delete = ()=>{}

