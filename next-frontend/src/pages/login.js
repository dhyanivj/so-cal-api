import { useRouter } from 'next/router';

function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the user's credentials match the dummy credentials
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === 'test' && password === 'test') {
      // Set a cookie or session variable to indicate that the user is authenticated
      document.cookie = 'authenticated=true';

      // Redirect the user to the main page of the app
      router.push('/');
    } else {
      // Show an error message if the user's credentials are incorrect
      // ...
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginPage;
