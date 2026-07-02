/*==========================================
    BOGOR FOOD CMS
    IndexedDB
==========================================*/

const DB_NAME = "BogorFoodCMS";
const DB_VERSION = 1;
const STORE_NAME = "foods";

let db;

// ==========================
// OPEN DATABASE
// ==========================

function openDB(){

    return new Promise((resolve,reject)=>{

        const request = indexedDB.open(DB_NAME,DB_VERSION);

        request.onerror = ()=>{

            reject("Database gagal dibuka");

        };

        request.onsuccess = ()=>{

            db = request.result;

            resolve(db);

        };

        request.onupgradeneeded = (event)=>{

            db = event.target.result;

            if(!db.objectStoreNames.contains(STORE_NAME)){

                const store = db.createObjectStore(STORE_NAME,{
                    keyPath:"id",
                    autoIncrement:true
                });

                store.createIndex("name","name",{unique:false});

                store.createIndex("category","category",{unique:false});

                store.createIndex("status","status",{unique:false});

                store.createIndex("sync","sync",{unique:false});

            }

        };

    });

}



// ==========================
// INSERT
// ==========================

async function addFood(data){

    await openDB();

    return new Promise((resolve,reject)=>{

        const tx = db.transaction(STORE_NAME,"readwrite");

        const store = tx.objectStore(STORE_NAME);

        store.add({

            ...data,

            createdAt:new Date(),

            updatedAt:new Date(),

            sync:false

        });

        tx.oncomplete=()=>resolve();

        tx.onerror=()=>reject();

    });

}



// ==========================
// GET ALL
// ==========================

async function getFoods(){

    await openDB();

    return new Promise((resolve)=>{

        const tx=db.transaction(STORE_NAME,"readonly");

        const store=tx.objectStore(STORE_NAME);

        const request=store.getAll();

        request.onsuccess=()=>{

            resolve(request.result);

        };

    });

}



// ==========================
// GET BY ID
// ==========================

async function getFood(id){

    await openDB();

    return new Promise(resolve=>{

        const tx=db.transaction(STORE_NAME);

        const store=tx.objectStore(STORE_NAME);

        const req=store.get(id);

        req.onsuccess=()=>{

            resolve(req.result);

        };

    });

}



// ==========================
// UPDATE
// ==========================

async function updateFood(food){

    await openDB();

    return new Promise((resolve)=>{

        const tx=db.transaction(STORE_NAME,"readwrite");

        const store=tx.objectStore(STORE_NAME);

        food.updatedAt=new Date();

        food.sync=false;

        store.put(food);

        tx.oncomplete=()=>resolve();

    });

}



// ==========================
// DELETE
// ==========================

async function deleteFood(id){

    await openDB();

    return new Promise((resolve)=>{

        const tx=db.transaction(STORE_NAME,"readwrite");

        const store=tx.objectStore(STORE_NAME);

        store.delete(id);

        tx.oncomplete=()=>resolve();

    });

}



// ==========================
// PENDING SYNC
// ==========================

async function getPendingData(){

    const foods=await getFoods();

    return foods.filter(item=>item.sync===false);

}



// ==========================
// UPDATE SYNC
// ==========================

async function markAsSynced(id){

    const food=await getFood(id);

    food.sync=true;

    await updateFood(food);

}



// ==========================
// CLEAR DATABASE
// ==========================

async function clearDB(){

    await openDB();

    return new Promise(resolve=>{

        const tx=db.transaction(STORE_NAME,"readwrite");

        tx.objectStore(STORE_NAME).clear();

        tx.oncomplete=()=>resolve();

    });

}



// ==========================
// TOTAL DATA
// ==========================

async function countFood(){

    const foods=await getFoods();

    return foods.length;

}



// ==========================
// DEMO DATA
// ==========================

async function seedData(){

    const foods=await getFoods();

    if(foods.length>0) return;

    await addFood({

        name:"Soto Mie Bogor",

        category:"Makanan",

        description:"Kuliner khas Bogor",

        status:"Published"

    });

    await addFood({

        name:"Asinan Bogor",

        category:"Makanan",

        description:"Segar",

        status:"Draft"

    });

    console.log("Demo Data Berhasil");

}

seedData();
