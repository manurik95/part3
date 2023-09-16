import React from "react"

const Notification = ({message, messageType}) => {

    const messageStyle = {
        fontSize: "26px",
        borderRadius: "22px",
        backgroundColor: "lightgrey",
        padding: "14px",
        margin: "15px",
        textAlign:"center"
    }    
        if (messageType === "success") {
            messageStyle.color = "green";
            messageStyle.border = "4px solid green";
          } else if (messageType === "error") {
            messageStyle.color = "red";
            messageStyle.border = "4px solid red";
          }

    if (message === null) {
      return null
    } else {
      return ( 
      <div style={messageStyle}>
        {message}
    </div>  
      )
    }
  }


  



    


  export default Notification