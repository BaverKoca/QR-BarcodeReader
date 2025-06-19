let html5QrCode;
let isScanning = false;

function onScanSuccess(decodedText, decodedResult) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<strong>Code:</strong> ${decodedText}`;
  if (/^https?:\/\//.test(decodedText)) {
    resultDiv.innerHTML += `<br><a href="${decodedText}" target="_blank" class="open-link">Open Link</a>`;
  }
  resultDiv.innerHTML += `<br><button id="copy-btn">Copy</button>`;
  document.getElementById('copy-btn').onclick = () => {
    navigator.clipboard.writeText(decodedText);
    resultDiv.innerHTML += '<div class="copied">Copied!</div>';
    setTimeout(() => {
      const copied = resultDiv.querySelector('.copied');
      if (copied) copied.remove();
    }, 1200);
  };
}

async function startCamera() {
  if (isScanning) return;
  html5QrCode = new Html5Qrcode("reader");
  isScanning = true;
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('stop-btn').style.display = 'inline-block';
  document.getElementById('result').innerText = 'Waiting for scan...';
  try {
    await html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 15,
        qrbox: { width: 300, height: 200 },
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.CODE_93,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.ITF,
          Html5QrcodeSupportedFormats.AZTEC,
          Html5QrcodeSupportedFormats.DATA_MATRIX,
          Html5QrcodeSupportedFormats.PDF_417
        ]
      },
      onScanSuccess,
      onScanFailure
    );
  } catch (err) {
    document.getElementById('result').innerText = 'Camera error: ' + err;
    isScanning = false;
    document.getElementById('start-btn').style.display = 'inline-block';
    document.getElementById('stop-btn').style.display = 'none';
  }
}

async function stopCamera() {
  if (!isScanning || !html5QrCode) return;
  await html5QrCode.stop();
  await html5QrCode.clear();
  isScanning = false;
  document.getElementById('start-btn').style.display = 'inline-block';
  document.getElementById('stop-btn').style.display = 'none';
  document.getElementById('result').innerText = 'Camera stopped.';
}

document.getElementById('start-btn').onclick = startCamera;
document.getElementById('stop-btn').onclick = stopCamera;

// QR Code Generator using qrcodejs
const qrForm = document.getElementById('qr-form');
const qrUrlInput = document.getElementById('qr-url');
const qrOutput = document.getElementById('qr-output');

qrForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const url = qrUrlInput.value.trim();
  if (!url) return;
  qrOutput.innerHTML = '';
  const qrDiv = document.createElement('div');
  qrDiv.id = 'qr-canvas';
  qrOutput.appendChild(qrDiv);
  const qr = new QRCode(qrDiv, {
    text: url,
    width: 220,
    height: 220,
    colorDark: "#2563eb",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  setTimeout(() => {
    const img = qrDiv.querySelector('img');
    if (img) {
      const canvas = qrDiv.querySelector('canvas');
      if (canvas) canvas.remove();
      img.style.display = 'block';
      img.style.maxWidth = '220px';
      img.style.margin = '0 auto 10px auto';
      img.alt = 'Generated QR Code';
      qrOutput.innerHTML = '';
      const displayDiv = document.createElement('div');
      displayDiv.style.display = 'flex';
      displayDiv.style.flexDirection = 'column';
      displayDiv.style.alignItems = 'center';
      displayDiv.innerHTML = `<h3 style='margin-bottom:8px;color:#2563eb;'>Your QR Code:</h3>`;
      displayDiv.appendChild(img);
      displayDiv.innerHTML += `<div style='margin-top:10px;word-break:break-all;font-size:0.95rem;'>${url}</div>`;
      displayDiv.innerHTML += `<a href="${img.src}" download="qr-code.png" class="open-link" style="display:block;margin-top:8px;">Download QR Code</a>`;
      qrOutput.appendChild(displayDiv);
    } else {
      qrOutput.innerHTML = '<span style="color:red">Error generating QR code.</span>';
    }
  }, 300);
});
