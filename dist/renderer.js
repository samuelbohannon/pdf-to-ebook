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
            if (!file)
                return;
            const arrayBuffer = await file.arrayBuffer();
            const isPdfLoaded = await window.preloadApi.pdf.loadPdfToMemory(arrayBuffer);
            if (isPdfLoaded) {
                window.preloadApi.pdf.displayCurrentPage();
                setPageRange();
            }
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
    const backPageElement = document.getElementById('backPagePdf');
    const nextPageElement = document.getElementById('nextPagePdf');
    if (backPageElement) {
        backPageElement.addEventListener('click', async () => {
            await window.preloadApi.pdf.displayPreviousPage();
        });
    }
    if (nextPageElement) {
        nextPageElement.addEventListener('click', async () => {
            await window.preloadApi.pdf.displayNextPage();
        });
    }
});
function setPageRange() {
    const slider = document.getElementById('rangeInput');
    const output = document.getElementById('rangeValue');
    if (slider && slider instanceof HTMLInputElement && output) {
        slider.max = window.preloadApi.pdf.getPageCount().toString();
        let timeoutId;
        slider.addEventListener('input', () => {
            console.log(slider.value);
            output.textContent = slider.value;
            if (timeoutId)
                clearTimeout(timeoutId); // Reset the timer
            timeoutId = setTimeout(() => {
                onSliderSet(Number(slider.value));
            }, 1000);
        });
        async function onSliderSet(pageNumber) {
            console.log('Value stayed at:', pageNumber.toString(), 'for 1 second');
            window.preloadApi.pdf.displayPage(pageNumber);
        }
    }
}
//# sourceMappingURL=renderer.js.map