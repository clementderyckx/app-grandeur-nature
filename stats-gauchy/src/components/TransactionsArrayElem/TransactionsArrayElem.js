
export default function TransactionsArrayElem({datas, children, className}){
    const divClassName = (className) ? `transactions-array-elem ${className}` : 'transactions-array-elem'
    return (
        <div className={divClassName}>
            {(datas) ? <p>{datas}</p> : null}
            {(children) ? children : null}    
        </div>
    )
}