"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const uploadElement = document.getElementById('upload');
    if (!uploadElement) {
        console.error('No element with id "upload" found!');
        return;
    }
    uploadElement.addEventListener('change', async (event) => {
        try {
            if (!event || !event.target)
                return;
            var files = event.target.files;
            if (!files)
                return;
            const file = files[0];
            console.log(file);
            if (!file)
                return;
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await window.preloadApi.pdf.loadPdfFromArrayBuffer(arrayBuffer, 1);
        }
        catch (err) {
            console.error('Error loading PDF page:', err);
            if (err instanceof Error) {
                console.error('Error message:', err.message);
                console.error('Stack trace:', err.stack);
            }
            else {
                console.error('Raw error object:', JSON.stringify(err));
            }
        }
    });
});
//{_pdfInfo: {…}, _transport: {…}}
//# sourceMappingURL=renderer.js.map