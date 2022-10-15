export const mode = "prod";
export const appConfig = {
    apiUrl: (mode === "prod") ? 'https://app-salon-socodip.herokuapp.com' : 'http://localhost:4009',
    appUrl: (mode === "prod") ? 'http://localhost:3000' : 'http://localhost:3000',
    satisfactionFormId: "6349bac53c7c2322e04165f4"
}