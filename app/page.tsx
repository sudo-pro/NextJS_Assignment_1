import { Metadata } from "next";
import { WelcomeMessage } from "~/components/WelcomeScreen";

export const metadata: Metadata = {
  title: "Home",
};

export default async () => {
  return <WelcomeMessage />;
};

