import { AccordianCollapsed, FolderOutlinedYellow } from "../icons/IconPackSvgs";


const sidebarItemMap:any = {
    "My Computer": [
        {type: "folder", name: "Home"},
        {type: "folder", name: "Desktop"},
        {type: "folder", name: "Documents"},
        {type: "folder", name: "Music"},
        {type: "folder", name: "Downloads"},
        {type: "folder", name: "File System"}
    ],
    "Devices": [
        {type: "drive", name: "Volume C:"},
        {type: "drive", name: "Volume D:"},
    ],
    "Network": [
        {type: "drive", name: "iCloud"},
        {type: "drive", name: "Dropbox"},
        {type: "drive", name: "Network Attached Storage"},
        {type: "drive", name: "oneDrive"},
    ]
}


const Sidebar: React.FC<any> = (props: any)=>{
    console.log(props);

    return <div className="sidebar" >
        
        {
            Object.keys(sidebarItemMap).map(
                (sidebarSection: string)=>{
                    return (
                        <div className="sidebarSection">

                <div className="sidebarSectionHeader">
                {sidebarSection}
                </div>

            {
                sidebarItemMap[sidebarSection].map(
                    (item: any)=>{
                        return  <div className="sidebarItem">
                        <AccordianCollapsed/> 
                        <FolderOutlinedYellow/> 
                        <div className="sidebarItemText">

                        {item.name}
                        </div>
                    </div> 
                    } 
                )
            }

        </div>
                    )
                }
            )
        }
        

    
    </div>

};


export default Sidebar;