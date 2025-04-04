import clsx from "clsx";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default async () => {
  return (
    <div
      className={clsx(
        pacifico.className,
        "text-5xl font-extrabold flex items-center justify-center h-screen",
      )}
    >
      404 🐒Not Found
    </div>
  );
};
