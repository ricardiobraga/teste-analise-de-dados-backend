export function moneyConvert(value){
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(value); 
}