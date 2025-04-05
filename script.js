function submitData() {
    const charges = document.getElementById('charges').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    const table = document.getElementById('dataTable');
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = charges;
    cell2.textContent = quantity;
    cell3.textContent = '₹'+price;
    cell4.textContent = '₹'+quantity*price;

    updateGrandTotal();
    function updateGrandTotal() {
      let totalCells = document.querySelectorAll("#dataTable td:nth-child(4)");
      let grandTotal = 0;

      totalCells.forEach(cell => {
          let value = parseInt(cell.innerText.replace('₹', '')) || 0;
          grandTotal += value;
      });

      document.getElementById("grandTotal").innerText = grandTotal;
      }

    // Create and add the Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      table.deleteRow(row.rowIndex); // Delete the current row
    };
    cell5.appendChild(deleteButton);

    document.getElementById('dataForm').reset();
  }

  function displayContent() {
    // Retrieve the value entered by the user
    const date = document.getElementById("date").value;
    const bill_no = document.getElementById("bill_no").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const ph_no = document.getElementById("ph_no").value;
    
    // Display the content in the display section
    document.getElementById("displaydate").innerText = date;
    document.getElementById("displaybill_no").innerText = bill_no;
    document.getElementById("displayname").innerText = name;
    document.getElementById("displayage").innerText = age;
    document.getElementById("displayph_no").innerText = ph_no;
  }


  // function downloadAsImage() {
  //   const table = document.getElementById("section_bill");
  //   html2canvas(table).then(canvas => {
  //     const link = document.createElement("a");
  //     link.download = "bill.png";
  //     link.href = canvas.toDataURL("image/png");
  //     link.click();
  //   });
  // }

  const userFilename = document.getElementById("name").value; // Assuming an input field exists
// downloadAsImage(userFilename);
  function downloadAsImage(userFilename) {
    const table = document.getElementById("section_bill");
    html2canvas(table).then(canvas => {
      const link = document.createElement("a");
      // Use the user's filename, falling back to "bill" if none is provided
      link.download = `${userFilename || 'bill'}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
}


  function downloadAsPDF() {
    const table = document.getElementById("section_bill");
    html2canvas(table).then(canvas => {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 180, 90); // Adjust dimensions as needed
      pdf.save("bill.pdf");
    });
  }

  function showSections() {
    document.getElementById("section_input").style.display = "none";
    document.getElementById("section_bill").style.display = "block";
    document.getElementById("section_buttons").style.display = "block";
}
