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

function onScanFailure(error) {
  // Optionally show error or log
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

// Optionally, auto-start camera on page load:
// window.onload = startCamera;
