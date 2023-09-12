import { getServerSession } from "next-auth/next";

import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

import Feed from "@/components/feed";

const Home = async () => {
  const session = await getServerSession(OPTIONS);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head-text | text-center tracking-tighter">
        <span className="block">Discover & Share</span>
        <span className="orange-gradient | text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc | text-center">
        Promptopia is an open-source AI prompting tool for modern world to discover,
        create and share creative prompts
      </p>

      {session ? <Feed /> : <h1 className="text-5xl">You are not logged in!</h1>}
    </section>
  );
};

export default Home;
