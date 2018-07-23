const fs = require('fs');
const os = require('os');
const path = require('path');
const {ipcMain,BrowserWindow,shell} = require('electron')


 ipcMain.on('print-to-pdf',(event) => {
     const win = BrowserWindow.fromWebContents(event.sender);
     const pdfPath = path.join(os.tmpdir(),'print-pdf.pdf');
     win.webContents.printToPDF({},(error,data) => {
        if (error) throw error
        fs.writeFile(pdfPath, data, (error) => {
            if (error) throw error
            const storeLocation  = path.join('file://',pdfPath);
            shell.openExternal(storeLocation)
        })
     })
 }) 