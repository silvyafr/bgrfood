/*==========================================
    BOGOR FOOD CMS
    foods.js
==========================================*/

const tbody = document.getElementById("foodTable");

const form = document.querySelector("#foodModal");

const saveButton = form.querySelector("button");


// ===========================
// LOAD DATA
// ===========================

async function loadFoods(){

    const foods = await getFoods();

    tbody.innerHTML = "";

    foods.forEach(food=>{

        tbody.innerHTML += `

        <tr>

            <td>🍜</td>

            <td>${food.name}</td>

            <td>${food.category}</td>

            <td>

                <span class="badge ${
                    food.status=="Published"
                    ?"published":"draft"
                }">

                    ${food.status}

                </span>

            </td>

            <td>

                <span class="badge ${
                    food.sync
                    ?"synced":"pending"
                }">

                    ${
                        food.sync
                        ?"Synced":"Pending"
                    }

                </span>

            </td>

            <td>

                <button onclick="editFood(${food.id})">

                    Edit

                </button>

                <button class="danger"

                    onclick="removeFood(${food.id})">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

}

loadFoods();


// ===========================
// SIMPAN DATA
// ===========================

saveButton.onclick = async ()=>{

    const name = form.querySelector("input[type=text]").value;

    const category = form.querySelector("select").value;

    const description = form.querySelector("textarea").value;

    const status = form.querySelectorAll("select")[1].value;

    if(name==""){

        toast("Nama makanan wajib diisi");

        return;

    }

    await addFood({

        name,

        category,

        description,

        status

    });

    toast("Data berhasil ditambahkan");

    form.style.display="none";

    loadFoods();

};


// ===========================
// DELETE
// ===========================

async function removeFood(id){

    if(confirm("Hapus data?")){

        await deleteFood(id);

        toast("Data berhasil dihapus");

        loadFoods();

    }

}


// ===========================
// EDIT
// ===========================

async function editFood(id){

    const food = await getFood(id);

    form.style.display="flex";

    form.querySelector("input[type=text]").value = food.name;

    form.querySelector("select").value = food.category;

    form.querySelector("textarea").value = food.description;

    form.querySelectorAll("select")[1].value = food.status;

    saveButton.innerHTML="Update";

    saveButton.onclick = async ()=>{

        food.name = form.querySelector("input[type=text]").value;

        food.category = form.querySelector("select").value;

        food.description = form.querySelector("textarea").value;

        food.status = form.querySelectorAll("select")[1].value;

        await updateFood(food);

        toast("Data berhasil diupdate");

        form.style.display="none";

        saveButton.innerHTML="Simpan";

        loadFoods();

    };

}


// ===========================
// SEARCH
// ===========================

const search = document.querySelector(".toolbar input");

search.onkeyup = async ()=>{

    const keyword = search.value.toLowerCase();

    const foods = await getFoods();

    tbody.innerHTML="";

    foods

    .filter(food=>{

        return food.name.toLowerCase()

        .includes(keyword);

    })

    .forEach(food=>{

        tbody.innerHTML += `

        <tr>

            <td>🍜</td>

            <td>${food.name}</td>

            <td>${food.category}</td>

            <td>

                <span class="badge published">

                    ${food.status}

                </span>

            </td>

            <td>

                <span class="badge ${
                    food.sync
                    ?"synced":"pending"
                }">

                    ${
                        food.sync
                        ?"Synced":"Pending"
                    }

                </span>

            </td>

            <td>

                <button onclick="editFood(${food.id})">

                    Edit

                </button>

                <button

                    onclick="removeFood(${food.id})"

                    class="danger">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

};


// ===========================
// FILTER STATUS
// ===========================

const filter = document.querySelector(".toolbar select");

filter.onchange = async ()=>{

    const value = filter.value;

    const foods = await getFoods();

    tbody.innerHTML="";

    foods

    .filter(food=>{

        if(value=="Semua Status") return true;

        return food.status==value;

    })

    .forEach(food=>{

        tbody.innerHTML += `

        <tr>

            <td>🍜</td>

            <td>${food.name}</td>

            <td>${food.category}</td>

            <td>

                <span class="badge ${
                    food.status=="Published"
                    ?"published":"draft"
                }">

                    ${food.status}

                </span>

            </td>

            <td>

                <span class="badge ${
                    food.sync
                    ?"synced":"pending"
                }">

                    ${
                        food.sync
                        ?"Synced":"Pending"
                    }

                </span>

            </td>

            <td>

                <button onclick="editFood(${food.id})">

                    Edit

                </button>

                <button class="danger"

                    onclick="removeFood(${food.id})">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

};


console.log("Foods Module Loaded ✔");
