import React from "react";

class UserClass extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userInfo:{
                name:"Dummy Name",
                location:"Dummy Location",
                avatar_url: "https://avatars.githubusercontent.com/u/252693742?v=4"
            }
        };
    }

    async componentDidMount(){

        const data= await fetch("https://api.github.com/users/ritikasingh-2111");
        const jsonData= await data.json();
        this.setState({
            userInfo: {
                name: jsonData.name,
                location: jsonData.location,
                avatar_url: jsonData.avatar_url
            }
        });
        console.log(jsonData);
    }
    render() {
        const {name,location,avatar_url}=this.state.userInfo;
        return (
            <div className="user-card">
                <img src={avatar_url} alt="User Avatar" />
                <h2>Name: {name}</h2>
                <h3>Location:{location}</h3>
                <h4>
  Contact:{" "}
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ritika@gmail.com">
  ritikasingh.ritu21@gmail.com
</a>
</h4>
            </div>
        );
    }
}

export default UserClass;