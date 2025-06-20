const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.name}</h1>
      <p>{props.desp} </p>
      <img src={props.img} alt={props.name} />
    </div>
  );
};
export default Pizza;
