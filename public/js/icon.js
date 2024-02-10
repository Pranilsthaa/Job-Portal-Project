
    let icon = document.getElementById('icon');
    let password = document.getElementById('password');

    icon.addEventListener('click',()=>{

        if(password.type === 'password'){
            password.type = 'text';
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
        else{
            password.type = 'password'
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }
    })
