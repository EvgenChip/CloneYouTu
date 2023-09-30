import classNames from "classnames";

export const ErrorFallback = () => {
  return (
    <div
      className={classNames(
        "flex justify-center items-center min-w-full pt-32",
        {
          ["bg-zinc-400"]: true,
        }
      )}>
      <h2 className=" text-red-800 font-bold text-4xl">Something went wrong</h2>
    </div>
  );
};
