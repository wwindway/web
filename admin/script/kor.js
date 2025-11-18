/// <reference path="./jquery.d.ts" />

let num = 1;
let gradeData = [];
$("#btn").click(() => {
  let username = $("#username");
  if (username.val() == "") {
    alert("이름을 입력하세요.");
    username.focus();
    return;
  }

  let kor = $("#kor");
  // isNaN
  if (kor.val() == "" || isNaN(Number(kor.val())) == true) {
    alert("국어점수를 확인하세요.");
    kor.focus();
    return;
  }

  let eng = $("#eng");
  // isNaN
  if (eng.val() == "" || isNaN(Number(eng.val())) == true) {
    alert("영어점수를 확인하세요.");
    eng.focus();
    return;
  }

  let math = $("#math");
  // isNaN
  if (math.val() == "" || isNaN(Number(math.val())) == true) {
    alert("수학점수를 확인하세요.");
    math.focus();
    return;
  }
  let total = Number(kor.val()) + Number(eng.val()) + Number(math.val());
  let avg = Math.floor((total / 3) * 100) / 100;

  let view = `<li><p>${num}</p><p>${username.val()}</p><p>${kor.val()}</p><p>${eng.val()}</p><p>${math.val()}</p><p>${total}</p><p>${avg}</p></li>`;
  $(".list ul").append(view);
  num++;
});
