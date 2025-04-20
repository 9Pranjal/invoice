document.getElementById("invoiceDate").valueAsDate = new Date();

const invoiceTableBody = document.querySelector("#invoiceTable tbody");
let products = [];

function addProduct() {
    const name = document.getElementById("productName").value;
    const qty = parseFloat(document.getElementById("productQty").value);
    const price = parseFloat(document.getElementById("productPrice").value);

    if (!name || qty <= 0 || price <= 0) {
    alert("Please enter valid product details");
    return;
    }

    products.push({ name, qty, price });

    document.getElementById("productName").value = "";
    document.getElementById("productQty").value = "";
    document.getElementById("productPrice").value = "";

    renderTable();
    updateTotals();
}

function renderTable() {
    invoiceTableBody.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
    let p = products[i];
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${p.name}</td>
        <td>${p.qty}</td>
        <td>₹${p.price.toFixed(2)}</td>
        <td>₹${(p.qty * p.price).toFixed(2)}</td>
    `;

    invoiceTableBody.appendChild(row);
    }
}

function updateTotals() {
    let subtotal = 0;
    for (let i = 0; i < products.length; i++) {
    subtotal += products[i].qty * products[i].price;
    }
    let gst = subtotal * 0.18;
    let discountPercent = parseFloat(document.getElementById("discount").value || 0);
    let discountAmt = (subtotal * discountPercent) / 100;
    let netTotal = subtotal + gst - discountAmt;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("gst").textContent = gst.toFixed(2);
    document.getElementById("discountAmt").textContent = discountAmt.toFixed(2);
    document.getElementById("netTotal").textContent = netTotal.toFixed(2);
}

function GenerateInvoice(){
    document.getElementById("inputSection").style.display="none";
    document.getElementById("invoiceTable").style.display="none";
    document.getElementById("totals").style.display="none";
    document.getElementById("dis-sec").style.display="none";

    document.getElementById("invoice").style.display = "block";

    document.getElementById("finalCustomerName").textContent = document.getElementById("customerName").value;
    document.getElementById("finalInvoiceNumber").textContent = document.getElementById("invoiceNumber").value;
    document.getElementById("finalInvoiceDate").textContent = document.getElementById("invoiceDate").value;

    const finalBody = document.getElementById("finalInvoiceTableBody");
    finalBody.innerHTML = ""; 

    products.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${p.name}</td>
        <td>${p.qty}</td>
        <td>₹${p.price.toFixed(2)}</td>
        <td>₹${(p.qty * p.price).toFixed(2)}</td>
        `;
        finalBody.appendChild(row);
    });

    const subtotal = parseFloat(document.getElementById("subtotal").textContent);
    const gst = parseFloat(document.getElementById("gst").textContent);
    const discountAmt = parseFloat(document.getElementById("discountAmt").textContent);
    const netTotal = parseFloat(document.getElementById("netTotal").textContent);

    document.getElementById("finalSubtotal").textContent = subtotal.toFixed(2);
    document.getElementById("finalGST").textContent = gst.toFixed(2);
    document.getElementById("finalDiscountAmt").textContent = discountAmt.toFixed(2);
    document.getElementById("finalNetTotal").textContent = netTotal.toFixed(2);
}