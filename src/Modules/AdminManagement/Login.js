import { login } from "../AuthManager/Auth";



export function init(params) {

    requestAnimationFrame(() => {

        document.getElementById("login-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            const result = await login(email, password);
            if (result.error) {
                alert(result.error);
            } else {
                alert("Login successful!");
                window.location.href = "dashboard.html";
            }
        });


    });

    //  action in html string will work like this
    return {

    };
}

