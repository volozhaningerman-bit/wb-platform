export function Card({children}:{
 children:React.ReactNode
}){
 return <section className="card">{children}</section>;
}

export function Button({children}:{
 children:React.ReactNode
}){
 return <button>{children}</button>;
}

export function Badge({children}:{
 children:React.ReactNode
}){
 return <span>{children}</span>;
}

export function Loader(){
 return <div>Loading...</div>;
}
