import signInUpImg from '../../assets/sign-in-img.png';

export const SignUp = () => {
  return <main className='sign-up-page'></main>;
};

export const SignIn = () => {
  return (
    <main className='sign-in-page'>
      <div className='greeting'>
        <div className='img'>
          <img src={signInUpImg} alt='sign in' />
        </div>
        <h1>Welcome Back</h1>
        <p>Login to continue using our awesome platform</p>
      </div>

      <div className='form-container'>
        <form action=''>
          <h2 className='title'>Sign In</h2>

          {/* EMAIL */}
          <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <input
              type='emai'
              id='email'
              name='email'
              placeholder='johndoe@gmail.com'
            />
          </div>

          {/* PASSWORD */}
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='**********'
            />
          </div>

          <button type='submit' className='gold'>
            Sign In
          </button>

          {/* KEEP ME SIGNED IN/FORGOT PASSWORD */}
          <div className='container'>
            <div className='remember-me'>
              <input type='checkbox' id='remember' name='remember' />
              <label htmlFor='remember'>Remember me</label>
            </div>
            <p className='forgot-password'>Forgot password?</p>
          </div>

          <p className='existing-account'>
            Already have an account? <span>Sign In</span>
          </p>
        </form>
      </div>
    </main>
  );
};
