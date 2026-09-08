import {CategoryNode, ProductRow, Metric, Plugin} from "./product-types";

export const metrics:Metric[] = [
 {title:"Оборот",value:"1 240 000 ₽",change:"+12%",trend:"up"},
 {title:"Прибыль",value:"320 000 ₽",change:"+8%",trend:"up"},
 {title:"Заказы",value:"842",change:"+24%",trend:"up"},
 {title:"Реклама",value:"95 000 ₽",change:"-4%",trend:"down"}
];

export const categoryTree:CategoryNode = {
 id:"root",
 name:"Все продажи",
 revenue:1240000,
 children:[
  {
   id:"home",
   name:"Дом",
   revenue:520000,
   children:[
    {id:"kitchen",name:"Кухня",revenue:300000,children:[]},
    {id:"storage",name:"Хранение",revenue:220000,children:[]}
   ]
  },
  {
   id:"beauty",
   name:"Красота",
   revenue:320000,
   children:[]
  }
 ]
};

export const products:ProductRow[]=[
 {
  id:"1",
  name:"Товар А",
  revenue:500000,
  profit:120000,
  margin:24,
  advertising:30000
 },
 {
  id:"2",
  name:"Товар Б",
  revenue:300000,
  profit:90000,
  margin:30,
  advertising:12000
 }
];

export const plugins:Plugin[]=[
 {
  id:"ecco",
  name:"ECCO",
  status:"active",
  description:"Автоматизация работы продавца"
 },
 {
  id:"ads",
  name:"Контроль рекламы",
  status:"available",
  description:"Оптимизация рекламных расходов"
 }
];
