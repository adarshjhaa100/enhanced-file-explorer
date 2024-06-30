import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import {utils as xlutils} from "xlsx";
import { saveFile } from "./utilities/SaveUtility";
import Sidebar from "./components/Sidebar/Sidebar";
import WindowContent from "./components/WindowContent/WindowContent";
import PrimaryHeader from "./components/PrimaryHeader/PrimaryHeader";
// import PrimaryFooter from "./components/PrimaryFooter/PrimaryFooter";

function App() {
  const [name, setName] = useState("/");
  let TABLE_CONST: any = null;
  const [tableView, setTableView] = useState(TABLE_CONST);

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

//  console.log(readDir("/"));

  return (<main className = "window">
    
      <PrimaryHeader/>
        <div className="windowMain">
          <Sidebar/>
          <WindowContent 
              tableView = {tableView}
              setTableView = {setTableView}
              /> 
        </div>
       {/* <PrimaryFooter tableView = {tableView}
             /> */}
       

  </main>);
    
}

export default App;