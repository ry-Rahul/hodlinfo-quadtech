document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndUpdateTable();

    let counter = 60;
    const countdown = document.getElementById('count');
    setInterval(() => {
        countdown.innerText = --counter;
        if (counter === 0) {
            counter = 60;
            fetchDataAndUpdateTable();
        }
    }, 1000);
});

// Function to fetch data and update the table
function fetchDataAndUpdateTable() {
    fetch('https://api-backend-for-quadtech.onrender.com/api/getall')
        .then(response => response.json())
        .then(data => {
            const dataTable = document.getElementById('data-table');
            dataTable.innerHTML = '';
            data.forEach((item, index) => {
                const lastPrice = parseFloat(item.last);
                const buyPrice = parseFloat(item.buy);
                const sellPrice = parseFloat(item.sell);
                const difference = ((lastPrice - buyPrice) / buyPrice) * 100;
                const savings = buyPrice - sellPrice;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>
                        <img src="./images/asset ${index + 2}.png" alt="${item.name}" class="trimg" width="30" height="30">
                        WazirX
                    </td>
                    <td>₹ ${lastPrice.toFixed(2)}</td>
                    <td>₹ ${buyPrice.toFixed(2)} / ₹ ${sellPrice.toFixed(2)}</td>
                    <td>
                        <span class="badge ${difference >= 0 ? 'positive' : 'negative'}">
                            ${difference.toFixed(2)}%
                        </span>
                    </td>
                    <td>
                        <span class="badge ${savings >= 0 ? 'positive' : 'negative'}">
                            ₹ ${savings.toFixed(2)}
                        </span>
                    </td>
                `;
                dataTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}


let toggle = true;
function toggledark() {
    document.body.classList.toggle('dark-mode', toggle);
    document.querySelector('#toggle').classList.toggle('toggle-ball', toggle);
    document.querySelector('#converse').classList.toggle('conversion-bttn-dark', toggle);
    document.querySelector('#header-right').classList.toggle('header-right-dark', toggle);
    document.querySelector('#middle-part-dark').classList.toggle('middlePart-dark', toggle);
    document.querySelector('#data-table').classList.toggle('table-dark', toggle);
    toggle = !toggle;
}


toggledark();