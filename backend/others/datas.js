const question1 = {
    type: 'checkbox',
    question: 'Quels thèmes ou stands ont attirés le plus votre attention ? 3 réponses possibles ',
    answers: ['PBI solutions Naturelles', 'Gestion de l’eau', 'Sols sportifs', 'Alternatives aux produits phytosanitaires', 'Fleurissement', 'Mobilier urbain', 'Aménagement paysager', 'Paillage substrats'],
    obligatory: true,
};
const question2 = {
    type: 'radio',
    question: 'Préférez-vous un salon: ',
    answers: ['Intérieur avec conférences', 'Extérieur avec ateliers'],
    obligatory: true,
};
const question3 = {
    type: 'radio',
    question: 'Combien de fois aimeriez-vous assister à nos journées techniques? *',
    answers: ['Une fois par an', 'Tous les 2 ans', 'Plus'],
    obligatory: true,
};
const question4 = {
    type: 'rank',
    question: 'Quelle note donnez-vous à notre événement ? ',
    answers: ['PBI solutions Naturelles', 'Gestion de l’eau', 'Sols sportifs', 'Alt. aux produits phytosanitaires', 'Fleurissement', 'Mobilier urbain', 'Aménagement paysager', 'Paillage substrats'],
    obligatory: true,
};
const question5 = {
    type: 'text',
    question: 'Que souhaitez-vous voir à nos prochains événements ?',
    answers: [],
    obligatory: false,
};

module.exports = [question1, question2, question3, question4, question5];
