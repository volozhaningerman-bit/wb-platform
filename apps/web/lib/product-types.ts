export type Metric = {
 title:string;
 value:string;
 change:string;
 trend:"up"|"down"|"neutral";
};

export type CategoryNode = {
 id:string;
 name:string;
 revenue:number;
 children:CategoryNode[];
};

export type ProductRow = {
 id:string;
 name:string;
 revenue:number;
 profit:number;
 margin:number;
 advertising:number;
};

export type Plugin = {
 id:string;
 name:string;
 status:"active"|"available";
 description:string;
};
