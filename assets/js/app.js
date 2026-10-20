      const vipShops = [
{"name":"여백테라피","area":"서울 강남구","address":"강남구 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-1.jpg","link":"/gangnam-gu/shops/여백테라피/","type":"VIP","sort":1},
{"name":"고운결마사지","area":"서울 서초구","address":"서초구 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-2.jpg","link":"/seocho-gu/shops/고운결마사지/","type":"VIP","sort":2},
{"name":"담온케어","area":"서울 송파구","address":"송파구 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-3.jpg","link":"/songpa-gu/shops/담온케어/","type":"VIP","sort":3},
{"name":"온새미마사지","area":"서울 마포구","address":"마포구 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-4.jpg","link":"/mapo-gu/shops/온새미마사지/","type":"VIP","sort":4},
{"name":"새봄테라피","area":"서울 용산구","address":"용산구 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-5.jpg","link":"/yongsan-gu/shops/새봄테라피/","type":"VIP","sort":5}
];
      const premiumShops = [
{"name":"여백테라피","area":"인천 연수구","address":"연수구 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-6.jpg","link":"/yeonsu-gu/shops/여백테라피/","type":"PICK","sort":1},
{"name":"고운결마사지","area":"인천 남동구","address":"남동구 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-7.jpg","link":"/namdong-gu/shops/고운결마사지/","type":"PICK","sort":2},
{"name":"담온케어","area":"인천 미추홀구","address":"미추홀구 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-8.jpg","link":"/michuhol-gu/shops/담온케어/","type":"PICK","sort":3}
];

      const shops = [...vipShops, ...premiumShops];

const card = (s, type, idx=0) => `
<article class="card">
  <div class="thumb">
    <img src="${s.image || ('assets/images/shops/room-' + ((idx % 8) + 1) + '.jpg')}" alt="${s.name} 추천 이미지">
    <span class="badge" data-label="${type}" aria-label="${type}"></span>
    <div class="thumb-title">${s.area}</div>
  </div>
  <div class="card-body">
    <h3>${s.name}</h3>
    <div class="card-sub">${s.area}</div>
    <div class="stats"><span>${type}</span><span>테라피 안내</span></div>
    
    <div class="address">${s.address}</div>
    <div class="card-bottom">
      <div class="price">${s.price}</div>
            <a href="${s.link || '#'}" class="detail-btn">자세히 보기</a>
    </div>
  </div>
</article>`;

function mlShufflePerDevice(list,key){
  const base=[...list];
  const prevKey=key+"-prev";
  const deviceKey=key+"-device";

  let deviceId=localStorage.getItem(deviceKey);
  if(!deviceId){
    const id=new Uint32Array(4);
    crypto.getRandomValues(id);
    deviceId=Array.from(id,n=>n.toString(16).padStart(8,"0")).join("");
    localStorage.setItem(deviceKey,deviceId);
  }

  let deviceHash=2166136261;
  for(const c of deviceId){
    deviceHash^=c.charCodeAt(0);
    deviceHash=Math.imul(deviceHash,16777619)>>>0;
  }

  const randomInt=(max)=>{
    const a=new Uint32Array(1);
    crypto.getRandomValues(a);
    return ((a[0]^deviceHash)>>>0)%max;
  };

  const prev=localStorage.getItem(prevKey)||"";
  let out=[...base];
  let sig="";

  for(let attempt=0;attempt<30;attempt++){
    out=[...base];

    for(let i=out.length-1;i>0;i--){
      const j=randomInt(i+1);
      [out[i],out[j]]=[out[j],out[i]];
    }

    sig=out.map(x=>x.name||x.shop||"").join("|");

    if(sig!==prev) break;
  }

  if(sig===prev && out.length>1){
    out.push(out.shift());
    sig=out.map(x=>x.name||x.shop||"").join("|");
  }

  localStorage.setItem(prevKey,sig);
  return out;
}

document.querySelector("#vipCards").innerHTML =
  mlShufflePerDevice(vipShops,"ml-vip-order")
    .map((s,i)=>card(s,"VIP",i))
    .join("");

document.querySelector("#premiumCards").innerHTML = premiumShops.map((s,i)=>card(s,"PICK",i+4)).join("");

const regions = {
"서울":[
{"name":"여백테라피","area":"서울 강남구","price":"상세페이지 확인","link":"/gangnam-gu/shops/여백테라피/"},
{"name":"고운결마사지","area":"서울 서초구","price":"상세페이지 확인","link":"/seocho-gu/shops/고운결마사지/"},
{"name":"담온케어","area":"서울 송파구","price":"상세페이지 확인","link":"/songpa-gu/shops/담온케어/"},
{"name":"온새미마사지","area":"서울 마포구","price":"상세페이지 확인","link":"/mapo-gu/shops/온새미마사지/"},
{"name":"새봄테라피","area":"서울 용산구","price":"상세페이지 확인","link":"/yongsan-gu/shops/새봄테라피/"}
],
"경기":[
{"name":"여백테라피","area":"경기 수원","price":"상세페이지 확인","link":"/suwon/gwonseon-gu/shops/여백테라피/"},
{"name":"고운결마사지","area":"경기 용인","price":"상세페이지 확인","link":"/yongin/cheoin-gu/shops/고운결마사지/"},
{"name":"담온케어","area":"경기 김포","price":"상세페이지 확인","link":"/gimpo/shops/담온케어/"},
{"name":"여백테라피","area":"경기 고양","price":"상세페이지 확인","link":"/goyang/deogyang-gu/shops/여백테라피/"}
],
"인천":[
{"name":"여백테라피","area":"인천 연수구","price":"상세페이지 확인","link":"/yeonsu-gu/shops/여백테라피/"},
{"name":"고운결마사지","area":"인천 남동구","price":"상세페이지 확인","link":"/namdong-gu/shops/고운결마사지/"},
{"name":"담온케어","area":"인천 미추홀구","price":"상세페이지 확인","link":"/michuhol-gu/shops/담온케어/"}
],
"기타지역":[
{"name":"한국미인스타마사지","area":"청주","price":"상세페이지 확인","link":"/cheongju/cheongwon-gu/shops/한국미인스타마사지/"},
{"name":"퀸마사지","area":"대전","price":"상세페이지 확인","link":"/daejeon/daedeok-gu/shops/퀸마사지/"},
{"name":"투나잇테라피","area":"천안","price":"상세페이지 확인","link":"/cheonan/dongnam-gu/shops/투나잇테라피/"},
{"name":"문라이트","area":"아산","price":"상세페이지 확인","link":"/asan/shops/문라이트/"}
]};

function drawRegion(key){
  /* === CLEAN-MASSAGE REGION IMAGE START === */
  const regionImages = [
    "assets/images/shops/room-1.jpg",
    "assets/images/shops/room-2.jpg",
    "assets/images/shops/room-3.jpg",
    "assets/images/shops/room-4.jpg",
    "assets/images/shops/room-5.jpg",
    "assets/images/shops/room-6.jpg",
    "assets/images/shops/room-7.jpg",
    "assets/images/shops/room-8.jpg"
  ];
  const tabOffset = { "서울":0, "경기":2, "인천":4, "기타지역":6 };
  const offset = tabOffset[key] || 0;

  document.querySelector("#regionItems").innerHTML = regions[key].map((x,i)=>`
    <a class="region-row region-row-with-image" href="${x.link || '#'}" style="text-decoration:none;color:inherit">
      <span class="region-row-thumb">
        <img src="${regionImages[(i + offset) % regionImages.length]}" alt="${x.area} ${x.name}" loading="lazy">
        <b>${i+1}</b>
      </span>
      <div>
        <h3>${x.name}</h3>
        <p>${x.area} 등록 업체</p>
      </div>
      <strong>${x.price}</strong>
    </a>`).join("");
  /* === CLEAN-MASSAGE REGION IMAGE END === */
}
drawRegion("서울");

document.querySelectorAll(".tabs button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    drawRegion(btn.dataset.tab);
  });
});

const drawer = document.querySelector("#drawer");
const overlay = document.querySelector("#overlay");

function menu(open){
  drawer.classList.toggle("open",open);
  overlay.classList.toggle("show",open);
  drawer.setAttribute("aria-hidden",String(!open));
}
document.querySelector("#openMenu").addEventListener("click",()=>menu(true));
document.querySelector("#closeMenu").addEventListener("click",()=>menu(false));
overlay.addEventListener("click",()=>menu(false));

document.querySelector("#searchForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const q = document.querySelector("#q").value.trim().toLowerCase();
  if(!q) return;
  document.querySelectorAll(".card,.region-row").forEach(el=>{
    const hit = el.textContent.toLowerCase().includes(q);
    el.style.outline = hit ? "2px solid #d8aa4a" : "";
    el.style.outlineOffset = hit ? "2px" : "";
  });
  document.querySelector("#vipCards").scrollIntoView({behavior:"smooth",block:"center"});
});

/* ===== v26 badge dedupe ===== */
function normalizeCardBadges(){
  document.querySelectorAll(".thumb").forEach((thumb)=>{
    const badges = Array.from(thumb.children).filter((el)=>el.classList && el.classList.contains("badge"));
    badges.forEach((badge,index)=>{
      if(index>0) badge.remove();
    });
  });
}
normalizeCardBadges();
requestAnimationFrame(normalizeCardBadges);



