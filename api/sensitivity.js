// api/sensitivity.js — Vercel Serverless Function
// Also usable as an Express route with minimal changes.

// ─── DEVICE DATABASE ───
const DEVICE_DB = {
    Redmi: {
        '9A': { ram: 2, refresh: 60, dpi: 320, category: 'low-end' },
        '9C': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        '9 Power': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '10': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '10 Prime': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '11': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '11 Prime': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '11 Prime 5G': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        '12': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '12C': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        '13C': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Note 8': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Note 8 Pro': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'Note 9': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Note 9 Pro': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'Note 10': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Note 10 Pro': { ram: 6, refresh: 120, dpi: 440, category: 'high-end' },
        'Note 11': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Note 11 Pro': { ram: 6, refresh: 120, dpi: 440, category: 'high-end' },
        'Note 12': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Note 12 Pro': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'K20': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'K20 Pro': { ram: 8, refresh: 60, dpi: 400, category: 'high-end' },
        'K30': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'K30 Pro': { ram: 8, refresh: 60, dpi: 400, category: 'high-end' },
        'K40': { ram: 6, refresh: 120, dpi: 440, category: 'high-end' },
        'K40 Pro': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'K50': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'K50 Pro': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
    },
    Xiaomi: {
        'Mi 9': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'Mi 10': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'Mi 10 Pro': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'Mi 10T': { ram: 6, refresh: 144, dpi: 440, category: 'high-end' },
        'Mi 10T Pro': { ram: 8, refresh: 144, dpi: 440, category: 'high-end' },
        'Mi 11': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'Mi 11 Pro': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        'Mi 11 Ultra': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        '12': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        '12 Pro': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        '12 Ultra': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        '13': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        '13 Pro': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        '13 Ultra': { ram: 16, refresh: 120, dpi: 480, category: 'high-end' },
    },
    iPhone: {
        '11': { ram: 4, refresh: 60, dpi: 326, category: 'high-end' },
        '11 Pro': { ram: 4, refresh: 60, dpi: 458, category: 'high-end' },
        '11 Pro Max': { ram: 4, refresh: 60, dpi: 458, category: 'high-end' },
        '12': { ram: 4, refresh: 60, dpi: 460, category: 'high-end' },
        '12 Mini': { ram: 4, refresh: 60, dpi: 476, category: 'high-end' },
        '12 Pro': { ram: 6, refresh: 60, dpi: 460, category: 'high-end' },
        '12 Pro Max': { ram: 6, refresh: 60, dpi: 458, category: 'high-end' },
        '13': { ram: 4, refresh: 60, dpi: 460, category: 'high-end' },
        '13 Mini': { ram: 4, refresh: 60, dpi: 476, category: 'high-end' },
        '13 Pro': { ram: 6, refresh: 120, dpi: 460, category: 'high-end' },
        '13 Pro Max': { ram: 6, refresh: 120, dpi: 458, category: 'high-end' },
        '14': { ram: 6, refresh: 60, dpi: 460, category: 'high-end' },
        '14 Plus': { ram: 6, refresh: 60, dpi: 458, category: 'high-end' },
        '14 Pro': { ram: 6, refresh: 120, dpi: 460, category: 'high-end' },
        '14 Pro Max': { ram: 6, refresh: 120, dpi: 458, category: 'high-end' },
        '15': { ram: 6, refresh: 60, dpi: 460, category: 'high-end' },
        '15 Plus': { ram: 6, refresh: 60, dpi: 458, category: 'high-end' },
        '15 Pro': { ram: 8, refresh: 120, dpi: 460, category: 'high-end' },
        '15 Pro Max': { ram: 8, refresh: 120, dpi: 458, category: 'high-end' },
        'SE (2nd gen)': { ram: 3, refresh: 60, dpi: 326, category: 'low-end' },
        'SE (3rd gen)': { ram: 4, refresh: 60, dpi: 326, category: 'high-end' },
    },
    Samsung: {
        'A12': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        'A13': { ram: 4, refresh: 60, dpi: 320, category: 'low-end' },
        'A14': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A15': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A22': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A23': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A24': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A32': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A33': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'A34': { ram: 6, refresh: 120, dpi: 400, category: 'high-end' },
        'A52': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'A53': { ram: 6, refresh: 120, dpi: 400, category: 'high-end' },
        'A54': { ram: 6, refresh: 120, dpi: 400, category: 'high-end' },
        'A72': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'A73': { ram: 8, refresh: 120, dpi: 400, category: 'high-end' },
        'S20': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'S20+': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'S20 Ultra': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        'S21': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'S21+': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'S21 Ultra': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        'S22': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'S22+': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'S22 Ultra': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        'S23': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'S23+': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'S23 Ultra': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        'S24': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        'S24+': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        'S24 Ultra': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        'Note 20': { ram: 8, refresh: 60, dpi: 440, category: 'high-end' },
        'Note 20 Ultra': { ram: 12, refresh: 120, dpi: 440, category: 'high-end' },
    },
    Realme: {
        'C11': { ram: 2, refresh: 60, dpi: 320, category: 'low-end' },
        'C12': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        'C15': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        'C17': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'C21': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        'C25': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'C30': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'C33': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '3': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '3 Pro': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        '5': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '5 Pro': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        '6': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '6 Pro': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        '7': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '7 Pro': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        '8': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        '8 Pro': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        '9': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        '9 Pro': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        '10': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        '10 Pro': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'GT': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'GT Neo': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'GT Master': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
    },
    Poco: {
        'M2': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        'M2 Pro': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'M3': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'M3 Pro': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'M4': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'M4 Pro': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'M5': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'M5 Pro': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'X2': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'X3': { ram: 6, refresh: 120, dpi: 440, category: 'high-end' },
        'X3 Pro': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'X4': { ram: 6, refresh: 120, dpi: 440, category: 'high-end' },
        'X4 Pro': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'X5': { ram: 6, refresh: 120, dpi: 440, category: 'high-end' },
        'X5 Pro': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'F1': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'F2 Pro': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'F3': { ram: 6, refresh: 120, dpi: 440, category: 'high-end' },
        'F4': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'F5': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
    },
    Vivo: {
        'Y11': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        'Y12': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        'Y15': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y17': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y20': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y21': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y22': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y23': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y27': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y28': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y30': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y31': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y33': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y35': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'Y36': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'V15': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'V17': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'V19': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'V20': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'V21': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'V23': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'V25': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'V27': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'X50': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'X60': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'X70': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'X80': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'X90': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
    },
    Oppo: {
        'A12': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        'A15': { ram: 3, refresh: 60, dpi: 320, category: 'low-end' },
        'A16': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A17': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A31': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A32': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A33': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A35': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A36': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A37': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A38': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A53': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A54': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A55': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A57': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A58': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A59': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A72': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'A74': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'A76': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'A77': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'A78': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'A79': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'F7': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'F9': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'F11': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'F15': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'F17': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
        'F19': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'F21': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'F23': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'Find X2': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'Find X3': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'Find X5': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'Find X6': { ram: 12, refresh: 120, dpi: 440, category: 'high-end' },
        'Reno 2': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        'Reno 3': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'Reno 4': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'Reno 5': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'Reno 6': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'Reno 7': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'Reno 8': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'Reno 9': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'Reno 10': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
    },
    OnePlus: {
        'Nord': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'Nord 2': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'Nord 3': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        'Nord CE': { ram: 6, refresh: 90, dpi: 400, category: 'high-end' },
        'Nord CE 2': { ram: 8, refresh: 90, dpi: 400, category: 'high-end' },
        'Nord CE 3': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        '6': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        '6T': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        '7': { ram: 6, refresh: 60, dpi: 400, category: 'high-end' },
        '7 Pro': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        '7T': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        '7T Pro': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        '8': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        '8 Pro': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        '8T': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        '9': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        '9 Pro': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        '9RT': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        '10': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        '10 Pro': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
        '10R': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        '11': { ram: 8, refresh: 120, dpi: 480, category: 'high-end' },
        '11R': { ram: 8, refresh: 120, dpi: 440, category: 'high-end' },
        '12': { ram: 12, refresh: 120, dpi: 480, category: 'high-end' },
    },
    ROG: {
        'Phone': { ram: 8, refresh: 90, dpi: 440, category: 'high-end' },
        'Phone II': { ram: 12, refresh: 120, dpi: 440, category: 'high-end' },
        'Phone 3': { ram: 8, refresh: 144, dpi: 440, category: 'high-end' },
        'Phone 5': { ram: 8, refresh: 144, dpi: 440, category: 'high-end' },
        'Phone 5s': { ram: 12, refresh: 144, dpi: 440, category: 'high-end' },
        'Phone 6': { ram: 12, refresh: 165, dpi: 480, category: 'high-end' },
        'Phone 6 Pro': { ram: 16, refresh: 165, dpi: 480, category: 'high-end' },
        'Phone 7': { ram: 12, refresh: 165, dpi: 480, category: 'high-end' },
        'Phone 7 Ultimate': { ram: 16, refresh: 165, dpi: 480, category: 'high-end' },
    },
    Other: {
        'Generic': { ram: 4, refresh: 60, dpi: 360, category: 'low-end' },
    }
};

// ─── UTILITY FUNCTIONS ───
function hashString(str) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0);
}

function seededRandom(seed) {
    let s = seed;
    return function() {
        s = Math.imul(s, 0x41c64e6d) + 0x3039;
        s = s >>> 0;
        return (s & 0x7fffffff) / 0x7fffffff;
    };
}

function getSafeDpi(requestedDpi) {
    let dpi = Number(requestedDpi);
    if (isNaN(dpi) || dpi < 200) dpi = 360;
    if (dpi < 240) dpi = 240;
    if (dpi > 720) dpi = 720;
    return dpi;
}

function getFpsRecommendation(refresh, graphics) {
    if (refresh >= 120) return graphics === 'Max' ? '60' : graphics === 'Ultra' ? '90' : '120';
    if (refresh >= 90) return graphics === 'Max' ? '60' : '90';
    return '60';
}

// ─── MAIN GENERATOR ───
function generateLockedSensitivity(deviceName, brand, ram, refresh, dpi, graphics, age) {
    const sig = `${brand}|${deviceName}|${ram}|${refresh}|${dpi}|${graphics}`;
    const baseHash = hashString(sig);
    const seed = baseHash + (age ? age * 1000 : 0) + (graphics === 'Max' ? 777 : graphics === 'Ultra' ? 555 : graphics === 'Smooth' ? 333 : 0);

    const rand = seededRandom(seed);
    const isLowEnd = (ram <= 4 || refresh <= 60);
    const category = isLowEnd ? 'low-end' : 'high-end';

    let ranges;
    if (isLowEnd) {
        ranges = {
            general: [62, 76],
            redDot: [52, 66],
            scope2x: [42, 56],
            scope4x: [32, 46],
            sniper: [22, 36],
            freeLook: [66, 80]
        };
    } else {
        ranges = {
            general: [48, 64],
            redDot: [40, 56],
            scope2x: [30, 46],
            scope4x: [20, 36],
            sniper: [10, 26],
            freeLook: [56, 72]
        };
    }

    let gfxMult = 1.0;
    if (graphics === 'Smooth') gfxMult = 0.92;
    else if (graphics === 'Standard') gfxMult = 1.0;
    else if (graphics === 'Ultra') gfxMult = 1.06;
    else if (graphics === 'Max') gfxMult = 1.12;

    let dpiComp = 1.0;
    if (dpi < 350) dpiComp = 1.08;
    else if (dpi < 420) dpiComp = 1.0;
    else if (dpi < 520) dpiComp = 0.95;
    else dpiComp = 0.88;

    function genVal(min, max) {
        const raw = min + rand() * (max - min);
        const adjusted = raw * gfxMult * dpiComp;
        return Math.round(Math.min(Math.max(adjusted, 4), 100));
    }

    const general = genVal(ranges.general[0], ranges.general[1]);
    const redDot = genVal(ranges.redDot[0], ranges.redDot[1]);
    const scope2x = genVal(ranges.scope2x[0], ranges.scope2x[1]);
    const scope4x = genVal(ranges.scope4x[0], ranges.scope4x[1]);
    const sniper = genVal(ranges.sniper[0], ranges.sniper[1]);
    const freeLook = genVal(ranges.freeLook[0], ranges.freeLook[1]);

    const lockId = baseHash.toString(16).padStart(8, '0').toUpperCase();

    return {
        lockId,
        category,
        sensitivity: { general, red_dot: redDot, '2x_scope': scope2x, '4x_scope': scope4x, sniper_scope: sniper,
            free_look: freeLook },
    };
}

// ─── API HANDLER (Vercel) ───
module.exports = async function handler(req, res) {
    // Enable CORS for local testing (optional)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only GET allowed
    if (req.method !== 'GET') {
        return res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }

    // ─── Extract parameters ───
    const { device, brand, ram, dpi, graphics, age } = req.query;

    // Validation
    if (!device || !brand) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required parameters: device, brand'
        });
    }

    // Determine device specs
    let spec = DEVICE_DB[brand]?.[device];
    let ramVal = ram ? parseInt(ram) : null;
    let refreshVal = 60;
    let defaultDpi = 360;

    if (spec) {
        refreshVal = spec.refresh || 60;
        defaultDpi = spec.dpi || 360;
        if (ramVal === null) ramVal = spec.ram;
    } else {
        // Fallback for custom device
        if (ramVal === null) ramVal = 4;
        refreshVal = 60;
        defaultDpi = 360;
    }

    // DPI handling
    let finalDpi = defaultDpi;
    if (dpi) {
        const parsed = parseInt(dpi);
        if (!isNaN(parsed) && parsed >= 200) {
            finalDpi = getSafeDpi(parsed);
        }
    }

    const graphicsMode = graphics || 'Standard';
    const ageVal = age ? parseInt(age) : 0;

    // Generate
    const result = generateLockedSensitivity(
        device,
        brand,
        ramVal,
        refreshVal,
        finalDpi,
        graphicsMode,
        ageVal
    );

    const fps = getFpsRecommendation(refreshVal, graphicsMode);

    // Build response
    const response = {
        status: 'success',
        device_info: {
            name: device,
            brand: brand,
            category: result.category,
            locked_id: result.lockId,
        },
        sensitivity: result.sensitivity,
        dpi_settings: {
            default_dpi: defaultDpi,
            recommended_dpi: finalDpi,
            dpi_mode: dpi || 'auto',
        },
        graphics_optimization: {
            graphics_mode: graphicsMode,
            fps_recommended: fps,
        }
    };

    res.status(200).json(response);
};

// If used as an Express server (uncomment for local testing)
/*
const express = require('express');
const app = express();
app.get('/api/sensitivity', handler);
app.get('/api/devices', (req, res) => {
    const brands = {};
    for (const b in DEVICE_DB) {
        brands[b] = Object.keys(DEVICE_DB[b]);
    }
    res.json(brands);
});
app.listen(3000, () => console.log('SensiLock API running on port 3000'));
*/
