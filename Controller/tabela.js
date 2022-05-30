import { LowSync, JSONFileSync} from 'lowdb';
import { moneyConvert } from '../scripts/scritps.js';

const dbCompras = new LowSync(new JSONFileSync('./db/compras.json')) 
const dbVendas = new LowSync(new JSONFileSync('./db/vendas.json')) 

dbCompras.read()
dbVendas.read()


export function tabela(req, res){ 
    const tabelaInfo= [];
    const splitArray = [];

    dbCompras.data.forEach( (item) => {

    splitArray.push(item.data.slice(3))
    
    });
    
    const anos = [...new Set (splitArray)];



    anos.forEach(   ano => {
        let compras = 0;
        let vendas = 0;
        let icms = 0;
        let st = 0;
        let saldo = 0;

         dbCompras.data.forEach(  (item) => {
            if(item.data.includes(ano)){
                vendas += item.total; 
                icms += item.ICMS 
                st += item.ST
                
            }
        })

         dbVendas.data.forEach( (item) => {
            if(item.data.includes(ano)){
                compras += item.total;    
                
            }

        })
        
   
        
        tabelaInfo.push({
            "ano": ano, 
            "compras": moneyConvert(compras),
            "vendas": moneyConvert(vendas),
            "ICMS": moneyConvert(icms),
            "ST": moneyConvert(st)                
        })
    })


    
    return res.json(tabelaInfo);
}