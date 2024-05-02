import Header from "@/components/header";
import CreateTweet from "@/components/create-tweet";

export default function HomePage() {
  return (
    <>
      <Header className="p-4 text-xl font-semibold">Home</Header>
      <CreateTweet
        showCancelButton={false}
        containerClassName="border-b border-zinc-800"
        buttonClassName="text-sm py-2"
      />
    </>
  );
}
