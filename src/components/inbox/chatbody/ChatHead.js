export default function ChatHead({ user }) {
  const { avatar, firstName, lastName } = user || {};

  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      {avatar ? (
        <img
          src={avatar}
          alt={firstName}
          className="w-12 h-12 border rounded-full bg-gray-500 border-gray-700"
        />
      ) : (
        <p className="w-12 h-12 border rounded-full bg-blue-500 border-gray-700 text-white flex justify-center items-center  text-2xl uppercase font-serif">
          {firstName?.split("")[0]}
        </p>
      )}
      <span className="block ml-2 font-bold text-gray-600 capitalize">
        {firstName} {lastName}
      </span>
    </div>
  );
}
