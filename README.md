# QR & Barcode Scanner

A professional, modern web app to scan and generate QR codes and barcodes using your device camera.

---

## 🚀 Features
- **Scan QR codes & barcodes** in real time using your phone or computer camera
- **Generate static QR codes** for any URL, with instant preview and download
- **Works on all modern browsers** (desktop & mobile)
- **No installation required** – just open in your browser
- **Beautiful, responsive UI**
- **Offline support** (if you download the required libraries)

---

## 📸 How to Use
### Scan QR/Barcodes
1. Open `index.html` in your browser (or use a local server for camera access)
2. Click **Start Camera** and allow camera access
3. Point your camera at a QR code or barcode
4. The result will appear instantly, with options to copy or open links

### Generate QR Codes
1. Enter a URL in the **Generate QR Code** section
2. Click **Generate**
3. Your QR code will appear with a download link and preview

---

## 🛠️ Project Structure
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

## 📦 Libraries Used
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

## 📲 Mobile Friendly
- Fully responsive and touch-optimized
- Works on iOS and Android browsers

---

## 📝 License
MIT
