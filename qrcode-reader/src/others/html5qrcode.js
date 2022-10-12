// const html5Qrcode = new Html5Qrcode("reader");
// Html5Qrcode.getCameras().then(devices => {
//     console.log(devices);
//     if(devices && devices.length){
//         let cameraId = devices[0].id;
//         html5Qrcode.start(
//             cameraId,
//             qrcodeConfig,
//             // SUCCESS SCAN
//             (decodedText, decodedResult) => {
//                 window.alert(`decodedText: ${decodedText}` + '\n' + `decodedResult: ${decodedResult}`);
//             }
//             // ERROR FUNCTION IF DESIRE
//         ).catch(err => window.alert(err))
//     }
// })
