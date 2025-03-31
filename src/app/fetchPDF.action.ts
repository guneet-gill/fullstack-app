"use server"

export const fetchPdf = async () => {
  const request = await fetch(
   //  "https://www.cs.cmu.edu/~./epxing/Class/10715/reading/McCulloch.and.Pitts.pdf",
    "https://www.delta-intkey.com/www/printtest.pdf",
    { method: "GET", mode: "cors" }
  );
  const response = await request.blob();
  return response;
};

