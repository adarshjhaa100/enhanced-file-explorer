import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { utils as xlutils } from "xlsx";
import { saveFile } from "./utilities/SaveUtility";
import { Folder } from "./Folder";

export const data = [
  {
    dir: "test-folder",
    isFolder: true,
    files: [
      {
        dir: "subfolder-1",
        isFolder: true,
        files: [{ dir: "subfolder-1-file-1", isFolder: false }],
      },
      {
        dir: "subfolder-2",
        isFolder: false,
        files: [],
      },
      {
        dir: "subfolder-3",
        isFolder: true,
        files: [
          { dir: "subfolder-3-file-1", isFolder: false, files: [] },
          {
            dir: "subfolder-3-file-2",
            isFolder: true,
            files: [
              {
                dir: "subfolder-3-file-3",
                isFolder: false,
                files: [],
              },
              { dir: "subfolder-3-file-4", isFolder: false, files: [] },
              {
                dir: "subfolder-3-file-5",
                isFolder: false,
                files: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

function App() {
  const [name, setName] = useState("/");

  const DIR_LIST: any[] = [];
  const [dirContents, setDirContents] = useState(DIR_LIST);
  const a: any = null;
  const [currentFileContent, setcurrentFileContent] = useState(a);
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [time, setTime] = useState(0);

  async function createXLWorksheet(params: any[][]) {
    const ws = xlutils.aoa_to_sheet(params);
    const wbFile = xlutils.book_new();

    xlutils.book_append_sheet(wbFile, ws);
    console.log(wbFile);
    // writeFile(wbFile, "Test.xlsx");
    await saveFile(wbFile);
  }

  async function readDir(newPath: string | null) {
    console.log(newPath);
    newPath === "" ? (newPath = "/") : (newPath = newPath);
    const randomC: any[] = await invoke("read_dir", {
      name: newPath !== null ? newPath : name,
    });
    setName(newPath !== null ? newPath : name);
    console.log(randomC);
    setDirContents(randomC);
  }

  async function readFileCustom(file_path: string) {
    const data: any = await invoke("read_file_custom", {
      name: file_path,
      offset1: 0,
    });

    // console.log(data);
    setcurrentFileContent(await data);
    setIsFileOpen(!isFileOpen);
  }

  async function clockIntegrate() {
    const data: any = await invoke("clock");
    setTime(data);
  }

  return (
    <main className="window">
      <header className="windowHeader">
        <h1>File XPLR</h1>
      </header>
      <header></header>

      <div className="windowContent">
        <div className="directorySidebar">
          <h1>Documents</h1>
          {data.map((item, i) => (
            <div className="" key={i}>
              <Folder folder={item} />
            </div>
          ))}
        </div>
        <div className="directoryContent"></div>
      </div>
    </main>
  );
}

export default App;
