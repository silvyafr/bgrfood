/* ===================================
   BOGOR FOOD CMS
   app.js
=================================== */

// ==========================
// ONLINE / OFFLINE STATUS
// ==========================

function updateNetworkStatus(){

    const status=document.querySelector(".status");

    if(!status) return;

    if(navigator.onLine){

        status.innerHTML="🟢 Online";

        status.classList.remove("offline");

        status.classList.add("online");

    }

    else{

        status.innerHTML="🔴 Offline";

        status.classList.remove("online");

        status.classList.add("offline");

    }

}

window.addEventListener("online",updateNetworkStatus);

window.addEventListener("offline",updateNetworkStatus);

updateNetworkStatus();


// ==========================
// DARK MODE
// ==========================

const darkSwitch=document.querySelector("#darkMode");

if(darkSwitch){

    darkSwitch.addEventListener("change",()=>{

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark")
        );

    });

    if(localStorage.getItem("theme")=="true"){

        document.body.classList.add("dark");

        darkSwitch.checked=true;

    }

}



// ==========================
// MODAL
// ==========================

function openModal(id){

    document.getElementById(id).style.display="flex";

}

function closeModal(id){

    document.getElementById(id).style.display="none";

}



// ==========================
// BUTTON TAMBAH DATA
// ==========================

const addFood=document.getElementById("addFoodBtn");

if(addFood){

    addFood.onclick=()=>{

        openModal("foodModal");

    }

}

const addDrink=document.getElementById("addDrinkBtn");

if(addDrink){

    addDrink.onclick=()=>{

        openModal("drinkModal");

    }

}

const addSouvenir=document.getElementById("addSouvenirBtn");

if(addSouvenir){

    addSouvenir.onclick=()=>{

        openModal("souvenirModal");

    }

}

const addCategory=document.getElementById("addCategoryBtn");

if(addCategory){

    addCategory.onclick=()=>{

        openModal("categoryModal");

    }

}



// ==========================
// CLOSE MODAL
// ==========================

document.querySelectorAll(".modal").forEach(modal=>{

    modal.addEventListener("click",(e)=>{

        if(e.target===modal){

            modal.style.display="none";

        }

    });

});



// ==========================
// TOAST
// ==========================

function toast(text){

    const div=document.createElement("div");

    div.className="toast";

    div.innerHTML=text;

    document.body.appendChild(div);

    setTimeout(()=>{

        div.classList.add("show");

    },100);

    setTimeout(()=>{

        div.remove();

    },3000);

}



// ==========================
// DASHBOARD STAT
// ==========================

const foodTotal=document.getElementById("foodTotal");

if(foodTotal){

    foodTotal.innerHTML=25;

}

const drinkTotal=document.getElementById("drinkTotal");

if(drinkTotal){

    drinkTotal.innerHTML=12;

}

const souvenirTotal=document.getElementById("souvenirTotal");

if(souvenirTotal){

    souvenirTotal.innerHTML=8;

}

const pendingSync=document.getElementById("pendingSync");

if(pendingSync){

    pendingSync.innerHTML=3;

}



// ==========================
// LOGOUT
// ==========================

function logout(){

    if(confirm("Yakin ingin logout?")){

        location.href="../index.html";

    }

}



// ==========================
// BUTTON LOGOUT
// ==========================

document.querySelectorAll(".logout").forEach(btn=>{

    btn.onclick=logout;

});



// ==========================
// SINKRONISASI
// ==========================

const syncBtn=document.getElementById("syncBtn");

if(syncBtn){

    syncBtn.onclick=()=>{

        toast("☁ Sinkronisasi berhasil");

    }

}



// ==========================
// TOAST CSS
// ==========================

const style=document.createElement("style");

style.innerHTML=`

.toast{

position:fixed;

right:25px;

bottom:25px;

background:#2e7d32;

color:white;

padding:15px 25px;

border-radius:10px;

opacity:0;

transition:.4s;

box-shadow:0 10px 25px rgba(0,0,0,.25);

z-index:9999;

}

.toast.show{

opacity:1;

}

.dark{

background:#1e1e1e;

color:white;

}

.dark .card,

.dark .box,

.dark .table-container{

background:#2b2b2b;

color:white;

}

`;

document.head.appendChild(style);

console.log("Bogor Food CMS Loaded ✔");
