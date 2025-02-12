import LoggedOutIllu from "../SVG/CreateAccount";

export const LoggedOutComponent = () => {
  return (
    <div className="w-1/2 mx-auto justify-center items-center flex flex-col">
    <LoggedOutIllu className="w-1/2" />
      <h1>You are logged out</h1>
      <p>Please log in to continue</p>
    </div>
  );
};