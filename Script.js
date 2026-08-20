// ─── DOM REFS ───
const brandSelect = document.getElementById('brandSelect');
const modelSelect = document.getElementById('modelSelect');
const customDevice = document.getElementById('customDevice');
const customRam = document.getElementById('customRam');
const dpiMode = document.getElementById('dpiMode');
const customDpi = document.getElementById('customDpi');
const graphicsSelect = document.getElementById('graphicsSelect');
const ageInput = document.getElementById('ageInput');
const generateBtn = document.getElementById('generateBtn');

const deviceNameDisplay = document.getElementById('deviceNameDisplay');
const categoryBadge = document.getElementById('categoryBadge');
const lockedIdDisplay = document.getElementById('lockedIdDisplay');
const dpiDisplay = document.getElementById('dpiDisplay');
const graphicsDisplay = document.getElementById('graphicsDisplay');
const fpsDisplay = document.getElementById('fpsDisplay');
const lockIdDisplay = document.getElementById('lockIdDisplay');

const valGeneral = document.getElementById('valGeneral');
const valRedDot = document.getElementById('valRedDot');
const val2x = document.getElementById('val2x');
const val4x = document.getElementById('val4x');
const valSniper = document.getElementById('valSniper');
const valFreeLook = document.getElementById('valFreeLook');

const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');

// ─── API BASE (adjust for your environment) ───
const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : '/api'; // for Vercel, the path is relative

// ─── POPULATE MODELS ───
// We need to get the list of models from the server.
// For convenience, we'll fetch a list from the API, but we can also hardcode.
// Let's fetch device list on load.
async function fetchDeviceList() {
    try {
        const res = await fetch(`${API_BASE}/devices`);
        if (!res.ok) throw new Error('Failed to fetch device list');
        const data = await res.json();
        // data is an object: { brand: [models] }
        // we'll update the brand select options dynamically
        // but we already have static options; we'll just populate model selects on brand change.
        // We'll store the data globally.
        window._deviceDB = data;
        // Trigger initial population
        populateModels();
    } catch (e) {
        console.warn('Could not fetch device list, using fallback static data.');
        // Fallback: we can keep a static minimal list or use the previous inline DB.
        // We'll provide a basic fallback.
        window._deviceDB = {
            "Redmi": ["9A","9C","9 Power","10","10 Prime","11","11 Prime","11 Prime 5G","12","12C","13C","Note 8","Note 8 Pro","Note 9","Note 9 Pro","Note 10","Note 10 Pro","Note 11","Note 11 Pro","Note 12","Note 12 Pro","K20","K20 Pro","K30","K30 Pro","K40","K40 Pro","K50","K50 Pro"],
            "Xiaomi": ["Mi 9","Mi 10","Mi 10 Pro","Mi 10T","Mi 10T Pro","Mi 11","Mi 11 Pro","Mi 11 Ultra","12","12 Pro","12 Ultra","13","13 Pro","13 Ultra"],
            "iPhone": ["11","11 Pro","11 Pro Max","12","12 Mini","12 Pro","12 Pro Max","13","13 Mini","13 Pro","13 Pro Max","14","14 Plus","14 Pro","14 Pro Max","15","15 Plus","15 Pro","15 Pro Max","SE (2nd gen)","SE (3rd gen)"],
            "Samsung": ["A12","A13","A14","A15","A22","A23","A24","A32","A33","A34","A52","A53","A54","A72","A73","S20","S20+","S20 Ultra","S21","S21+","S21 Ultra","S22","S22+","S22 Ultra","S23","S23+","S23 Ultra","S24","S24+","S24 Ultra","Note 20","Note 20 Ultra"],
            "Realme": ["C11","C12","C15","C17","C21","C25","C30","C33","3","3 Pro","5","5 Pro","6","6 Pro","7","7 Pro","8","8 Pro","9","9 Pro","10","10 Pro","GT","GT Neo","GT Master"],
            "Poco": ["M2","M2 Pro","M3","M3 Pro","M4","M4 Pro","M5","M5 Pro","X2","X3","X3 Pro","X4","X4 Pro","X5","X5 Pro","F1","F2 Pro","F3","F4","F5"],
            "Vivo": ["Y11","Y12","Y15","Y17","Y20","Y21","Y22","Y23","Y27","Y28","Y30","Y31","Y33","Y35","Y36","V15","V17","V19","V20","V21","V23","V25","V27","X50","X60","X70","X80","X90"],
            "Oppo": ["A12","A15","A16","A17","A31","A32","A33","A35","A36","A37","A38","A53","A54","A55","A57","A58","A59","A72","A74","A76","A77","A78","A79","F7","F9","F11","F15","F17","F19","F21","F23","Find X2","Find X3","Find X5","Find X6","Reno 2","Reno 3","Reno 4","Reno 5","Reno 6","Reno 7","Reno 8","Reno 9","Reno 10"],
            "OnePlus": ["Nord","Nord 2","Nord 3","Nord CE","Nord CE 2","Nord CE 3","6","6T","7","7 Pro","7T","7T Pro","8","8 Pro","8T","9","9 Pro","9RT","10","10 Pro","10R","11","11R","12"],
            "ROG": ["Phone","Phone II","Phone 3","Phone 5","Phone 5s","Phone 6","Phone 6 Pro","Phone 7","Phone 7 Ultimate"],
            "Other": ["Generic"]
        };
        populateModels();
    }
}

function populateModels() {
    const brand = brandSelect.value;
    const models = window._deviceDB?.[brand] || [];
    modelSelect.innerHTML = '<option value="">Select model</option>';
    models.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        modelSelect.appendChild(opt);
    });
    // Enable/disable custom fields
    if (brand === 'Other') {
        customDevice.disabled = false;
        customRam.disabled = false;
        customDevice.placeholder = 'Enter device name...';
        customRam.placeholder = 'RAM (GB)';
    } else {
        customDevice.disabled = true;
        customRam.disabled = true;
        customDevice.placeholder = 'Select a brand first';
        customRam.placeholder = '—';
    }
}

// ─── EVENT LISTENERS ───
brandSelect.addEventListener('change', () => {
    populateModels();
    // auto-generate if model selected
    if (modelSelect.value) generateSensitivity();
});

modelSelect.addEventListener('change', generateSensitivity);
graphicsSelect.addEventListener('change', generateSensitivity);
dpiMode.addEventListener('change', function() {
    customDpi.disabled = (this.value !== 'custom');
    if (this.value !== 'custom') generateSensitivity();
});
customDpi.addEventListener('input', generateSensitivity);
ageInput.addEventListener('input', generateSensitivity);
customDevice.addEventListener('input', generateSensitivity);
customRam.addEventListener('input', generateSensitivity);
generateBtn.addEventListener('click', generateSensitivity);

// ─── GENERATE SENSITIVITY (calls API) ───
async function generateSensitivity() {
    // Gather parameters
    const brand = brandSelect.value || 'Other';
    const model = modelSelect.value || 'Generic';
    let device = model;
    let ram = null;
    // If custom device
    if (brand === 'Other' && customDevice.value.trim() !== '') {
        device = customDevice.value.trim();
        ram = parseInt(customRam.value) || null;
    }

    const dpiModeVal = dpiMode.value;
    let dpi = null;
    if (dpiModeVal === 'custom') {
        const cDpi = parseInt(customDpi.value);
        if (!isNaN(cDpi) && cDpi >= 200) dpi = cDpi;
    } else if (dpiModeVal !== 'auto') {
        const parsed = parseInt(dpiModeVal);
        if (!isNaN(parsed) && parsed >= 200) dpi = parsed;
    }
    // If dpi remains null, API will auto-detect

    const graphics = graphicsSelect.value || 'Standard';
    const age = parseInt(ageInput.value) || 0;

    // Build query params
    const params = new URLSearchParams();
    params.append('device', device);
    params.append('brand', brand);
    if (ram) params.append('ram', ram);
    if (dpi) params.append('dpi', dpi);
    if (graphics) params.append('graphics', graphics);
    if (age) params.append('age', age);

    const url = `${API_BASE}/sensitivity?${params.toString()}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'API error');
        }
        const data = await res.json();

        // Update UI
        displayResults(data);
        window._lastResult = data;
    } catch (err) {
        console.error(err);
        showToast('Error: ' + err.message, 'warning');
    }
}

function displayResults(data) {
    const { device_info, sensitivity, dpi_settings, graphics_optimization } = data;

    deviceNameDisplay.textContent = device_info.name || '—';
    const cat = device_info.category || 'low-end';
    categoryBadge.textContent = cat === 'low-end' ? '🛡️ Low-End' : '⚡ High-End';
    categoryBadge.className = cat === 'low-end' ? 'badge-low' : 'badge-high';
    lockedIdDisplay.textContent = `🔒 ${device_info.locked_id || '—'}`;
    lockIdDisplay.textContent = device_info.locked_id || '—';

    dpiDisplay.textContent = dpi_settings?.default_dpi || '—';
    graphicsDisplay.textContent = graphics_optimization?.graphics_mode || '—';
    fpsDisplay.textContent = graphics_optimization?.fps_recommended || '—';

    valGeneral.textContent = sensitivity.general ?? '—';
    valRedDot.textContent = sensitivity.red_dot ?? '—';
    val2x.textContent = sensitivity['2x_scope'] ?? '—';
    val4x.textContent = sensitivity['4x_scope'] ?? '—';
    valSniper.textContent = sensitivity.sniper_scope ?? '—';
    valFreeLook.textContent = sensitivity.free_look ?? '—';
}

// ─── COPY ───
copyBtn.addEventListener('click', function() {
    const data = window._lastResult;
    if (!data) {
        showToast('Generate settings first!', 'warning');
        return;
    }
    const s = data.sensitivity;
    const text =
        `🔒 SensiLock Pro — Locked Profile\n` +
        `Device: ${data.device_info.name}\n` +
        `Lock ID: ${data.device_info.locked_id}\n` +
        `Category: ${data.device_info.category}\n` +
        `DPI: ${data.dpi_settings.default_dpi}  |  Graphics: ${data.graphics_optimization.graphics_mode}  |  FPS: ${data.graphics_optimization.fps_recommended}\n` +
        `──────────────\n` +
        `General:    ${s.general}\n` +
        `Red Dot:    ${s.red_dot}\n` +
        `2x Scope:   ${s['2x_scope']}\n` +
        `4x Scope:   ${s['4x_scope']}\n` +
        `Sniper:     ${s.sniper_scope}\n` +
        `Free Look:  ${s.free_look}\n` +
        `──────────────\n` +
        `⚡ SensiLock Pro — Device-Locked & Verified`;

    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(() => {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showToast('Copied!', 'success');
    });
});

// ─── DOWNLOAD ───
downloadBtn.addEventListener('click', function() {
    const data = window._lastResult;
    if (!data) {
        showToast('Generate settings first!', 'warning');
        return;
    }
    const json = {
        version: '2.0',
        generated: new Date().toISOString(),
        device: data.device_info,
        sensitivity: data.sensitivity,
        dpi_settings: data.dpi_settings,
        graphics_optimization: data.graphics_optimization,
        platform: 'Free Fire',
        note: 'Generated by SensiLock Pro — Device-Locked Sensitivity Engine'
    };
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sensilock_${data.device_info.locked_id}_${data.device_info.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Config downloaded!', 'success');
});

// ─── TOAST ───
function showToast(msg, type = 'success') {
    toastText.textContent = msg;
    toast.className = 'toast-message show';
    const icon = toast.querySelector('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#00f0ff';
    } else if (type === 'warning') {
        icon.className = 'fas fa-exclamation-triangle';
        icon.style.color = '#ffcc44';
    } else {
        icon.className = 'fas fa-info-circle';
        icon.style.color = '#7b2ffc';
    }
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// ─── INIT ───
fetchDeviceList().then(() => {
    // Set default brand and model
    brandSelect.value = 'Redmi';
    populateModels();
    setTimeout(() => {
        if (modelSelect.options.length > 1) {
            modelSelect.selectedIndex = 1;
        }
        generateSensitivity();
    }, 200);
});
