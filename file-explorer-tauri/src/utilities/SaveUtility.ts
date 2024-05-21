import { write } from 'xlsx';
import { save } from '@tauri-apps/api/dialog';
import { writeBinaryFile } from '@tauri-apps/api/fs';

const filters = [
  {name: "Excel Binary Workbook", extensions: ["xlsb"]},
  {name: "Excel Workbook", extensions: ["xlsx"]},
  {name: "Excel 97-2004 Workbook", extensions: ["xls"]},
  // ... other desired formats ...
];

export async function saveFile(wb:any) {
  /* show save file dialog */
  const selected = await save({
    title: "Save to Spreadsheet",
    filters
  });
  if(!selected) return;

  /* Generate workbook */
  const bookType:any = selected.slice(selected.lastIndexOf(".") + 1);
  const d = write(wb, {type: "buffer", bookType});

  /* save data to file */
  await writeBinaryFile(selected, d);
}