import { MRT_ToolbarAlertBanner } from "material-react-table";
import "../../App.css"



const PrimaryFooter: React.FC<any> = (props: any)=>{

    const {tableView} = props;

    return <div className="windowFooter">    
        { 
            tableView === null ? <>Empty Footer</> : <MRT_ToolbarAlertBanner stackAlertBanner table={tableView} />
        }
        
    </div>

};


export default PrimaryFooter;