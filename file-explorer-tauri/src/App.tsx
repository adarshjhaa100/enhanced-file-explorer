import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import {utils as xlutils} from "xlsx";
import { saveFile } from "./utilities/SaveUtility";

function App() {
  const [name, setName] = useState("/");

  const DIR_LIST:any[] = [];
  const [dirContents, setDirContents] = useState(DIR_LIST);
  const a:any=null;
  const [currentFileContent, setcurrentFileContent] = useState(a);
  const [isFileOpen, setIsFileOpen] = useState(false);

  
  async function createXLWorksheet(params:any[][]) {
    const ws = xlutils.aoa_to_sheet(params);
    const wbFile = xlutils.book_new();

    xlutils.book_append_sheet(wbFile, ws);
    console.log(wbFile);
    // writeFile(wbFile, "Test.xlsx");
    await saveFile(wbFile);
    

  }

  async function readDir(newPath: string|null) {
    
    console.log(newPath);
    newPath === ''? newPath = "/": newPath = newPath;
    const randomC: any[] = await invoke("read_dir", { 
      name: newPath !== null ? newPath : name
    });
    setName(newPath !== null ? newPath : name);
    console.log(randomC);
    setDirContents(randomC);
  }

  async function readFileCustom(file_path: string){
    const data: any = await invoke("read_file_custom", {
      name: file_path,
      offset1: 0
    })
    
    // console.log(data);
    setcurrentFileContent(await data);
    setIsFileOpen(!isFileOpen);
  }
 

  return (<main className = "window">
    <header className="windowHeader">
      Header
    </header>
    
    <div className="windowContent">
      <div className="directorySidebar">
        Dir Sidebar
      </div>
      <div className="directoryContent">
        Dir Content
      </div>
    </div>

  </main>);
    
}

export default App;
