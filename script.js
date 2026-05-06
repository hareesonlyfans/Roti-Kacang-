// LOGIN
function login() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    if (user === "harees" && pass === "roti123") {
        localStorage.setItem("login", "true");
        window.location.href = "produk.html";
    } else {
        document.getElementById("msg").innerText = "Username / Password salah";
    }
}

// LOGOUT
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

// SHOW PASSWORD
function togglePass() {
    let pass = document.getElementById("pass");
    pass.type = pass.type === "password" ? "text" : "password";
}

// ========================
// KERANJANG + TOTAL
// ========================
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

const hargaProduk = {
    "Kacang Hitam": 8000,
    "Kacang Merah": 8000,
    "Kacang Hijau": 8000
};

function tambah(nama) {
    keranjang.push(nama);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    render();
}

function render() {
    let list = document.getElementById("cart");
    let jumlah = document.getElementById("jumlah");
    let totalEl = document.getElementById("total");

    if (!list) return;

    list.innerHTML = "";
    let total = 0;

    keranjang.forEach((item, i) => {
        let li = document.createElement("li");

        let harga = hargaProduk[item];
        total += harga;

        li.innerText = item + " - Rp " + harga;

        let btn = document.createElement("button");
        btn.innerText = "x";
        btn.onclick = () => hapus(i);

        li.appendChild(btn);
        list.appendChild(li);
    });

    if (jumlah) jumlah.innerText = "🛒 " + keranjang.length;
    if (totalEl) totalEl.innerText = "Total: Rp " + total;
}

function hapus(i) {
    keranjang.splice(i, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    render();
}

// ========================
// CHECKOUT + BAYAR
// ========================
function checkout() {
    window.location.href = "bayar.html";
}

function tampilBayar() {
    let list = document.getElementById("listBayar");
    let totalEl = document.getElementById("totalBayar");

    if (!list) return;

    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    let total = 0;

    list.innerHTML = "";

    keranjang.forEach(item => {
        let harga = hargaProduk[item];
        total += harga;

        let li = document.createElement("li");
        li.innerText = item + " - Rp " + harga;
        list.appendChild(li);
    });

    totalEl.innerText = "Total Bayar: Rp " + total;
}

function bayar() {
    alert("Pembayaran berhasil!");
    localStorage.removeItem("keranjang");
    window.location.href = "produk.html";
}

// FIX biar ga tabrakan
window.addEventListener("load", function() {
    render();
    tampilBayar();
});