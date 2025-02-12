import { text } from "stream/consumers"
import DocumentSVG from "./SVG/Documents"
import FileSVG from "./SVG/Files"
import HomeSVG from "./SVG/Home"
import PhotosSVG from "./SVG/Photos"
import TrashSVG from "./SVG/Trash"


export const Sidebar = () => {

    const className="w-1/6"
    const fill="currentColor"
    const SidebarItems = [
        {
            icon : <HomeSVG className={className} fill={fill}/>,
            text : "Home"
        },
        {
            icon : <FileSVG className={className} fill={fill}/>,
            text : "Files"
        },
        {
            icon : <PhotosSVG className={className} fill={fill}/>,
            text : "Photos"
        },
        {
            icon : <DocumentSVG className={className} fill={fill}/>,
            text : "Documents"
        },
        {
            icon : <TrashSVG className={className} fill={fill}/>,
            text : "Trash"
            
        }
    ]
    return (
        <div className="flex flex-col w-1/6 p-5">
                <div className="flex flex-col gap-4 p-3">
                    {SidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center hover:text-blue-500 cursor-pointer hover:font-bold hover:bg-gray-300/30 rounder-xl p-2 gap-4"
                    >
                        {item.icon}
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
