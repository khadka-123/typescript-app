import { serve } from "bun";
import ExcelJS from "exceljs";

async function loadRedirects(filePath: string) {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(filePath);
    const sheet = wb.getWorksheet(1);
    const map = new Map<string, string>();

    sheet.eachRow((row:ExcelJS.Row, rowNumber:number) => {
        if (rowNumber === 1) return;
        const oldUrl = row.getCell(1).text.trim();
        const newUrl = row.getCell(2).text.trim();
        if (oldUrl && newUrl) map.set(oldUrl, newUrl);
    });

    return map;
}

async function main() {
const redirects = await loadRedirects('src/bin/redirects.xlsx');

    serve({
        port: 3001,
         fetch(request:Request) {
            const url = new URL(request.url);
            const target = redirects.get(url.pathname);
            if (target) {
                 return Response.redirect(target, 301);
            }
            return new Response("404 Not Found", { status: 404 });
        },
    });

    console.log("Redirect server listening on http://localhost:3001");
}

main().catch(err => {
  console.error("Failed to start server:", err);
});