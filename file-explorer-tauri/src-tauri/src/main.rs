// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    fs::{self, File, 
        // Metadata
    }, 
    io::{Read, 
    //    Seek
    }, 
    os::unix::fs::MetadataExt, 
    // path::PathBuf, 
    time
};






// Module Structure
pub mod file_explorer_api {

    pub mod fs_directory {
    
    }

    pub mod fs_file {

    }

    pub mod search {
        
    }

    pub mod export {

    }
    

}




// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command] // this is an annotation
fn greet(name: &str) -> String {
    
    return format!("Hello, {}! You've been greeted from Rust!", name)
}



#[tauri::command] // 
fn read_dir(name : &str) -> Vec<Vec<String>> {
    // declaring a variable
    // FIle system: fs
    println!("name: {:?}, {:?}", name, name.len());
    // needs to be mutable
    let  mut dir_items: Vec<Vec<String>> = Vec::new();


    // Match can be used to unwrap Result<Err, OK> 
    match fs::read_dir(name) {
        Err(why) => {println!("! {:?}", why.kind()); },
        Ok(paths) => for path in paths {
            // println!("> {:?}", path.unwrap().path());
            match path {
                Err(why) => println!("!{:?}", why.kind()),
                Ok(p) => { 
                    // println!("{:?}", p.metadata().unwrap());
                    let mut dir_item: Vec<String> = Vec::new();
                    // Primitive method: sabko string bnade
                    dir_item.push(format!("{:?}", p.file_name()));
                    dir_item.push(format!("{:?}", p.metadata().unwrap().len()));
                    dir_item.push(format!("{:?}", p.metadata().unwrap().ctime()));
                    dir_item.push(format!("{:?}", p.metadata().unwrap().modified().unwrap()));
                    
                    dir_item.push(format!("{:?}", p.metadata().unwrap().file_type().is_dir()));
                    dir_item.push(format!("{:?}", p.path().as_mut_os_str()));
                     
                     
                    
                    // println!("{:?}", p.file_name());
                    // println!("{:?}", p.metadata().unwrap().len());
                    // println!("{:?}", p.metadata().unwrap().modified().unwrap());
                    // println!("{:?}", p.metadata().unwrap().file_type().is_dir());

                    
                    dir_items.push(dir_item) // unwrap result else use match

                }
            }
        },
    }

    return dir_items; 
}




use std::time::UNIX_EPOCH;
#[tauri::command]
// Err is returned as string as well
fn read_file_custom(name: &str, offset1: i64) -> Result<String, String> {
    let current_timestamp: i64 = time::SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs() as i64;
    /**
     * 
     * Can use something like this instead of match
     * if let Ok(file_type) = entry.file_type() {
                // Now let's show our entry's file type!
                println!("{:?}: {:?}", entry.path(), file_type);
            } else {
                println!("Couldn't get file type for {:?}", entry.path());
            }
     */
    
    println!("Start time {}", current_timestamp);
    match File::open(name) {
        Err(err)=> {println!("{:?}, ", err.kind()); return Err("This failed!".into())},
        Ok(mut fptr) => {

            const BUFFER_SIZE: usize = 1*1024*1024; // 4096
            let mut buff = [0; BUFFER_SIZE]; // initalize an array of size 1000 and with 0 size
            

            let metadata: fs::Metadata = fptr.metadata().unwrap();
            println!("Blocks: {}, BlkSize: {}", metadata.blocks(), metadata.blksize());
            println!("Size: {}", fptr.metadata().unwrap().size());

            // {:?} print in debug context (Something like #v in go). 
            // Any type that has debug trait can be printed like this. 
            // For custom types: place #[derive(Debug)] before declaration 
            println!("File Type: {:?}", fptr.metadata().unwrap().file_type());
            println!("meta: {:?}", fptr.metadata().unwrap());
            println!("meta: {:?}", fptr.metadata().unwrap());
            
            
            // let seek_to = (0.9* (fptr.metadata().unwrap().size() as f64)) as u64;

            
            // let error_un = fptr.seek(std::io::SeekFrom::Start(seek_to)).unwrap_err();

            

            // match fptr.seek(std::io::SeekFrom::Start(seek_to)) {
            //     Err(e)=> return Err(e.to_string()),
            //     Ok(res) => println!("Seek to posn success {}", res)
            // }


            // check error later
            let res: Result<usize, std::io::Error> = fptr.read(& mut buff);
            
            let new_timestamp: i64 = time::SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs() as i64;
            println!("End time {}", new_timestamp);
            return Ok(String::from_utf8(buff.to_vec()).unwrap()); // Temporary measure, saala bc error kaise convert kre
        
        }
    }
    
}

 
fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet, 
            read_dir,
            read_file_custom,
            ]) //add the rust function here to invoke from JS
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
