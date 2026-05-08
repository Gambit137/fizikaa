const processSelect = document.getElementById('process-select');
const motionSelect = document.getElementById('motion-select');
const generateBtn = document.getElementById('generate-btn');

const v0Input = document.getElementById('v0');
const vInput = document.getElementById('v');
const aInput = document.getElementById('a');
const tInput = document.getElementById('t');

const paramInitialVelocity = document.getElementById('param-initial-velocity');
const paramVelocity = document.getElementById('param-velocity');
const paramAcceleration = document.getElementById('param-acceleration');
const paramDuration = document.getElementById('param-duration');
const combinedMotionParams = document.getElementById('combined-motion-params');
const segmentsContainer = document.getElementById('segments-container');
const addSegmentBtn = document.getElementById('add-segment-btn');

const graph1Title = document.getElementById('graph1-title');
const graph2Title = document.getElementById('graph2-title');
const graph3Title = document.getElementById('graph3-title');

const graph1CanvasEl = document.getElementById('graph1');
const graph2CanvasEl = document.getElementById('graph2');
const graph3CanvasEl = document.getElementById('graph3');

function setupHighDPICanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr * 2;
    canvas.height = rect.height * dpr * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr * 2, dpr * 2);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
}

setupHighDPICanvas(graph1CanvasEl);
setupHighDPICanvas(graph2CanvasEl);
setupHighDPICanvas(graph3CanvasEl);

const graph1Canvas = graph1CanvasEl.getContext('2d');
const graph2Canvas = graph2CanvasEl.getContext('2d');
const graph3Canvas = graph3CanvasEl.getContext('2d');

let chart1, chart2, chart3;
let segmentCounter = 0;

function check67Input() {
    const allInputs = document.querySelectorAll('input[type="number"]');
    allInputs.forEach(input => {
        if (input.value === '67' || parseInt(input.value) === 67) {
            activate67Memory();
        }
    });
}

function activate67Memory() {
    if (!document.body.classList.contains('niceme-mode')) {
        document.body.classList.add('niceme-mode');
        
        const gifElement = document.createElement('div');
        gifElement.className = 'six-seven-gif';
        gifElement.innerHTML = '<img src="https://media1.tenor.com/m/2xrGdGuxb1gAAAAd/67-meme.gif" alt="Six Seven" crossorigin="anonymous">';
        document.body.appendChild(gifElement);
        
        setTimeout(() => {
            document.body.classList.remove('niceme-mode');
            gifElement.remove();
        }, 10000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const headerP = document.querySelector('header p');
    if (headerP) {
    }
    
    const headerH1 = document.querySelector('header h1');
    if (headerH1) {
        headerH1.addEventListener('click', (e) => {
            const rect = headerH1.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const h1Height = headerH1.offsetHeight;
            
            if (clickY > h1Height * 0.6) {
                activateProfEasterEgg();
            }
        });
    }
});

function activateProfEasterEgg() {
    if (document.querySelector('.prof-easter-egg')) return;
    
    const easterEgg = document.createElement('div');
    easterEgg.className = 'prof-easter-egg';
    document.body.appendChild(easterEgg);
    
    setTimeout(() => {
        easterEgg.remove();
    }, 4000);
}

document.addEventListener('click', (e) => {
});

motionSelect.addEventListener('change', updateInputVisibility);
generateBtn.addEventListener('click', generateGraphs);
addSegmentBtn.addEventListener('click', addSegment);

document.addEventListener('change', (e) => {
    if (e.target.type === 'number') {
        check67Input();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    updateInputVisibility();
    addSegment();
    
    const resizeObserver = new ResizeObserver(() => {
        setupHighDPICanvas(graph1CanvasEl);
        setupHighDPICanvas(graph2CanvasEl);
        setupHighDPICanvas(graph3CanvasEl);
        generateGraphs();
    });
    
    resizeObserver.observe(graph1CanvasEl.parentElement);
    
    generateGraphs();
    setupDownloadButtons();
});

function setupDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const graphId = this.getAttribute('data-graph');
            downloadGraph(graphId);
        });
    });
}

function downloadGraph(canvasId) {
    const canvas = document.getElementById(canvasId);
    const graphTitle = document.getElementById(`${canvasId}-title`).innerText;
    
    const link = document.createElement('a');
    link.download = `${graphTitle.replace(/\//g, '-')}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
}


function updateInputVisibility() {
    const motionType = motionSelect.value;
    
    paramInitialVelocity.style.display = 'none';
    paramVelocity.style.display = 'none';
    paramAcceleration.style.display = 'none';
    paramDuration.style.display = 'block';
    combinedMotionParams.style.display = 'none';

    if (motionType === 'uniform') {
        paramVelocity.style.display = 'block';
    } else if (motionType === 'accelerated' || motionType === 'decelerated') {
        paramInitialVelocity.style.display = 'block';
        paramAcceleration.style.display = 'block';
    } else if (motionType === 'combined') {
        paramInitialVelocity.style.display = 'block';
        combinedMotionParams.style.display = 'block';
        paramDuration.style.display = 'none';
    }
}

function addSegment() {
    segmentCounter++;
    const segmentId = `segment-${segmentCounter}`;

    const segmentDiv = document.createElement('div');
    segmentDiv.classList.add('segment');
    segmentDiv.id = segmentId;

    segmentDiv.innerHTML = `
        <div class="segment-header">
            <h5>Segment ${segmentCounter}</h5>
            <button class="remove-segment-btn" data-target="${segmentId}">Ukloni</button>
        </div>
        <div class="form-group">
            <label for="segment-motion-${segmentCounter}">Vrsta gibanja</label>
            <select id="segment-motion-${segmentCounter}" class="select-input segment-motion-select">
                <option value="accelerated">Ubrzano</option>
                <option value="uniform">Jednoliko</option>
                <option value="decelerated">Usporeno</option>
            </select>
        </div>
        <div class="param-group">
            <label for="segment-duration-${segmentCounter}">Trajanje (s)</label>
            <input type="number" id="segment-duration-${segmentCounter}" class="number-input" value="5">
        </div>
        <div class="param-group">
            <label for="segment-param-${segmentCounter}">Ubrzanje/Brzina</label>
            <input type="number" id="segment-param-${segmentCounter}" class="number-input" value="2">
        </div>
    `;

    segmentsContainer.appendChild(segmentDiv);

    segmentDiv.querySelector('.remove-segment-btn').addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        document.getElementById(targetId).remove();
    });

    segmentDiv.querySelector('.segment-motion-select').addEventListener('change', (e) => {
        const selectedMotion = e.target.value;
        const paramGroup = segmentDiv.querySelector(`#segment-param-${segmentCounter}`).parentElement;
        const paramLabel = segmentDiv.querySelector(`label[for="segment-param-${segmentCounter}"]`);
        
        if (selectedMotion === 'uniform') {
            paramGroup.style.display = 'none';
        } else {
            paramGroup.style.display = 'block';
            if (selectedMotion === 'accelerated' || selectedMotion === 'decelerated') {
                paramLabel.textContent = 'Ubrzanje (m/s²)';
            }
        }
    });
    segmentDiv.querySelector('.segment-motion-select').dispatchEvent(new Event('change'));
}


function generateGraphs() {
    const motionType = motionSelect.value;
    let t_max = parseFloat(tInput.value);
    
    let sData = [], vData = [], aData = [];
    const v0 = parseFloat(v0Input.value);

    if (processSelect.value === 'kinematics') {
        graph1Title.innerText = 's/t (put-vrijeme)';
        graph2Title.innerText = 'v/t (brzina-vrijeme)';
        graph3Title.innerText = 'a/t (akceleracija-vrijeme)';

        const v = parseFloat(vInput.value);
        const a = parseFloat(aInput.value);
        
        if (motionType !== 'combined') {
            const timeValues = Array.from({ length: t_max * 10 + 1 }, (_, i) => Number((i / 10).toFixed(10)));
            switch (motionType) {
                case 'uniform':
                    for (let t of timeValues) {
                        sData.push(v * t);
                        vData.push(v);
                        aData.push(0);
                    }
                    break;

                case 'accelerated':
                    for (let t of timeValues) {
                        vData.push(v0 + a * t);
                        sData.push(v0 * t + 0.5 * a * t * t);
                        aData.push(a);
                    }
                    break;
                
                case 'decelerated':
                    for (let t of timeValues) {
                        let current_v = v0 - a * t;
                        if (current_v < 0) current_v = 0;
                        vData.push(current_v);
                        
                        let time_to_stop = v0 / a;
                        if (t <= time_to_stop){
                            sData.push(v0 * t - 0.5 * a * t * t);
                        } else {
                            sData.push(v0 * time_to_stop - 0.5 * a * time_to_stop * time_to_stop);
                        }

                        aData.push(current_v > 0 ? -a : 0);
                    }
                    break;
            }
            const sPoints = timeValues.map((t, i) => ({ x: t, y: sData[i] }));
            const vPoints = timeValues.map((t, i) => ({ x: t, y: vData[i] }));
            const aPoints = timeValues.map((t, i) => ({ x: t, y: aData[i] }));

            chart1 = drawChart(chart1, graph1Canvas, sPoints, 'Put (m)', 'graph1');
            chart2 = drawChart(chart2, graph2Canvas, vPoints, 'Brzina (m/s)', 'graph2');
            chart3 = drawChart(chart3, graph3Canvas, aPoints, 'Akceleracija (m/s²)', 'graph3', { stepped: true });

        } else {
            let cumulativeTime = 0;
            let cumulativeDist = 0;
            let lastVelocity = v0;
            
            const segments = segmentsContainer.querySelectorAll('.segment');
            const totalDuration = Array.from(segments).reduce((acc, segment) => {
                const duration = parseFloat(segment.querySelector('input[id^="segment-duration"]').value) || 0;
                return acc + duration;
            }, 0);
            t_max = totalDuration;
            const timeValues = Array.from({ length: t_max * 10 + 1 }, (_, i) => Number((i / 10).toFixed(10)));

            let segmentEndTimes = [];
            let currentTimeMarker = 0;
            segments.forEach((segment, index) => {
                const duration = parseFloat(segment.querySelector('input[id^="segment-duration"]').value) || 0;
                currentTimeMarker += duration;
                segmentEndTimes.push(currentTimeMarker);
            });

            let currentSegmentIndex = 0;

            for (let t of timeValues) {
                while (t >= segmentEndTimes[currentSegmentIndex] && currentSegmentIndex < segments.length - 1) {
                    const segment = segments[currentSegmentIndex];
                    const duration = parseFloat(segment.querySelector('input[id^="segment-duration"]').value) || 0;
                    const param = parseFloat(segment.querySelector('input[id^="segment-param"]').value) || 0;
                    const type = segment.querySelector('select').value;
                    
                    const t_local = duration;

                    if (type === 'accelerated') {
                        cumulativeDist += lastVelocity * t_local + 0.5 * param * t_local * t_local;
                        lastVelocity += param * t_local;
                    } else if (type === 'decelerated') {
                        const v_final_seg = lastVelocity - param * t_local;
                        if (v_final_seg > 0) {
                           cumulativeDist += lastVelocity * t_local - 0.5 * param * t_local * t_local;
                           lastVelocity = v_final_seg;
                        } else {
                            const time_to_stop = lastVelocity / param;
                            cumulativeDist += lastVelocity * time_to_stop - 0.5 * param * time_to_stop * time_to_stop;
                            lastVelocity = 0;
                        }
                    } else {
                        cumulativeDist += lastVelocity * t_local;
                    }
                    cumulativeTime = segmentEndTimes[currentSegmentIndex];
                    currentSegmentIndex++;
                }

                const segment = segments[currentSegmentIndex];
                const param = parseFloat(segment.querySelector('input[id^="segment-param"]').value) || 0;
                const type = segment.querySelector('select').value;
                const t_local = t - cumulativeTime;

                let s, v, acc;

                if (type === 'accelerated') {
                    v = lastVelocity + param * t_local;
                    s = cumulativeDist + lastVelocity * t_local + 0.5 * param * t_local * t_local;
                    acc = param;
                } else if (type === 'decelerated') {
                    let current_v = lastVelocity - param * t_local;
                    if (current_v < 0) current_v = 0;
                    v = current_v;

                    const time_to_stop_from_last = lastVelocity / param;
                    if (t_local < time_to_stop_from_last) {
                        s = cumulativeDist + lastVelocity * t_local - 0.5 * param * t_local * t_local;
                    } else {
                        s = cumulativeDist + (lastVelocity * time_to_stop_from_last - 0.5 * param * time_to_stop_from_last * time_to_stop_from_last);
                    }
                    acc = v > 0 ? -param : 0;
                } else {
                    v = lastVelocity;
                    s = cumulativeDist + lastVelocity * t_local;
                    acc = 0;
                }
                sData.push(s);
                vData.push(v);
                aData.push(acc);
            }
            
            const sPoints = timeValues.map((t, i) => ({ x: t, y: sData[i] }));
            const vPoints = timeValues.map((t, i) => ({ x: t, y: vData[i] }));
            const aPoints = timeValues.map((t, i) => ({ x: t, y: aData[i] }));

            chart1 = drawChart(chart1, graph1Canvas, sPoints, 'Put (m)', 'graph1');
            chart2 = drawChart(chart2, graph2Canvas, vPoints, 'Brzina (m/s)', 'graph2');
            chart3 = drawChart(chart3, graph3Canvas, aPoints, 'Akceleracija (m/s²)', 'graph3', { stepped: true });
        }
    }
}

function drawChart(chartInstance, context, points, label, canvasId, extra = {}) {
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    if (!context || !points || points.length === 0) {
        console.error('drawChart error:', { context, points, label, canvasId });
        return null;
    }
    
    chartInstance = new Chart(context, {
        type: 'line',
        data: {
            datasets: [{
                label: label,
                data: points,
                borderColor: 'rgba(45, 62, 132, 1)',
                backgroundColor: 'rgba(45, 62, 132, 0.12)',
                borderWidth: 4,
                fill: true,
                pointRadius: 0,
                tension: 0,
                parsing: false,
                stepped: extra.stepped || false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 2,
            scales: {
                x: {
                    type: 'linear',
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1.5
                    },
                    border: {
                        width: 2.5,
                        color: 'rgba(0, 0, 0, 0.9)'
                    },
                    ticks: {
                        font: {
                            size: 16,
                            weight: '500',
                            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        },
                        color: 'rgba(0, 0, 0, 0.8)',
                        padding: 8,
                        maxTicksLimit: 15,
                        autoSkip: true
                    },
                    title: {
                        display: true,
                        text: 'Vrijeme (s)',
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        },
                        color: 'rgba(0, 0, 0, 0.9)',
                        padding: { top: 10, bottom: 0 }
                    }
                },
                y: {
                    grid: {
                        color: function(context) {
                            if (context.tick.value === 0) {
                                return 'rgba(0, 0, 0, 0.9)';
                            }
                            return 'rgba(0, 0, 0, 0.1)';
                        },
                        lineWidth: function(context) {
                            if (context.tick.value === 0) {
                                return 2.5;
                            }
                            return 1.5;
                        }
                    },
                    border: {
                        width: 2.5,
                        color: 'rgba(0, 0, 0, 0.9)'
                    },
                    ticks: {
                        font: {
                            size: 16,
                            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        },
                        color: 'rgba(0, 0, 0, 0.8)',
                        padding: 8,
                        stepSize: undefined,
                        precision: 1,
                        callback: function(value) {
                            return Number(value).toFixed(1);
                        }
                    },
                    title: {
                        display: true,
                        text: label,
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        },
                        color: 'rgba(0, 0, 0, 0.9)',
                        padding: { top: 0, bottom: 10 }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            animation: {
                duration: 0
            }
        }
    });

    if (canvasId === 'graph1') return chartInstance;
    if (canvasId === 'graph2') return chartInstance;
    if (canvasId === 'graph3') return chartInstance;
    
    return chartInstance;
}
