import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export const PageContent = ({ title, children }: Props) => {
  return (
    <>
      {title && (
        <h1 className="text-zinc-100 text-4xl font-bold text-center pt-24">
          {title}
        </h1>
      )}
      <div className="flex flex-wrap max-w-[900px] gap-[30px] items-center mx-auto py-8">
        {children}
      </div>
    </>
  );
};
