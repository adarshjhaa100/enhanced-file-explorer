import Example from "./Example";




const WindowContent: React.FC<any> = (props: any)=>{

    const {tableView, setTableView} = props;
    
    return <div className="windowContent">
               <Example tableView = {tableView}
              setTableView = {setTableView}/>
            </div>

};


export default WindowContent;