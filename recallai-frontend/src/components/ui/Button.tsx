export default function Button({ children, ...props }: any) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-xl bg-primary-400 text-black font-medium hover:bprimaryer-500"
    >
      {children}
    </button>
  );
}
