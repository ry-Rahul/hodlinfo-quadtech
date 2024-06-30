document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the API
    fetch('https://api-backend-for-quadtech.onrender.com/api/getall')
        .then(response => response.json())
        .then(data => {
            const dataTable = document.getElementById('data-table');
            dataTable.innerHTML = ''; // Clear any existing data

            data.forEach((item, index) => {
                const lastPrice = parseFloat(item.last);
                const buyPrice = parseFloat(item.buy);
                const sellPrice = parseFloat(item.sell);

                // Calculate the difference percentage
                const difference = ((lastPrice - buyPrice) / buyPrice) * 100;

                // Calculate the savings
                const savings = buyPrice - sellPrice;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>
                        <img src="./images/asset ${index+2}.png" alt="${item.name}" class="trimg" width="30" height="30">
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
});


let toggle = true;
function toggledark() {
  
    if (toggle) {
        document.body.classList.add('dark-mode');
        document.querySelector('#toggle').classList.add('toggle-ball');
        document.querySelector('#converse').classList.add('conversion-bttn-dark');
        document.querySelector('#header-right').classList.add('header-right-dark');
        document.querySelector('#middle-part-dark').classList.add('middlePart-dark');
        document.querySelector('#data-table').classList.add('table-dark');
        toggle = !toggle;
    }
    else {
        document.body.classList.remove('dark-mode');
        document.querySelector('#toggle').classList.remove('toggle-ball');
        document.querySelector('#converse').classList.remove('conversion-bttn-dark');
        document.querySelector('#header-right').classList.remove('header-right-dark');
        document.querySelector('#middle-part-dark').classList.remove('middlePart-dark');
        document.querySelector('#data-table').classList.remove('table-dark');
        toggle = !toggle;
    }
}