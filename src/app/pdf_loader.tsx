// "use client";

// import React, { useState, useEffect } from "react";
// import { pdfjs } from "react-pdf";
// import { Document, Page } from "react-pdf";

// import "react-pdf/dist/Page/TextLayer.css";
// import "react-pdf/dist/Page/AnnotationLayer.css";

// import { fetchPdf } from "./fetchPDF.action";

// const options = {
//   cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
// };

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// // { pdfsrc }: { pdfsrc?: Blob }
// export default function PdfLoader() {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pdfsrc, setPdfSrc] = useState<Blob>()

//   const getPDF = async()=>{
//     const response = await fetchPdf()
//     setPdfSrc(response)
//   }

//   useEffect(()=>{
//     if(!pdfsrc){
//       getPDF()
//     }
//   },[])


//   // // Callback to handle successful loading of the document
//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     console.log("onDocumentLoadSuccess triggered");
//     console.log(`Document loaded. Total Pages: ${numPages}`);
//     setNumPages(numPages); // Only set numPages once the document is loaded
//   };

//   // Log every render to see if the component is re-rendering unexpectedly
//   // console.log("Rendering PdfLoader component");
//   return (
//     <div className="pdf-wrapper">
//       <Document
//         file={pdfsrc}
//         onLoadSuccess={onDocumentLoadSuccess} // Call this when the document is loaded successfully
//         options={options}
//         loading={<div className="spinner">Loading your document...</div>}
//         error={
//           <div className="error">
//             Oops! Failed to load the PDF. Please try again later.
//           </div>
//         }
//       >
//         <Page pageNumber={1} />
//         {numPages &&
//           Array.from(new Array(numPages), (el, index) => (
//             <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//           ))}
//       </Document>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { fetchPdf } from "./fetchPDF.action";

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// { pdfsrc }: { pdfsrc?: Blob }
export default function PdfLoader() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfsrc, setPdfSrc] = useState<Blob>();

  const getPDF = async () => {
    const response = await fetchPdf();
    setPdfSrc(response);
  };

  useEffect(() => {
    if (!pdfsrc) {
      getPDF();
    }
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log("onDocumentLoadSuccess triggered");
    console.log(`Document loaded. Total Pages: ${numPages}`);
    setNumPages(numPages); // Set number of pages when document loads
  };

  return (
    <div className="pdf-wrapper">
      <Document
        file={pdfsrc}
        onLoadSuccess={onDocumentLoadSuccess} // Call this when the document is loaded successfully
        options={options}
        loading={<div className="spinner">Loading your document...</div>}
        error={
          <div className="error">
            Oops! Failed to load the PDF. Please try again later.
          </div>
        }
      >
        {/* Only render the pages starting from page 1 */}
        {numPages && 
          Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))
        }
      </Document>
    </div>
  );
}
