<script>
    let error = null;

    async function signUp(){
        if (!document.getElementById('name').value || !document.getElementById('email').value || !document.getElementById('password').value || !document.getElementById('image').value || !document.getElementById('studentId').value) {
            error = 'Please fill in all fields.';
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const image = document.getElementById('image').value;
        const studentId = document.getElementById('studentId').value;

        const response = await fetch('http://localhost:3000/api/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                email,
                password,
                image,
                studentId
            })
        });
        const data = await response.json();
        if (response.ok) {
            const user = data.user;

            if (user == 'student') {
                window.location.href = '/Client';
            } else if (user == 'admin') {
                window.location.href = '/Admin';
            } else if (user == 'newUser') {
                window.location.href = '/';
            }
        } else {
            error = data.message;
        }
    }

</script>

<main>
    <form action="POST">
        {#if error}
            <p style="color: red;">{error}</p>
        {/if}
        <div>
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" placeholder="Juan Dela Cruz" required>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="myemail@email.com" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="abcd1234!" required>
        </div>
        <div>
            <label for="image">Image:</label>
            <input type="text" id="image" name="image" required>
        </div>
        <div>
            <label for="studentId">Student Id:</label>
            <input type="text" id="studentId" name="studentId" required>
        </div>
        <div>
            <button type="button" on:click={() => {signUp()}}>Sign up</button>
            <button type="button" on:click={() => {window.location.href = '/Auth/Login'}}>Login</button>
        </div>
    </form>
</main>