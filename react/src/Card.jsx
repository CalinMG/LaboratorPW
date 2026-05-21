function Card(props) { 
    const projects = [ 
{title:"Proiect 1", description: "Pagina personala" }, 
{title:"Proiect 2", description: "Calculator buget" }, 
{title:"Proiect 3", description: "Dashboard React" }, 
]; 
    return (

        <div> 
            <h3>{props.title}</h3> 
            <p>{props.description}</p> 
            
        </div> 
    ); 
} 
export default Card; 