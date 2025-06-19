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
      { fps: 15, qrbox: { width: 250, height: 250 } },
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
