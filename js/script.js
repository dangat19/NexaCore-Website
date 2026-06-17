function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");
}

function validateForm(){

    let name =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let message =
        document.getElementById("message").value;

    if(name === "" || email === "" || message === ""){

        alert("Please fill all fields");

        return false;
    }

    alert("Message Submitted Successfully");

    return true;
}