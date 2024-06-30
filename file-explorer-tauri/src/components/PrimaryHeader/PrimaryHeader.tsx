import "../../App.css";
import { FolderOutlinedShaded, HeaderOptions, LeftArrow, RightArrow, Search, UpArrow } from "../icons/IconPackSvgs";


const HeaderNavigationControls: React.FC<any> = ()=>{
    return <div className="headerNavigationControls">
        <div style={{marginLeft: `18px`}}>
        <LeftArrow/>
        </div>
        <div style={{marginLeft: `15px`}}>
        <RightArrow/>
        </div>
        <div style={{marginLeft: `15px`}}>
        <UpArrow/>
        </div>
    </div>
}

const HeaderCurrentDirPath: React.FC<any> = ()=>{
    return <div className="headerCurrentDirPath">
        <div style={{marginTop: `4px`}}>
            <FolderOutlinedShaded/>
        </div> 
        {"Documents > Projects"}
    </div>
}

const HeaderCurrentViewCustomize: React.FC<any> = ()=>{
    return <div className="headerCurrentViewCustomize">
        <div style={{paddingTop: `10px`}}>
            <HeaderOptions/> 
        </div>
    </div>
}

const HeaderSearch: React.FC<any> = ()=>{
    return <div className="headerSearch">
        <Search/> <div style={{ minWidth: `95%` }}>
            <input type="text" name="" id="" style={{ minWidth: `100%` }}/>
        </div>
    </div>
}



const PrimaryHeader: React.FC = ()=>{


    return <header className="windowHeader">
            <HeaderNavigationControls/>
            <HeaderCurrentDirPath/>
            <HeaderCurrentViewCustomize/>
            <HeaderSearch/>

        </header>

};


export default PrimaryHeader;