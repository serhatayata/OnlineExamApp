let sunucudanDonen;

var baglanti = new XMLHttpRequest();
baglanti.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        sunucudanDonen=JSON.parse(baglanti.responseText);
        soruGetir();      
    }
    return sunucudanDonen;
};
baglanti.open("GET","data.json", true);
baglanti.send();
document.addEventListener("DOMContentLoaded", () => {soruCevap = ["Yanlış","Yanlış","Yanlış","Yanlış"];
});
const sonucAlani = document.getElementsByClassName("soruAlani")[0];
const soru = document.getElementById("soru");
const secenekler = document.getElementsByName("secenek");
const aciklamaA = document.getElementById("aciklamaA");
const aciklamaB = document.getElementById("aciklamaB");
const aciklamaC = document.getElementById("aciklamaC");
const aciklamaD = document.getElementById("aciklamaD");
const gonderButonu = document.getElementById("gonder");

let puan = 0;
let sira = 0;
soruCevap = ["Yanlış","Yanlış","Yanlış","Yanlış"];
// Add Event Listeners
//Buton event
gonderButonu.addEventListener("click", () => {
    const secilen=secimiAl(); 
    console.log(secilen);
    if(secilen){
        if(secilen===sunucudanDonen.sorular[sira].cevap){
            puan++;
            soruCevap[sira]="Doğru";
        }
    }
    sira++;
    if(sira < sunucudanDonen.sorular.length){
        soruGetir();
    }
    else {
        let tamPuan = puan*25;
        sonucAlani.innerHTML = `
        <h2>PUAN =  ${tamPuan}</h2>
        <h2>Mevcut sorular içerisinden ${puan}/${sunucudanDonen.sorular.length} oranında başarı sağladınız. </h2> 
        <h2>Soru 1 : ${soruCevap[0]}</h2>
        <h2>Soru 2 : ${soruCevap[1]}</h2>
        <h2>Soru 3 : ${soruCevap[2]}</h2>
        <h2>Soru 4 : ${soruCevap[3]}</h2>
        `
        gonderButonu.setAttribute("onclick","location.reload()");
        gonderButonu.innerHTML = "Yeniden Başlat"; 
        
    }
  })
/* -------------------- */
function soruGetir(){
    secimiTemizle();
    let siradakiSoru = sunucudanDonen.sorular[sira]
    soru.innerHTML=siradakiSoru.soru;
    aciklamaA.innerText = siradakiSoru.aciklamaA;
    aciklamaB.innerText = siradakiSoru.aciklamaB;
    aciklamaC.innerText = siradakiSoru.aciklamaC;
    aciklamaD.innerText = siradakiSoru.aciklamaD;
}
function secimiTemizle(){
    secenekler.forEach(secenek => secenek.checked = false);
}
function secimiAl(){
    let secim;

    secenekler.forEach(secenek => {
        if(secenek.checked){
            secim=secenek.id;
        } 
    })
    return secim;
}
console.log(soruCevap)