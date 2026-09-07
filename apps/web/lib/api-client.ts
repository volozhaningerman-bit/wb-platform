export async function apiClient(
 path:string,
 options:RequestInit={}
){
 return fetch(
  `${process.env.NEXT_PUBLIC_API_URL}${path}`,
  {
   ...options,
   headers:{
    'Content-Type':'application/json',
    ...options.headers
   }
  }
 );
}
