// Add this code to animate the sidebar when the page loads
window.onload = function() {
    document.querySelector('.sidebar').classList.add('open');
};



const ctx = document.getElementById('main-board-ipo-chart').getContext('2d');



const mainBoardIpoChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Upcoming', 'New Listed', 'Ongoing'],
        datasets: [{
            data: [15, 25, 2],
            backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});
