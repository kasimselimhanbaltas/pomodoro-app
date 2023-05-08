import { useMainStore } from "../stores/store.js";

const store = useMainStore();

export const denemeMetod = () =>{
  console.log("deneme çalıştı")
  console.log(store)
  
}