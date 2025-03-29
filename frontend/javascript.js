// script.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/user-details')
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
            data.users.forEach(user => {
                const row = userTableBody.insertRow();
                row.insertCell(0).textContent = user.name;
                row.insertCell(1).textContent = user.email;
                row.insertCell(2).textContent = user.role;
            });
        });

    fetch('/api/upcoming-ipo')
        .then(response => response.json())
        .then(data => {
            const ipoList = document.getElementById('ipo-list');
            data.ipos.forEach(ipo => {
                const listItem = document.createElement('li');
                listItem.textContent = `${ipo.companyName} - ${ipo.date}`;
                ipoList.appendChild(listItem);
            });
        });
});
