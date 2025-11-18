/// <reference path="./jquery.d.ts" />

$(".wrap button").click(() => {
  const adminid = "admin";
  const adminpw = "1234";
  let userid = $(".wrap #userid");
  let userpw = $(".wrap #userpw");
  if (userid.val() == "") {
    alert("아이디를 입력하세요.");
    userid.focus();
    return;
  }

  if (userpw.val() == "") {
    alert("비밀번호를 입력하세요.");
    userpw.focus();
    return;
  }

  if (userid.val() == adminid && userpw.val() == adminpw) {
    location.href = "admin.html";
  } else {
    alert("아이디나 비밀번호 확인하세요.");
  }
});
