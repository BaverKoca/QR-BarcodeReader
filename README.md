# QR & Barcode Scanner

A modern, professional web app to scan and generate QR codes and barcodes using your device camera. Fast, mobile-friendly, and easy to use.

---

## 📸 Screenshots
![Image](https://github.com/user-attachments/assets/d2d72510-89dd-4cb4-9e74-1ddd88353ae3)
![Image](https://github.com/user-attachments/assets/6e958ed5-61b1-445d-98fe-8bbe541fefe4)
<!-- Optionally add screenshots here -->

---

## ✨ Features
- **Real-time QR & barcode scanning** with your phone or computer camera
- **Generate static QR codes** for any URL, with instant preview and download
- **Edit generated QR codes** before downloading
- **Works on all modern browsers** (desktop & mobile)
- **No installation required** – just open in your browser
- **Beautiful, responsive UI**
- **Offline support** (if you download the required libraries)

---

## 🚀 Getting Started

### 1. Scan QR Codes & Barcodes
- Open `index.html` in your browser *(or use a local server for camera access)*
- Click **Start Camera** and allow camera access
- Point your camera at a QR code or barcode
- The result will appear instantly, with options to copy or open links

### 2. Generate QR Codes
- Enter a URL in the **Generate QR Code** section
- Click **Generate**
- Your QR code will appear with a download link and preview
- You can edit the URL and instantly update the QR code

---

## 🗂️ Project Structure
```
qr-barcode-scanner/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── libs/
│   └── html5-qrcode.min.js (optional – for offline use)
└── README.md
```

---

## 🛠️ Libraries Used
- [html5-qrcode](https://github.com/mebjas/html5-qrcode) – Camera scanning (QR & barcodes)
- [qrcodejs](https://github.com/davidshimjs/qrcodejs) – QR code generation

---

## 🌐 Local Development
For camera access, use a local server:
```sh
python -m http.server 5500
```
Then open [http://localhost:5500](http://localhost:5500) in your browser.

---

## 📱 Mobile Friendly
- Fully responsive and touch-optimized
- Works on iOS and Android browsers

---

## 📝 License
MIT
