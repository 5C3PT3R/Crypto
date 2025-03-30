document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Time filter functionality for chart
    const timeButtons = document.querySelectorAll('.time-btn');
    
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            timeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update chart based on time filter
            const timeRange = button.getAttribute('data-time');
            updateChart(timeRange);
        });
    });
    
    // Initialize chart
    let priceChart;
    initializeChart();
    
    // Coin card click functionality
    const coinCards = document.querySelectorAll('.coin-card');
    
    coinCards.forEach(card => {
        card.addEventListener('click', () => {
            const coin = card.getAttribute('data-coin');
            // In a real app, this would navigate to the coin's page
            alert(`Loading ${coin} data...`);
        });
    });
    
    // Simulate price updates
    simulatePriceUpdates();
    
    // Initialize chart with sample data
    function initializeChart() {
        const ctx = document.getElementById('priceChart').getContext('2d');
        
        // Generate sample data for different time ranges
        const allData = generateSampleData('all');
        
        priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: allData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'MMM d, yyyy',
                            displayFormats: {
                                day: 'MMM d'
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: '#e2e8f0'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return 'Price: $' + context.parsed.y.toLocaleString();
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }
    
    // Update chart based on time range
    function updateChart(timeRange) {
        const newData = generateSampleData(timeRange);
        
        priceChart.data.datasets[0].data = newData;
        
        // Adjust time unit based on range
        let timeUnit;
        switch(timeRange) {
            case '24h':
                timeUnit = 'hour';
                break;
            case '7d':
                timeUnit = 'day';
                break;
            case '30d':
                timeUnit = 'day';
                break;
            case '90d':
                timeUnit = 'month';
                break;
            case '1y':
                timeUnit = 'month';
                break;
            default:
                timeUnit = 'year';
        }
        
        priceChart.options.scales.x.time.unit = timeUnit;
        priceChart.update();
    }
    
    // Generate sample data for different time ranges
    function generateSampleData(range) {
        const now = new Date();
        let dataPoints = 100;
        let daysBack = 365;
        
        switch(range) {
            case '24h':
                dataPoints = 24;
                daysBack = 1;
                break;
            case '7d':
                dataPoints = 7;
                daysBack = 7;
                break;
            case '30d':
                dataPoints = 30;
                daysBack = 30;
                break;
            case '90d':
                dataPoints = 90;
                daysBack = 90;
                break;
            case '1y':
                dataPoints = 12;
                daysBack = 365;
                break;
            default:
                dataPoints = 365;
                daysBack = 365 * 3;
        }
        
        const data = [];
        let basePrice = 50000;
        
        for (let i = 0; i < dataPoints; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - (daysBack * (1 - i/dataPoints)));
            
            // Simulate price movement with some randomness
            const volatility = 0.05;
            const rnd = Math.random();
            let changePercent = 2 * volatility * rnd;
            if (changePercent > volatility) {
                changePercent -= (2 * volatility);
            }
            
            basePrice = basePrice * (1 + changePercent);
            
            data.push({
                x: date,
                y: Math.round(basePrice)
            });
        }
        
        return data;
    }
    
    // Simulate price updates
    function simulatePriceUpdates() {
        const priceElement = document.getElementById('btc-price');
        let currentPrice = parseFloat(priceElement.textContent.replace(/,/g, ''));
        
        // Update price every 5 seconds
        setInterval(() => {
            // Random price change between -0.5% and +0.5%
            const change = (Math.random() - 0.5) / 100;
            currentPrice = currentPrice * (1 + change);
            
            // Update displayed price
            priceElement.textContent = currentPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            // Update price change indicator
            const changeElement = document.querySelector('.price-change');
            const changePercent = (change * 100).toFixed(2);
            
            if (change >= 0) {
                changeElement.textContent = `+${changePercent}%`;
                changeElement.classList.remove('negative');
                changeElement.classList.add('positive');
            } else {
                changeElement.textContent = `${changePercent}%`;
                changeElement.classList.remove('positive');
                changeElement.classList.add('negative');
            }
        }, 5000);
    }
    
    // Add click event to info cards in About Us section
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('click', function() {
            this.querySelector('.info-inner').style.transform = this.querySelector('.info-inner').style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
    });
});