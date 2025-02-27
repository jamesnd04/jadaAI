import Header from "@/components/chat/header";
import ChatInput from "@/components/chat/input";
export default function Chat() {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-96"></div>{" "}
      {/*Yes this is temporary until I make other components*/}
      <ChatInput />
    </div>
  );
}
