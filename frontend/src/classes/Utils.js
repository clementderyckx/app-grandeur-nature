class Utils{
    static clearString (string){
        let str = (string.includes('é')) ? string.replaceAll('é', 'e') : string;
        if(str.includes('è')) str = str.replaceAll('è', 'e');
        if(str.includes('ë')) str = str.replaceAll('ë', 'e');
        if(str.includes('ê')) str = str.replaceAll('ê', 'e');
        if(str.includes('â')) str = str.replaceAll('â', 'a');
        if(str.includes('ä')) str = str.replaceAll('ä', 'a');
        if(str.includes('ö')) str = str.replaceAll('ö', 'o');
        if(str.includes('ô')) str = str.replaceAll('ô', 'o');
        if(str.includes(' ')) str = str.replaceAll(' ', '');

        return str;
    }
}

export default Utils