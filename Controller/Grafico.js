import { LowSync, JSONFileSync} from 'lowdb';
import { moneyConvert } from '../scripts/scritps.js';

const dbCompras = new LowSync(new JSONFileSync('./db/compras.json')) 
const dbVendas = new LowSync(new JSONFileSync('./db/vendas.json')) 

dbCompras.read()
dbVendas.read()

export  function grafico(req, res){ 
    const graphicInfo= [];
    const splitArray = [];
    let somaSaldo = 0;
    
    
    dbCompras.data.forEach(  (item) => {


     splitArray.push( item.data.slice(3))
    
    });
    
    const anos = [...new Set (splitArray)];



    anos.forEach(  ano => {
        let somaCompras = 0;
        let somaVendas = 0;
        let saldo = 0;

          dbCompras.data.forEach(  (item) => {
            if(item.data.includes(ano)){
                somaCompras +=  item.total;
                saldo = somaCompras  
                
            }
        });

          dbVendas.data.forEach(  (item) => {
            if(item.data.includes(ano)){
                somaVendas +=  item.total; 
                saldo = somaVendas
                
            }

        });
        
        saldo = somaCompras - somaVendas;
        
        
        
        somaSaldo += saldo;   
        
         graphicInfo.push({
            "ano": ano, 
            "saldo": saldo,
               
        })

        
    })

    graphicInfo.forEach( ano => {
        let porcentagem =  ano.saldo / somaSaldo;
        let percent = {porcentagem: porcentagem.toFixed(2)};
        Object.assign(ano, percent);
        ano.saldo = moneyConvert(ano.saldo);
    })
    
    return  res.json(graphicInfo);       

}




