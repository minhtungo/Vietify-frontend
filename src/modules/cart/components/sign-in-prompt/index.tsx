import Button from '@ui/button';
import Link from 'next/link';

const SignInPrompt = () => {
  return (
    <div className="flex items-start justify-between bg-white">
      <div>
        <h2 className="text-xl-semi">Already have an account?</h2>
        <p className="text-base-regular mt-2 text-gray-700">
          Sign in for a better experience.
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <Button>Sign in</Button>
        </Link>
      </div>
    </div>
  );
};

export default SignInPrompt;
