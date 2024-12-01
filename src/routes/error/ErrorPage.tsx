/** @format */

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error;
  return (
    <div className="flex flex-col justify-center items-center gap-3 h-full w-full">
      <h3 className="text-3xl font-extrabold">Oops!</h3>
      <div className="text-center ">
        <h4>An error occured!</h4>
        {error.message ? (
          <p>The error is: {error.message}</p>
        ) : (
          <p>That's all we know right now!</p>
        )}
      </div>
    </div>
  );
}
