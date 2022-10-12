import {useState} from "react";
import UserElement from "./UserElement";
import datas from "../datas";

const elements = [];
for (let i= 0; i < 20; i++){
    const dataToPush = datas;
    dataToPush.id = i;
    elements.push(datas)
}

function UserTable(){
    const [presence, updatePresence] = useState([]);
    return (
        <table>
            <tbody>
                {elements.map(elem => <UserElement key={elem.id} img={elem.img} firstname={elem.firstname} lastname={elem.lastname} ciy={elem.city} representative={elem.representative} presence={presence} updatePresence={updatePresence}/>)}
            </tbody>
        </table>

    )
}

export default UserTable;