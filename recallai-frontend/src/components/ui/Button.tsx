export default function Button({ children, ...props }: any) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-xl bg-amber-400 text-black font-medium hover:bg-amber-500"
    >
      {children}
    </button>
  );
}