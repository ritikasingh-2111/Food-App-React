import User from "./User"
import UserClass from "./UserClass";
const About = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <p>
        This is a food ordering application where users can explore restaurants
        and discover different food options.
      </p>
      <p>
        Built using React as part of my web development learning journey.
      </p>
  
      <UserClass name={"Ritika Singh"} location={"Bhubaneswar"}/> 
    </div>
  );
};

export default About;