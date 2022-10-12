import {ReactComponent as RedLeaf} from './../../imgs/leaf-red.svg';
import {ReactComponent as YellowLeaf} from './../../imgs/leaf-yellow.svg';
import {ReactComponent as BlackLeaf} from './../../imgs/leaf-black.svg';

export default function Leaf({color, id}) {
    let elem = <BlackLeaf />
    if(color === 'red'){
        elem = <RedLeaf />
    } else if(color === 'yellow'){
        elem = <YellowLeaf />
    } 

    return (
        <div className="leaf" id={ (id) ? id : "" }>
            {elem}
        </div>
    )
}
