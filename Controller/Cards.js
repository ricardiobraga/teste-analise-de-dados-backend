import { LowSync, JSONFileSync} from 'lowdb';
import { moneyConvert } from '../scripts/scritps.js';

const dbCompras = new LowSync(new JSONFileSync('./db/compras.json')) 
const dbVendas = new LowSync(new JSONFileSync('./db/vendas.json')) 

dbCompras.read()
dbVendas.read()

export function cards(req, res){ 
    const cards= [];     
    let compras = 0;
    let vendas = 0;
    let icms = 0;
    let st = 0;
    
    const calcCompras = dbCompras.data.map(item => {
            return (            
                compras += item.total,      
                icms += item.ICMS,
                st += item.ST            
                )
            })

    const calcVendas = dbVendas.data.map(item => {
        return (            
            vendas += item.total)
        })
        

        cards.push({"tag": "COMPRAS", "valor": moneyConvert(compras)}),         
        cards.push({"tag": "VENDAS", "valor": moneyConvert(vendas)})        
        cards.push({"tag": "ICMS", "valor": moneyConvert(icms)});         
        cards.push({"tag": "ST", "valor": moneyConvert(st)});
        
        return res.json(cards)
    
}



