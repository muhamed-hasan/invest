document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        populateTable(data);
    })
    .catch(error => console.error('Error loading the JSON file:', error));
});

function populateTable(data) {
    if(data.length === 0) return;

    const table = document.getElementById('stockTable');
    const tableBody = table.getElementsByTagName('tbody')[0];
    const headerRow = table.getElementsByTagName('thead')[0].rows[0];

    // Dynamically create headers
    Object.keys(data[0]).forEach(key => {
        let header = document.createElement('th');
        header.textContent = key;
        headerRow.appendChild(header);
    });

    // Populate table rows
    data.forEach(item => {
        let row = tableBody.insertRow();
        Object.values(item).forEach(text => {
            let cell = row.insertCell();
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
        });
    });
}
