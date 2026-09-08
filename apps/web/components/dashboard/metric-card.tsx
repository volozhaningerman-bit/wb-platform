import Card from "../ui/card";

export default function MetricCard({title,value}:{title:string,value:string}) {
  return <Card><small>{title}</small><h2>{value}</h2></Card>;
}
