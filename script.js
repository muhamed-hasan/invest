document.addEventListener('DOMContentLoaded', function() {
    fetch('data.php')
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
    let sortOrder = {};
    Object.keys(data[0]).forEach(key => {
        let header = document.createElement('th');
        header.textContent = key;
        headerRow.appendChild(header);
        sortOrder[key] = 1; // Initialize sort order as ascending
        header.addEventListener('click', () => {
            data.sort((a, b) => {
                if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                    return sortOrder[key] * (a[key] - b[key]);
                } else {
                    return sortOrder[key] * a[key].localeCompare(b[key]);
                }
            });
            sortOrder[key] = -sortOrder[key]; // Toggle sort order
            populateTable(data); // Repopulate table with sorted data
        });
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
