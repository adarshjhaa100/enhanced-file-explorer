import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import {utils as xlutils} from "xlsx";
import { saveFile } from "./components/SaveUtility";

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
 

  return (
    <div className="container">


      <form className="file-search-bar"> 

      
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="path here"
          value={name}
          className="input-cl"
        />
      
      <button className="action-btn" onClick={(e)=>{
        e.preventDefault();
        console.log("Clik");
        console.log(name.split("/").slice(0,-1).join("/"));
        readDir(name.split("/").slice(0,-1).join("/"));
      }}>
        Back
      </button>


      <button className="action-btn" onClick={(e)=>{
        e.preventDefault();

        const saveData:any[][] = dirContents.map((val: any[])=>{
          return [
            JSON.parse(val[0]),
            val[1],
            val[2]!==""?new Date(Number.parseInt( val[2].split(",")[0].replace("SystemTime { tv_sec: ","") )).toISOString() : "",
            val[3]!==""?new Date(Number.parseInt( val[3].split(",")[0].replace("SystemTime { tv_sec: ","") )).toISOString() : "",
            val[4] === "true" ? "Folder": "File"
          ]
        });

        const ar = [["Name", "Size", "Created", "Modified"]] as any[][];
        createXLWorksheet(ar.concat(saveData)); 
      }}>
        Export View
      </button>
      </form>

      

      {/* <p>{greetMsg}</p> */}
      {/* <p>{randomchar}</p> */}

      { !isFileOpen?<div className = "DirRoot">
        <div className="rootHeaders">
            <div className="rh">Name</div>
            <div className="rh">Size</div>
            <div className="rh">Created</div>
            <div className="rh">Modified</div>
            {/* <div className="rh">Type</div> */}
        </div>

        <div className="DirContent">
      {
      dirContents.map((val: any, index: any)=>{
        return <div key = {index+21} className={val[4] === "true"?"directory-item item-folder":"directory-item item-file"}>
          
          <div className="rh" onDoubleClick={async (e)=>{
            e.preventDefault();
            console.log("Double clicked");
            if(val[4] === "true")
              await readDir(JSON.parse(val[5]));
            else
              await readFileCustom(JSON.parse(val[5]));
              

          }}>{JSON.parse(val[0])}</div>
            <div className="rh">{val[1]}</div>
            <div className="rh">{val[2]!==""?new Date(Number.parseInt( val[2].split(",")[0].replace("SystemTime { tv_sec: ","") )).toISOString() : ""}</div>
            <div className="rh">{val[3]!==""?new Date(Number.parseInt( val[3].split(",")[0].replace("SystemTime { tv_sec: ","") )).toISOString() : ""}</div>
            {/* <div className="rh">{val[4]}</div> */}
          
        </div>
      })
      
      }</div>
      </div>
      :
      <div className="file-content">
        <div className  = "window-top-bar">

          <div className = "top-bar-red" 
          
          onClick={()=>{
            setcurrentFileContent("");
            setIsFileOpen(!isFileOpen);
          }}>X</div>
 
        </div>
        <div className="file-body">
        {currentFileContent}
        </div>
        
      </div> }
    </div>
  );
}

export default App;
