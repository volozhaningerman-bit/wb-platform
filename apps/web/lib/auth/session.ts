export function saveSession(token:string){
  return {
    stored:true,
    token
  };
}

export function clearSession(){
  return {
    cleared:true
  };
}
