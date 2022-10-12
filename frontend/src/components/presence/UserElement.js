function UserElement({id, firstname, lastname, ciy, representative, img, presence, updatePresence}){
    console.log(presence);
    return (
        <tr>
            <td><img src={img} onClick={() => (presence) ? updatePresence(false) : updatePresence(true)} alt='une image du frérot'/></td>
            <td>{lastname}</td>
            <td>{firstname}</td>
            <td>{ciy}</td>
            <td>{representative}</td>
            <td>{(presence) ? 'YES' : 'NO'}</td>
        </tr>
    )
}

export default UserElement;