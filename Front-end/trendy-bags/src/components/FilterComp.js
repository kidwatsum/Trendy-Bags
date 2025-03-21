import { DriveFileRenameOutline } from "@mui/icons-material";
import "./FilterComp.css";
import DropdownNav from "./DropdownNav";

export default function FilterComp(){

    const sortingMenuItems=[
        {label:"Highest price",value:"highest_price"},
        {label:"Lowest price", value:"lowest_price"},
        {label:"A-Z",value:"semantic_desc"},
        {label:"Z-A",value:"semantic_desc"},
        {label:"Most sold",value:"most_sold"},
        {label:"Least sold",value:"least_sold"}
    ];


    return(
        <>
            <form className="filter-main">
                <h3>Sort by: </h3>
                <DropdownNav btnLabel="" menuItems={sortingMenuItems}/>
            </form>
        </>
    )
}