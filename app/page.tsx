import { Metadata } from "next";
import { WelcomeMessage } from "~/components/WelcomeScreen";

export const metadata: Metadata = {
  title: "jay-neo's Task Tracker",
};

export default async () => {
  return <WelcomeMessage />;
};
