export default function Blank() {
  return (
    <div className="relative  w-full overflow-y-hiddeen h-[calc(100vh_-_64px)] flex flex-col items-center justify-center text-gray-700 p-5 space-y-5">
      <div>
        <img
          src={
            "https://img.freepik.com/free-vector/communication-logo-design-template_23-2149919615.jpg"
          }
          alt="Nothing here!"
          className="h-[200px]"
        />
      </div>
      <div className="text-center">
        No messages selected! Select an user from left sidebar to view all
        messages
      </div>
    </div>
  );
}
