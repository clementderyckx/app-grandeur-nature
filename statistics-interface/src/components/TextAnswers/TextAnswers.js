import React from 'react';
import './TextAnswers.css';
export default function TextAnswers({stat}){

    return(
      <table className='text-answer'>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Entreprise</th>
                <th>Réponse</th>
            </tr>
        </thead>
        <tbody>
          {stat.map(answer => (<tr key={answer.contact._id}>
            <td>{upperCase(`${answer.contact.lastname} ${answer.contact.firstname}`)} </td>
            <td>{answer.contact.company}</td>
            <td>{answer.result}</td>
          </tr> ))}
        </tbody>
        <tfoot>
            <tr>
                <th>Total</th>
                <td>{stat.length}</td>
            </tr>
        </tfoot>
      </table>
    )
}
function upperCase(str){
    return str.toUpperCase();
}