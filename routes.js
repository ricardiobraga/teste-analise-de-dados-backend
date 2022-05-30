import { Router } from "express"
import { cards } from "./Controller/Cards.js"
import { grafico } from "./Controller/Grafico.js";
import { tabela } from "./Controller/tabela.js";
const router = Router()





router.get('/cards', cards);
router.get('/grafico', grafico);
router.get('/tabela', tabela)




   export default router