export default function ChatHead({ user }) {
  const { avatar, firstName, lastName } = user || {};

  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={avatar}
        alt={firstName}
      />
      <span className="block ml-2 font-bold text-gray-600">
        {firstName} {lastName}
      </span>
    </div>
  );
}
