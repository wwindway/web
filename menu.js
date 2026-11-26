const renderMenu = () => {
  const aside = document.querySelector('.aside');
  if (!aside) return;

  aside.innerHTML = `
    <ul style="margin-top:140px">
      <li><a href="bbs.html">공지사항</a></li>
      <li><a href="member.html">회원관리</a></li>
    </ul>
  `;
};

renderMenu();
