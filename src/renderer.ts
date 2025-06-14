import * as pdfJsLib from 'pdfjs-dist';

window.addEventListener('DOMContentLoaded', () => {
    const uploadElement = document.getElementById('upload');
    if (!uploadElement) {
      console.error('No element with id "upload" found!');
      return;
    }
    

    uploadElement.addEventListener('change', async (event) => {
        if(!event || !event.target) return;
        
        var files =  (<HTMLInputElement>event.target).files;
        if(!files) return;

        const file = files[0];
        console.log(file);
        if (!file) return;
      
        console.log(pdfJsLib.version);
        pdfJsLib.GlobalWorkerOptions.workerSrc = window.api.joinPath('.', 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs');

        const arrayBuffer = await file.arrayBuffer();
        console.log(arrayBuffer);
        const pdf = await pdfJsLib.getDocument({ data: arrayBuffer }).promise;
        console.log(pdf)
        const page = await pdf.getPage(1);
        console.log(page);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.getElementById('pdf-canvas');
        // const context = canvas.getContext('2d');
        // canvas.height = viewport.height;
        // canvas.width = viewport.width;
      
        // const renderContext = { canvasContext: context, viewport: viewport };
        // await page.render(renderContext).promise;
      });
      


});

