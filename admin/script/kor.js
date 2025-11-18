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

  gradeData.push({
    username: username.val(),
    kor: Number(kor.val()),
    eng: Number(eng.val()),
    math: Number(math.val()),
    total: total,
    avg: avg,
  });

  username.val("");
  kor.val("");
  eng.val("");
  math.val("");
});

$(".chartlist").click(function () {
  $(".chart").css("display", "block");
  drawChart();
});

let ctx = document.querySelector(".chartView").getContext("2d");

function drawChart() {
  let unit = 120;
  ctx.fillStyle = "#ddd";
  ctx.fillRect(0, unit, 800, 1);
  ctx.fillRect(0, unit + 60, 800, 1);
  unit += 60;
  ctx.fillRect(0, unit + 60, 800, 1);
  unit += 60;
  ctx.fillRect(0, unit + 60, 800, 1);
  unit += 60;
  ctx.fillRect(0, unit + 60, 800, 1);

  ctx.fillStyle = "black";
  ctx.font = "20px Noto Sans KR";
  let chartLine = 60;
  ctx.fillText("0", 0, 400 - chartLine);
  chartLine += 60;
  ctx.fillText("30", 0, 400 - chartLine);
  chartLine += 60;
  ctx.fillText("50", 0, 400 - chartLine);
  chartLine += 60;
  ctx.fillText("80", 0, 400 - chartLine);
  chartLine += 60;
  ctx.fillText("100", 0, 400 - chartLine);

  let startX = 100; // 첫학생 막대시작위치
  let gap = 130; // 학생간격

  gradeData.forEach((stu, index) => {
    let baseY = 360;
    //  국어
    ctx.fillStyle = "red";
    ctx.fillRect(startX, baseY - stu.kor * 3, 30, stu.kor * 3);
    // 영어
    ctx.fillStyle = "blue";
    ctx.fillRect(startX + 35, baseY - stu.eng * 3, 30, stu.eng * 3);
    // 수학
    ctx.fillStyle = "green";
    ctx.fillRect(startX + 70, baseY - stu.math * 3, 30, stu.math * 3);
    //  이름
    ctx.fillStyle = "black";
    ctx.fillText(stu.username, startX + 5, baseY + 30);
    startX += gap;
  });
}
