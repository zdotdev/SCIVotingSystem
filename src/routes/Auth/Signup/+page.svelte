<script>
    import { browser } from '$app/environment';
    import Button from '$lib/Components/Button/Button.svelte';

    export let form;
</script>

<main class="flex justify-center items-center h-screen">
    <form method="POST" class="w-fit flex flex-col gap-8 items-center space-x-4 p-8 border-gray-200 rounded-lg shadow-md">
        <h2 class="text-4xl font-bold">Sign up</h2>
        <div class="flex flex-col gap-4">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required placeholder="Juan Dela Cruz" />
        </div>
        <div class="flex flex-col gap-4">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required placeholder="myemail@email.com" />
        </div>
        <div class="flex flex-col gap-4">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required placeholder="Abcd1234!" />
        </div>
        <div class="flex flex-col gap-4">
            <label for="studentId">Student Id:</label>
            <input type="text" id="studentId" name="studentId" required placeholder="2024123456" />
        </div>
        <div class="flex flex-col gap-4">
            <label for="studentCourse">Student Course:</label>
            <input type="text" id="studentCourse" name="studentCourse" required placeholder="BS Computer Science" />
        </div>
        {#if form?.errorMessage}
            <div class="w-80">
                <p class="text-red-500 w-full text-center">{form.errorMessage}</p>
            </div>
        {/if}
        <div class="flex gap-4">
            <Button type="submit" color="green" text="Sign up" />
            <Button type="button" func={() => window.location.href = '/Auth/Signin'} color="gray" text="Login"/>
        </div>
    </form>
</main>