console.log("Hello Worlds")


async function getDirectoryHandle(){
    const handle = await window.showDirectoryPicker();
    console.log(handle);
    return handle;
}


/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns 
 */
function add(a, b){
    
    return a+b;
}

const dirOpenBtn = document.getElementById("dir-picker");
const dirContent = document.getElementById("directoryStructure");

document.getElementById("sample-btn").addEventListener("click", ()=>{
    console.log(document.getElementById("email").value)
})




if(window.isSecureContext){
    dirOpenBtn.addEventListener("click", async (e)=>{
        
        const dirHandle = await getDirectoryHandle();
        let count =0;
        
        for await (const itemHandle of dirHandle.values()){
            if(itemHandle.kind === "file") 
            {
                const fileObj = await itemHandle.getFile();

                // item = fileObj;
                

                dirContent.innerHTML += `<div id = "file-${count}">File: ${JSON.stringify(await fileObj.name)}<div><br>`
                console.log(fileObj);
                // document
                //     .getElementById(`file-${count}`)
                //     .addEventListener("click", async (e)=>{
                //         console.log(await fileObj);
                // })
                
                console.log(await fileObj.toString());
                

            }
            else {
                console.log(itemHandle);
                dirContent.innerHTML += `<div>Dir: ${JSON.stringify(itemHandle.name)}<div><br>`
            }
        }

    })
}



