export function apiResponse<T>(data:T){
 return {
  success:true,
  data,
  timestamp:new Date()
 };
}
