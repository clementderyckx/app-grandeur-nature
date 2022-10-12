function MailToLink ({mail, subject}){
    const mailto = `mailto:${mail}?subject=${subject}`;
    return <a href={mailto}>{mail}</a>
}

export default MailToLink;